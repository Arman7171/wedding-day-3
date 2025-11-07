import React, { useMemo } from "react";

// Armenian labels
const AM_MONTH = "Դեկտեմբեր"; // Dektember
const AM_DAYS = ["Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ", "Կիր"];

function buildMonthMatrix(year, monthIndex1to12, limitDays = 12) {
  // Returns a matrix of weeks (Mon..Sun), with 0 for padding days
  const first = new Date(year, monthIndex1to12 - 1, 1);
  const startWeekday = (first.getDay() + 6) % 7; // Mon=0..Sun=6
  const daysInMonth = Math.min(
    new Date(year, monthIndex1to12, 0).getDate(),
    limitDays
  );

  const weeks = [];
  let cur = 1;

  // first row with padding
  const firstWeek = Array(7).fill(0);
  for (let i = startWeekday; i < 7 && cur <= daysInMonth; i++) {
    firstWeek[i] = cur++;
  }
  weeks.push(firstWeek);

  // other rows
  while (cur <= daysInMonth) {
    const week = Array(7)
      .fill(0)
      .map((_, i) => (cur + i <= daysInMonth ? cur + i : 0));
    cur += 7;
    weeks.push(week);
  }

  return weeks;
}

export default function Calendar() {
  const year = 2025;
  const month = 12; // Dektember (December)
  const activeDay = 5; // fixed
  const weeks = useMemo(() => buildMonthMatrix(year, month, 31), [year, month]);

  return (
    <div className="cal-wrap">
      <style>{`
        :root {
          --bg: transparent;
          --ink: #1f2937;
          --muted: #d1b27b;
          --card: #d1b27b;
          --ring: #ffffffff;
          --shadow: 0 2px 8px rgba(0,0,0,.06);
        }
        .cal-wrap { background: var(--bg); color: #fff; display: flex; align-items: flex-start; justify-content: center; padding: 40px 16px; }
        .cal { width: 100%; max-width: 300px; }
        .cal-header { display:flex; align-items:center; gap: 16px; margin-bottom: 32px; }
        .cal-rule { height:1px; background:#dadada; flex:1; }
        .cal-title { font-size: 25px; line-height:1.1; font-weight: 500; font-style: italic; letter-spacing:.02em; }
        .cal-title span { font-style: normal; color: var(--muted); font-weight: 400; margin-left: 8px; font-size: .75em; }

        .grid-7 { display:grid; grid-template-columns: repeat(7, 1fr); gap:21px; }
        .grid-8 { display:grid; grid-template-columns: repeat(7, 1fr); gap:24px; }
        .dow { text-align:center; color: var(--muted); font-weight: 600; font-size: 18px; }

        .day {
          position: relative; aspect-ratio: 1 / 1; border-radius: 16px; display:flex; align-items:center; justify-content:center;
          font-size: 12px; background: var(--card); box-shadow: var(--shadow); color: var(--ink);
          user-select: none;
          padding-top: 3px;
        }
        .day--pad { opacity: 0; }
        .day--active { font-weight: 700; box-shadow: var(--shadow); }
        .day--active:after {
          content: ""; position:absolute; inset:-10px; border:6px solid var(--ring); border-radius: 28px;
        }

        @media (min-width: 768px) {
          .dow { font-size: 16px; }
          .day { font-size: 18px; border-radius: 20px; }
          .day--active:after { border-radius: 32px; }
        }
      `}</style>

      <div className="cal">
        <div className="cal-header">
          <div className="cal-rule" />
          <h1 className="cal-title">{AM_MONTH}</h1>
          <div className="cal-rule" />
        </div>

        <div className="grid-7" style={{ marginBottom: 12 }}>
          {AM_DAYS.map((d) => (
            <div className="dow" key={d}>
              {d}
            </div>
          ))}
        </div>

        <div className="grid-8">
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              const isPad = day === 0;
              const isActive = day === activeDay;
              return (
                <div
                  key={`${wi}-${di}`}
                  className={[
                    "day",
                    isPad ? "day--pad" : "",
                    isActive ? "day--active" : "",
                  ].join(" ")}>
                  {!isPad && day}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
