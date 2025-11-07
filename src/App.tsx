import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import EnvelopeAnimation from "./EnvelopeAnimation";
import FadeSlide from "./FadeSlide";
// import Calendar from "./Calendar";
import Countdown from "./CountDown";
import Calendar from "./Calendar";
import "aos/dist/aos.css";
import AOS from "aos";

function App() {
  const [isOpenFirst, setIsOpenFirst] = useState(true);
  const [isOpenSecond, setIsOpenSecond] = useState(true);

  // Audio state
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false); // prevent auto-start after a manual pause
  const audioRef = useRef(null);

  // One-time attempt to start audio on the first user gesture (tap, click, key)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const tryStart = async () => {
      if (audioStarted || userPaused) return; // don't auto-start again if the user paused
      try {
        await a.play();
        setAudioStarted(true);
      } catch {
        // Still blocked (e.g., iOS silent switch); ignore.
      } finally {
        removeListeners();
      }
    };

    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    // IMPORTANT: use the exact same options for add/remove
    const opts: AddEventListenerOptions = { passive: true }; // capture=false

    const removeListeners = () => {
      events.forEach((e) =>
        window.removeEventListener(e, tryStart as EventListener, opts)
      );
    };

    events.forEach((e) =>
      window.addEventListener(e, tryStart as EventListener, opts)
    );
    return removeListeners;
  }, [audioStarted, userPaused]);

  // Keep isPlaying in sync with the actual audio element (covers OS/auto pauses)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  const startAudioNow = async () => {
    const a = audioRef.current;
    if (!a || userPaused) return;
    try {
      await a.play();
      setAudioStarted(true);
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio blocked:", err);
    }
  };

  const openEnvelope = async () => {
    // Start audio immediately on the user click/tap
    await startAudioNow();

    setTimeout(() => {
      setIsOpenFirst(false);
    }, 3000);

    setTimeout(() => {
      setIsOpenSecond(true);
      setIsOpenFirst(true);
    }, 4000);
  };

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (isPlaying) {
      a.pause();
      setUserPaused(true); // user explicitly paused; don't auto-start again
    } else {
      setUserPaused(false); // user explicitly wants music
      try {
        await a.play();
      } catch (err) {
        console.warn("Audio blocked:", err);
      }
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 700, // ms
      once: true, // animate only once
      easing: "ease-out-quart",
    });
  }, []);

  return (
    <div className="main" style={{ margin: "0 auto", position: "relative" }}>
      <div className="names">
        Սուրեն <span>&</span> Սուսաննա
      </div>
      <div className="play-button" onClick={togglePlay}>
        {!isPlaying ? (
          <img
            src="/play.png"
            alt="Play"
            style={{ background: "transparent" }}
          />
        ) : (
          <img src="pause.png" alt="pause" />
        )}
      </div>
      <div className="fixed-bg"></div>
      <FadeSlide
        show={isOpenFirst}
        direction="center"
        className="content"
        distance={120}
        duration={1}>
        <div className="content-center wedding" style={{ marginTop: "50px" }}>
          <div>
            <div className="title" data-aos="fade-down">
              Սիրելի՜ ընկերներ և հարազատներ, հրավիրում ենք ներկա գտնվելու մեր
              կյանքի կարևորագույն օրվան
            </div>
          </div>
        </div>
        {!isOpenSecond && (
          <>
            <div className="content-center letter-position">
              <EnvelopeAnimation openEnvelope={openEnvelope} />
            </div>
            <div className="under-letter-text">Սեղմեք բացիկի վրա</div>
          </>
        )}

        {isOpenSecond && (
          <>
            <section>
              <Calendar />
            </section>

            <div
              data-aos="fade-down"
              className="content-center"
              style={{ marginTop: "20px", marginBottom: "20px" }}>
              <div className="location">Օրվա Ծրագիր ...</div>
            </div>
            <div className="mb-50" data-aos="fade-right">
              <div className="icon content-center">
                <img src="17.png" className="bride" />
              </div>
              <section>
                <div className="description">Հարսի Տուն</div>
                <div className="description">13:30</div>
                <div className="description">
                  Գ. Չաուշի թաղ. , 14-րդ նրբ., տուն 7
                </div>
                <div className="content-center">
                  <a
                    className="button"
                    href="https://yandex.com/maps/105793/kotayk/geo/4118153982/?ll=44.414822%2C40.256360&z=17.01"
                    target="_blank"
                    rel="noreferrer">
                    Ինչպես Հասնել
                  </a>
                </div>
              </section>
            </div>
            <div className="mb-50" data-aos="fade-left">
              <div className="icon content-center" data-aos="fade-down">
                <img src="16.png" className="church" />
              </div>

              <section style={{ color: "#fff" }}>
                <div className="description">Պսակադրություն</div>
                <div className="description">15:40</div>
                <div className="description">
                  Հովհաննավանք <br />
                  Օհանավան Գյուղ
                </div>
                {/* <div className="section-img content-center">
                <img src="7.jpg" alt="" />
              </div> */}
                <div className="content-center">
                  <a
                    style={{ color: "#fff" }}
                    className="button"
                    href="https://yandex.com/maps/org/224495205780/?ll=44.384563%2C40.349016&z=14.24"
                    target="_blank"
                    rel="noreferrer">
                    Ինչպես Հասնել
                  </a>
                </div>
              </section>
            </div>
            <div className="mb-50" data-aos="fade-right">
              <div className="icon content-center" data-aos="fade-down">
                <img src="18.png" className="church" />
              </div>

              <section>
                <div className="description">Հարսանեկան Խնջույք</div>
                <div className="description">17:30</div>
                <div className="description">
                  Ashtarak Hall <br />
                  ք. Աշտարակ Սուրբ Սարգիս 71
                </div>
                {/* <div className="section-img content-center">
                <img src="7.jpg" alt="" />
              </div> */}
                <div className="content-center">
                  <a
                    className="button"
                    href="https://yandex.com/maps/org/100881804174/?ll=44.378851%2C40.294099&z=17.52"
                    target="_blank"
                    rel="noreferrer">
                    Ինչպես Հասնել
                  </a>
                </div>
              </section>
            </div>
            <footer>
              <div className="details content-center">
                <div className="countdown-section">
                  <div className="countdown-text">
                    մեր հարսանիքին մնացել է․․․
                  </div>
                  <Countdown target={undefined} />
                </div>
              </div>
            </footer>
          </>
        )}

        {/* No autoPlay; only start via a user gesture. Keep it hidden. */}
        <audio
          ref={audioRef}
          src="/music.mp3" // place music.mp3 in /public
          loop
          preload="auto"
          style={{ display: "none" }}
        />
      </FadeSlide>
    </div>
  );
}

export default App;
