import React, { useEffect, useMemo, useState } from "react";

export default function CountdownToOct12({ target }) {
  const defaultTarget = useMemo(() => new Date(2025, 11, 5, 0, 0, 0, 0), []);

  const targetDate = target ?? defaultTarget;
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let rafId: number;
    let timeoutId: number;

    const tick = () => setNow(new Date());

    const schedule = () => {
      // align updates to the next whole second
      const ms = 1000 - (Date.now() % 1000);
      timeoutId = window.setTimeout(() => {
        tick();
        rafId = requestAnimationFrame(schedule);
      }, ms);
    };

    schedule();
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const diff = targetDate.getTime() - now.getTime();
  const clamped = Math.max(0, diff);

  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);

  const dd = String(days).padStart(2, "0");
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return (
    <div className="cd-wrap">
      <style>{`
        .cd-wrap{width:100%;color:#0a0a0a;display:flex;align-items:center;justify-content:center}
        .cd-inner{width:100%;max-width:1000px;color:#fff;display:flex;flex-direction:column;align-items:center;gap:32px}
        .cd-row{display:flex;align-items:baseline;gap:clamp(16px,2.5vw,40px);user-select:none}
        .cd-cell{display:flex;flex-direction:column;align-items:center}
        .cd-digits{font-weight:900;letter-spacing:-.02em;line-height:1;font-size:clamp(48px,12vw,160px)}
        .cd-label{margin-top:16px;color:#fff;font-size:clamp(16px,2.5vw,28px)}
        .cd-colon{font-weight:900;height: 90px;padding-top:5px;line-height:1;font-size:clamp(32px,8vw,96px);align-self:center}
      `}</style>
      <div className="cd-inner">
        <div className="cd-row">
          <div className="cd-cell">
            <div className="cd-digits">{dd}</div>
            <div className="cd-label">օր</div>
          </div>
          <div className="cd-colon">:</div>
          <div className="cd-cell">
            <div className="cd-digits">{hh}</div>
            <div className="cd-label">ժամ</div>
          </div>
          <div className="cd-colon">:</div>
          <div className="cd-cell">
            <div className="cd-digits">{mm}</div>
            <div className="cd-label">րոպե</div>
          </div>
          <div className="cd-colon">:</div>
          <div className="cd-cell">
            <div className="cd-digits">{ss}</div>
            <div className="cd-label">վայրկյան</div>
          </div>
        </div>
      </div>
    </div>
  );
}
