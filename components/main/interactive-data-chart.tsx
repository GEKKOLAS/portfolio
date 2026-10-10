"use client";

import { useState } from "react";

type Props = { bars: number[]; label: string; axis: string };

const ranges = [
  { label: "All", size: Infinity },
  { label: "Last 6", size: 6 },
  { label: "Last 3", size: 3 },
];

/** Bar chart with hover values and a range switch. Used in the data-project modal. */
export function InteractiveDataChart({ bars, label, axis }: Props) {
  const [range, setRange] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const count = Math.min(bars.length, ranges[range].size);
  const offset = bars.length - count;
  const shown = bars.slice(offset);
  const max = Math.max(...shown);
  const focus = hover ?? shown.length - 1;
  const diff = shown[focus] - shown[0];

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">{label}</span>
          <div className="mt-2 flex items-baseline gap-2.5">
            <span className="text-3xl font-semibold tracking-tight text-white tabular-nums">{shown[focus]}</span>
            <span className={`text-xs font-semibold ${focus === 0 ? "text-zinc-500" : diff > 0 ? "text-cyan-300" : "text-fuchsia-300"}`}>
              {focus === 0 ? "start of range" : `${diff > 0 ? "+" : ""}${diff} vs start of range`}
            </span>
          </div>
          <span className="text-[11.5px] text-zinc-500">Point {offset + focus + 1} of {bars.length}</span>
        </div>
        <div role="group" aria-label="Chart range" className="flex gap-[3px] rounded-full border border-white/10 bg-zinc-800/60 p-[3px]">
          {ranges.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={range === index}
              onClick={() => { setRange(index); setHover(null); }}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${range === index ? "bg-cyan-300 text-zinc-950" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div onMouseLeave={() => setHover(null)} className="mt-5 flex h-48 items-end gap-1.5 border-b border-white/[0.14] pb-px sm:gap-3">
        {shown.map((value, index) => {
          const isOn = index === hover;
          const isLast = index === shown.length - 1;
          const height = `${Math.round((value / max) * 78)}%`;
          return (
            <div
              key={offset + index}
              onMouseEnter={() => setHover(index)}
              onFocus={() => setHover(index)}
              tabIndex={0}
              aria-label={`Point ${offset + index + 1}: ${value}`}
              className="relative flex h-full flex-1 cursor-crosshair flex-col items-center justify-end gap-2 outline-none"
            >
              {isOn ? (
                <div className="absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-[10px] border border-cyan-400/40 bg-zinc-950/95 px-2.5 py-1.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]" style={{ bottom: `calc(${height} + 30px)` }}>
                  <div className="text-[13px] font-semibold text-white tabular-nums">{value}</div>
                  <div className="text-[10.5px] text-zinc-500">Point {offset + index + 1}</div>
                </div>
              ) : null}
              <span className={`text-[11px] font-medium tabular-nums ${isOn || isLast ? "text-cyan-300" : "text-zinc-500"}`}>{value}</span>
              <div
                className="w-full rounded-t-md transition-[height,background] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  height,
                  background: isOn
                    ? "linear-gradient(to top, rgba(34,211,238,0.4), #A5F3FC)"
                    : isLast
                      ? "linear-gradient(to top, rgba(34,211,238,0.22), #67E8F9)"
                      : "linear-gradient(to top, rgba(34,211,238,0.14), rgba(103,232,249,0.6))",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10.5px] text-zinc-500">
        <span>Point {offset + 1}</span>
        <span>{axis}</span>
      </div>
    </div>
  );
}
