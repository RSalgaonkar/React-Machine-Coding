import { useEffect, useMemo, useState } from 'react';

const SOURCE_TEXT =
  'React machine coding rounds reward reusable components, strong state design, and predictable asynchronous behavior.';

export default function TextStreamer() {
  const [speed, setSpeed] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying || index >= SOURCE_TEXT.length) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => prev + 1);
    }, speed);

    return () => window.clearInterval(timer);
  }, [isPlaying, speed, index]);

  const visibleText = useMemo(() => SOURCE_TEXT.slice(0, index), [index]);

  return (
    <div className="space-y-4">
      <div className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-lg leading-8 text-slate-800">
        {visibleText}
        <span className="animate-pulse font-bold">|</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-xl bg-blue-600 px-4 py-2 text-white"
          onClick={() => setIsPlaying(true)}
        >
          Start
        </button>
        <button
          className="rounded-xl bg-slate-700 px-4 py-2 text-white"
          onClick={() => setIsPlaying(false)}
        >
          Pause
        </button>
        <button
          className="rounded-xl bg-slate-200 px-4 py-2 text-slate-900"
          onClick={() => {
            setIndex(0);
            setIsPlaying(false);
          }}
        >
          Reset
        </button>
      </div>

      <div className="max-w-sm">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Speed: {speed}ms
        </label>
        <input
          type="range"
          min="20"
          max="300"
          step="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}