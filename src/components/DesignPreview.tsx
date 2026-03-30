const DesignPreview = () => {
  return (
    <div className="flex items-center justify-center h-full bg-muted/50 p-8">
      <div className="relative w-[320px] rounded-2xl overflow-hidden shadow-xl border border-border bg-black">
        {/* Story canvas — 9:16 ratio */}
        <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
          {/* Gradient background — warm summer vibe */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600" />

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white_0%,transparent_60%)]" />

          {/* Content layer */}
          <div className="relative h-full flex flex-col px-6 py-8">
            {/* Logo area with compliance issue indicator */}
            <div className="relative self-center mb-auto">
              {/* Dotted outline showing the spacing issue */}
              <div className="absolute -inset-2 border-2 border-dashed border-yellow-300/70 rounded-lg" />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[8px] font-mono text-yellow-300 bg-black/40 px-1.5 py-0.5 rounded">
                  ↕ 4px below safe zone
                </span>
              </div>
              {/* Fake logo */}
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                  <span className="text-xs font-black text-purple-600">V</span>
                </div>
                <span className="text-sm font-bold text-white tracking-wide">VIBE&CO</span>
              </div>
            </div>

            {/* Headline — intentionally formal/corporate to show tone mismatch */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h2
                className="text-[22px] leading-tight text-white"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.01em" }}
              >
                Discover Our Latest
                <br />
                Summer Collection
              </h2>
              <p className="text-[10px] text-white/50 font-mono tracking-wide uppercase">
                ↑ Reads formal — brief requests casual tone
              </p>
            </div>

            {/* Product placeholder */}
            <div className="self-center mb-5 w-36 h-36 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white/15 flex items-center justify-center">
                  <span className="text-2xl">👟</span>
                </div>
                <span className="text-[10px] text-white/60 font-medium">Product Image</span>
              </div>
            </div>

            {/* CTA button */}
            <button className="self-center px-10 py-3 rounded-full bg-white text-purple-700 text-sm font-bold tracking-wide shadow-lg shadow-black/20 cursor-default">
              Shop Now
            </button>

            {/* Story progress bars */}
            <div className="flex gap-1 mt-5">
              <div className="flex-1 h-0.5 rounded-full bg-white" />
              <div className="flex-1 h-0.5 rounded-full bg-white/30" />
              <div className="flex-1 h-0.5 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPreview;
