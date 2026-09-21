// Modules
import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor"

// CSS
import './App.css';

// Pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact';

// Icons
import { FaPlay, FaPause, FaArrowUp } from "react-icons/fa";

function App() {

  const [showCursor, setShowCursor] = useState(false)
  const playerRef = useRef<SoundCloudWidget | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // NEW: loading state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // NEW: wait for window load, fonts and the background video
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

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setShowCursor(mq.matches)
    const handler = (e: any) => setShowCursor(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler);
  }, [])

  const [showTop, setShowTop] = useState(false);

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

  useEffect(() => {
    const iframe = document.getElementById("soundcloud-player");

    if (!iframe || !window.SC) return;

    const widget = window.SC.Widget(iframe);

    playerRef.current = widget;

    widget.bind(window.SC.Widget.Events.READY, () => {
      console.log("SoundCloud player ready");
    });

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      setIsPlaying(true);
    });

    widget.bind(window.SC.Widget.Events.PAUSE, () => {
      setIsPlaying(false);
    });

    widget.bind(window.SC.Widget.Events.FINISH, () => {
      setIsPlaying(false);
    });

    return () => {
      playerRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;

    playerRef.current.toggle();
  };

  return (
    <Router>
      {showCursor && <AnimatedCursor color='255, 255, 255' />}

      {/* NEW: loading overlay */}
      <div className={`preloader ${ready ? "preloader--hidden" : ""}`}>
        <div className="spinner" />
      </div>

      {/* CHANGED: added ready class */}
      <div className={`page-wrapper ${ready ? "ready" : ""}`}>
        {/* CHANGED: ref, playsInline, preload */}
        <video
          ref={videoRef}
          className='bg-video'
          src='background_1_1.mp4'
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <div className={`hoverButtons ${showTop ? "visible" : ""}`}>
          <button title={ isPlaying ? "Pause" : "Play" } onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            title="Top"
            onClick={() => {
              document.querySelector(".container")?.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;