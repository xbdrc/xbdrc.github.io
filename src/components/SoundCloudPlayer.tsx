// Modules
import { useRef, useEffect } from 'react'

// Properties
interface SoundCloudPlayerProps {
    playlist: string,       // URL should be something like api.soundcloud.com/playlist/[ID] - this url is in the EMBED code, AI can extract it from there
}

// Component
export default function SoundCloudPlayer({ playlist }: SoundCloudPlayerProps) {

    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const widget = (window as any).SC.Widget(iframe);

        widget.bind((window as any).SC.Widget.Events.READY, () => {
            widget.getSounds((tracks: any[]) => {
                if (!tracks || tracks.length === 0) return;

                let lastIndex = -1;

                const playStrictRandom = () => {
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
                            console.log("▶️ Playing:", idx, tracks[idx].title);
                            widget.play();
                        });
                    }, 300); // delay ensures SoundCloud updates index
                };

                // Play first track
                playStrictRandom();

                // Shuffle on song end
                widget.bind(
                    (window as any).SC.Widget.Events.FINISH,
                    () => playStrictRandom()
                );
            });
        });
    }, []);

    return (
        <div className="soundcloud-player-wrapper">
            <iframe
                id="soundcloud-player"
                ref={iframeRef}
                width="96%"
                height="135"
                scrolling="no"
                frameBorder="no"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    playlist
                )}&color=%23393934&auto_play=true&visual=false&show_teaser=false&show_comments=false&show_user=false&show_reposts=false&show_related=false`}
            />
        </div>
    )

}
