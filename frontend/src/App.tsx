import { useState } from "react";
import { Search, Command } from "lucide-react";

const sampleArticles = [
  {
    label: "AP News",
    icon: "/images/ap.png",
    url: "https://apnews.com/article/cuba-power-outage-electricity-trump-28db6c460ed84df539a574bed16a819d",
  },
  {
    label: "Fox News",
    icon: "/images/fox.png",
    url: "https://www.foxnews.com/sports/usc-legend-says-hes-given-school-officials-strong-answer-whether-hed-unretire-number-recruits",
  },
  {
    label: "CNN",
    icon: "/images/cnn.png",
    url: "https://www.cnn.com/2026/03/17/science/little-red-dots-webb-telescope-photos",
  },
];

export default function App() {
  const [url, setUrl] = useState("");

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 35% 55% at 0% 50%, #cdd3ee 0%, transparent 100%), radial-gradient(ellipse 35% 55% at 100% 50%, #e8d0ee 0%, transparent 100%), #f4f4f9",
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Title and subtitle */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
            3D Word Cloud
          </h1>
          <p className="text-base text-slate-500">
            Paste a news article URL to visualize its topics in 3D
          </p>
        </div>

        {/* Searchbar */}
        <div
          className="w-170 rounded-2xl p-px shadow-lg shadow-violet-200/50 mb-6"
          style={{
            background:
              "linear-gradient(to right, #38bdf870, #a78bfa70, #d8b4fe70, #f9a8d470)",
          }}
        >
          <div className="rounded-[calc(1rem-1px)] bg-white px-6 py-4 flex items-center gap-4">
            <Search size={22} color="#7070b0" className="shrink-0" />

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a url..."
              className="flex-1 bg-transparent outline-none border-none text-gray-500 placeholder-slate-500 text-base"
              onKeyDown={(e) => e.key === "Enter" && alert("test")}
            />

            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[rgba(200,200,220,0.3)] border border-[rgba(180,180,210,0.3)] text-[#7070b0]">
                <Command size={14} />
              </div>
              <span className="text-sm text-[#7070b0]">·</span>
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[rgba(200,200,220,0.3)] border border-[rgba(180,180,210,0.3)] text-sm text-[#7070b0] leading-none">
                /
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample news article pills */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>Try:</span>
        {sampleArticles.map(({ label, icon, url: sampleUrl }) => (
          <button
            key={label}
            onClick={() => setUrl(sampleUrl)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-200 bg-white/60 hover:bg-white transition-colors text-slate-500 cursor-pointer text-xs"
          >
            <img
              src={icon}
              alt={label}
              className="w-5 h-5 object-contain rounded-sm"
            />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
