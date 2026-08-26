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
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

    const handleScroll = () => {
      setShowTop(container.scrollTop > 50);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById("soundcloud-player");

    if (!iframe || !window.SC) return;

    const widget = window.SC.Widget(iframe);

    playerRef.current = widget;

    widget.bind(window.SC.Widget.Events.READY, () => {
      console.log("SoundCloud player ready");
      setPlayerReady(true);
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
      <div className='page-wrapper'>
        <video className='bg-video' src='background_1_1.mp4' autoPlay muted loop />
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
              document.querySelector(".container").scrollTo({
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
