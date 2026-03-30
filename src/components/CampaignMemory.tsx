import { Sparkles, TrendingUp } from "lucide-react";

const pastDesigns = [
  {
    label: "Spring Gen Z Story",
    approval: "1.2 days",
    score: "96%",
    color: "from-emerald-400 to-teal-500",
  },
  {
    label: "Flash Sale Story",
    approval: "0.8 days",
    score: "98%",
    color: "from-amber-400 to-orange-500",
  },
];

const CampaignMemory = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 mb-3">
        <TrendingUp className="w-3.5 h-3.5 text-primary" />
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
          From your team's history
        </h3>
      </div>
      <div className="space-y-2.5">
        {pastDesigns.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className={`w-10 h-16 rounded-md bg-gradient-to-br ${d.color} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-foreground">{d.label}</p>
              <p className="text-[10px] text-muted-foreground">
                Approved in {d.approval} · Pre-flight: {d.score}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-start gap-1.5 pt-2.5 border-t border-border">
        <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Gen Z campaigns with short, punchy headlines get approved 2.3x faster on your team.
        </p>
      </div>
    </div>
  );
};

export default CampaignMemory;
