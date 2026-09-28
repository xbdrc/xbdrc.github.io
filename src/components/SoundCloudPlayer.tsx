// Modules
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

// Properties
interface SoundCloudPlayerProps {
    playlist: string,       // URL should be something like api.soundcloud.com/playlist/[ID] - this url is in the EMBED code, AI can extract it from there
    onPlayStateChange?: (isPlaying: boolean) => void, // lets a parent (e.g. a tray button) react to play/pause
    onTrackChange?: (track: TrackInfo | null) => void, // fires whenever the current track changes; null = a new track is loading
}

export interface TrackInfo {
    title: string,
    artworkUrl: string,     // upsized to ~300x300 when SoundCloud provides one; otherwise the placeholder
    permalinkUrl: string,   // the individual track's public soundcloud.com page
}

// File in /public. BASE_URL keeps it working even if Vite's `base` isn't "/"
// (e.g. a GitHub Pages project site).
export const PLACEHOLDER_ARTWORK = `${import.meta.env.BASE_URL}music_placeholder.webp`

// SoundCloud serves artwork at small default sizes (e.g. "...-large.jpg" is
// 100x100). Swap the size segment for a bigger crop suitable for an icon.
function upsizeArtwork(url: string | null | undefined, size = 't300x300'): string {
    if (!url) return PLACEHOLDER_ARTWORK;
    return url.replace(/-large\.(jpg|png)$/, `-${size}.$1`);
}

// Imperative handle exposed to parent (e.g. your tray play/pause button)
export interface SoundCloudPlayerHandle {
    play: () => void,
    pause: () => void,
    toggle: () => void,
    next: () => void,
    isPlaying: () => boolean,
}

// Component
const SoundCloudPlayer = forwardRef<SoundCloudPlayerHandle, SoundCloudPlayerProps>(
    ({ playlist, onPlayStateChange, onTrackChange }, ref) => {

        const iframeRef = useRef<HTMLIFrameElement | null>(null)
        const widgetRef = useRef<any>(null)
        const playingRef = useRef(false)
        const readyRef = useRef(false) // true once the initial skip+play sequence has settled
        const pendingRef = useRef<null | 'play' | 'pause' | 'toggle'>(null) // queued external call
        const initializedRef = useRef(false) // guards against React StrictMode double-invoking this effect

        useEffect(() => {
            if (initializedRef.current) return; // StrictMode dev double-invoke guard
            initializedRef.current = true;

            const iframe = iframeRef.current;
            if (!iframe) return;

            const widget = (window as any).SC.Widget(iframe);
            widgetRef.current = widget;

            const runPending = () => {
                const action = pendingRef.current;
                pendingRef.current = null;
                if (action === 'play') widget.play();
                else if (action === 'pause') widget.pause();
                else if (action === 'toggle') {
                    if (playingRef.current) widget.pause();
                    else widget.play();
                }
            };

            widget.bind((window as any).SC.Widget.Events.READY, () => {
                widget.getSounds((tracks: any[]) => {
                    if (!tracks || tracks.length === 0) {
                        readyRef.current = true;
                        runPending();
                        return;
                    }

                    let lastIndex = -1;

                    const playStrictRandom = (autoplay = true) => {
                        readyRef.current = false;
                        onTrackChange?.(null); // "loading" → parent shows the placeholder

                        let newIndex = lastIndex;

                        // Keep trying until it's a different index
                        while (newIndex === lastIndex) {
                            newIndex = Math.floor(Math.random() * tracks.length);
                        }

                        // Skip to new track
                        widget.skip(newIndex);

                        // After skip completes, SoundCloud may adjust index internally
                        setTimeout(() => {
                            widget.getCurrentSoundIndex((idx: number) => {
                                lastIndex = idx;
                                const track = tracks[idx];
                                console.log("▶️ Playing:", idx, track?.title);
                                onTrackChange?.({
                                    title: track?.title ?? '',
                                    artworkUrl: upsizeArtwork(track?.artwork_url || track?.user?.avatar_url),
                                    permalinkUrl: track?.permalink_url ?? playlist,
                                });
                                if (autoplay) widget.play();
                                readyRef.current = true;
                                runPending(); // if a play/pause/toggle came in while we were skipping, honor it now
                            });
                        }, 300); // delay ensures SoundCloud updates index
                    };

                    // Expose a "next" that reuses the same shuffle logic
                    (widgetRef.current as any).__playStrictRandom = playStrictRandom;

                    // Load first track, but don't autoplay it — the widget's own
                    // auto_play param already starts playback, so calling play()
                    // again here as well is what races and produces AbortError.
                    playStrictRandom(false);

                    // Shuffle on song end
                    widget.bind(
                        (window as any).SC.Widget.Events.FINISH,
                        () => playStrictRandom(true)
                    );
                });
            });

            widget.bind((window as any).SC.Widget.Events.PLAY, () => {
                playingRef.current = true;
                onPlayStateChange?.(true);
            });
            widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
                playingRef.current = false;
                onPlayStateChange?.(false);
            });
            widget.bind((window as any).SC.Widget.Events.FINISH, () => {
                playingRef.current = false;
                onPlayStateChange?.(false);
            });
        }, []);

        // Expose controls to whatever renders the tray button.
        // If the widget is still mid skip()/play() from its own setup, the
        // call is queued and replayed once that settles, instead of firing
        // immediately and racing it (which is what threw AbortError).
        useImperativeHandle(ref, () => ({
            play: () => {
                if (!readyRef.current) { pendingRef.current = 'play'; return; }
                widgetRef.current?.play();
            },
            pause: () => {
                if (!readyRef.current) { pendingRef.current = 'pause'; return; }
                widgetRef.current?.pause();
            },
            toggle: () => {
                if (!readyRef.current) { pendingRef.current = 'toggle'; return; }
                if (playingRef.current) {
                    widgetRef.current?.pause();
                } else {
                    widgetRef.current?.play();
                }
            },
            next: () => widgetRef.current?.__playStrictRandom?.(true),
            isPlaying: () => playingRef.current,
        }));

        return (
            <iframe
                id="soundcloud-player"
                ref={iframeRef}
                // Keep real dimensions — the widget renders a waveform onto an
                // internal canvas sized from these attributes. Shrinking them
                // to ~0 gives that canvas 0 width/height and throws on play().
                width="300"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                aria-hidden="true"
                tabIndex={-1}
                style={{
                    // Hide by moving off-screen, not by shrinking the box.
                    position: 'fixed',
                    top: 0,
                    left: '-10000px',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    playlist
                )}&color=%23393934&auto_play=true&visual=false&show_teaser=false&show_comments=false&show_user=false&show_reposts=false&show_related=false`}
            />
        )
    }
)

SoundCloudPlayer.displayName = 'SoundCloudPlayer'
export default SoundCloudPlayer