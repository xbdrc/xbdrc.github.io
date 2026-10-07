// Modules
import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor"
import { MotionConfig } from "framer-motion";

// CSS
import './App.css';

// Pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact';

// Player
import SoundCloudPlayer, {
  type SoundCloudPlayerHandle,
  type TrackInfo,
  PLACEHOLDER_ARTWORK,
} from './components/SoundCloudPlayer';

// Icons
import { FaPlay, FaPause, FaArrowUp } from "react-icons/fa";
import { HiRectangleStack } from "react-icons/hi2";
import { BiSolidRectangle } from "react-icons/bi";

// Set this to your playlist's embed URL (same one you were passing before)
const PLAYLIST_URL = "https://api.soundcloud.com/playlists/2282476155";

function App() {

  const playerRef = useRef<SoundCloudPlayerHandle>(null)
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCursor, setShowCursor] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [artworkFailed, setArtworkFailed] = useState(false);
  // Placeholder when: nothing loaded / a track is loading (null) / the image failed
  const artworkSrc =
    !currentTrack || artworkFailed ? PLACEHOLDER_ARTWORK : currentTrack.artworkUrl;
  // Starts from the visitor's system preference; the tray button overrides it
  const [isReducedMotion, setIsReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [ready, setReady] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Wait for window to load
  useEffect(() => {
    const waitForWindow = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    const waitForFonts: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();

    const waitForVideo = new Promise<void>((resolve) => {
      const video = videoRef.current;
      if (!video || video.readyState >= 4) return resolve();
      video.addEventListener("canplaythrough", () => resolve(), { once: true });
      video.addEventListener("error", () => resolve(), { once: true });
    });

    // Safety net so visitors never get stuck on the loader
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 8000));

    Promise.race([
      Promise.all([waitForWindow, waitForFonts, waitForVideo]),
      timeout,
    ]).then(() => setReady(true));
  }, []);

  // SCROLL BEHAVIOR
  useEffect(() => {
    const container = document.querySelector(".container") as HTMLElement || null;
    if (!container) return;
    function handleWheel(e: WheelEvent) {
      const inside = container.contains(e.target as Node);
      // Only forward scroll when the mouse is NOT inside the container
      if (!inside) {
        container.scrollTop += e.deltaY;
      }
    }
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // POINTER
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setShowCursor(mq.matches)
    const handler = (e: any) => setShowCursor(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler);
  }, [])

  // HOVER BUTTONS
  // Fade the tray to 0.4 opacity after 5s of no interaction; any
  // interaction (mouse, touch, scroll, keyboard) brings it back to full.
  useEffect(() => {
    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 5000);
    };

    const events: (keyof WindowEventMap)[] = [
      'mousemove', 'mousedown', 'touchstart', 'touchmove', 'wheel', 'scroll', 'keydown',
    ];
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));

    resetIdle(); // start the 5s countdown on mount

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // SCROLL
  useEffect(() => {
    const container = document.querySelector(".container");

    if (!container) return;

    const handleScroll = () => {
      setShowTop(container.scrollTop > 50);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // MUSIC ARTWORK LOADING
  // New track (or new artwork URL) → try loading the image again
  useEffect(() => {
    setArtworkFailed(false);
  }, [currentTrack?.artworkUrl]);

  const togglePlay = () => {
    playerRef.current?.toggle();
  };

  const toggleReducedMotion = () => {

    setIsReducedMotion(!isReducedMotion)
  }

  return (
    <MotionConfig reducedMotion={isReducedMotion ? "always" : "never"}>
      <Router>
        {(showCursor && !isReducedMotion) && <AnimatedCursor color='255, 255, 255' />}
        <div className={`preloader ${ready ? "preloader--hidden" : ""}`}>
          <div className="spinner" />
        </div>
        <div className={`page-wrapper ${ready ? "ready" : ""}`}
          style={{
            cursor: showCursor && !isReducedMotion ? "none" : "auto",
            ...(isReducedMotion
              ? {
                backgroundImage: `url('${import.meta.env.BASE_URL}background_static.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
              : {})
          }}>
          <video
            ref={videoRef}
            className='bg-video'
            src='background_1_1.mp4'
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={isReducedMotion ? { visibility: "hidden" } : {}}
          />

          {/* Invisible, fully controlled by the tray button below */}
          <SoundCloudPlayer
            ref={playerRef}
            playlist={PLAYLIST_URL}
            onPlayStateChange={setIsPlaying}
            onTrackChange={setCurrentTrack}
          />

          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <div className={`hoverButtons ${isIdle ? "idle" : ""}`}>
            <a
              href="https://soundcloud.com/pages/privacy"
              target="_blank"
              rel="noopener noreferrer"
              title="SoundCloud"
            >
              <img src="soundcloud.webp" alt="SoundCloud" width={32} />
            </a>

            {/* Always rendered; shows the placeholder while loading or on error */}
            <a
              href={currentTrack?.permalinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={currentTrack?.title || "Loading..."}
              className="nowPlaying"
            >
              <img
                src={artworkSrc}
                alt={currentTrack?.title || "Now playing"}
                width={32}
                onError={() => setArtworkFailed(true)}
              />
            </a>

            <button title={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button
              title={isReducedMotion ? "Enable Motion" : "Disable Motion"}
              onClick={toggleReducedMotion}
            >
              {isReducedMotion ? <HiRectangleStack /> : <BiSolidRectangle />}
            </button>

            <button
              title="Top"
              disabled={!showTop}
              onClick={() => {
                document.querySelector(".container")?.scrollTo({
                  top: 0,
                  behavior: isReducedMotion ? "instant" : "smooth",
                });
              }}
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </Router>
    </MotionConfig>

  );
}

export default App;