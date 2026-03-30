import { useState } from "react";
import { Check, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const toneSuggestions = [
  "Summer just dropped. You in?",
  "This won't last. 24hrs only.",
  "Your summer fit is here.",
];

interface ComplianceScanCardProps {
  onLogoFix?: () => void;
  logoFixed?: boolean;
  toneFixed?: boolean;
}

const ComplianceScanCard = ({ onLogoFix, logoFixed = false, toneFixed = false }: ComplianceScanCardProps) => {
  const [localLogoFixed, setLocalLogoFixed] = useState(false);
  const [localToneFixed, setLocalToneFixed] = useState(false);
  const [expandedFix, setExpandedFix] = useState<string | null>(null);

  const isLogoFixed = logoFixed || localLogoFixed;
  const isToneFixed = toneFixed || localToneFixed;

  const checks = [
    { id: "colors", label: "Brand colors", status: "pass" as const },
    { id: "font", label: "Font compliance", status: "pass" as const },
    { id: "format", label: "Channel format", status: "pass" as const },
    { id: "logo", label: "Logo spacing", status: (isLogoFixed ? "pass" : "warn") as const, detail: isLogoFixed ? undefined : "Logo is 4px below minimum safe zone", fixType: "logo" },
    { id: "tone", label: "Tone alignment", status: (isToneFixed ? "pass" : "warn") as const, detail: isToneFixed ? undefined : "Headline reads formal, brief requests casual", fixType: "tone" },
  ];

  const warnCount = checks.filter(c => c.status === "warn").length;
  const score = 78 + (isLogoFixed ? 4 : 0) + (isToneFixed ? 4 : 0) + (warnCount === 0 ? 14 : 0);
  const displayScore = Math.min(score, 100);

  const handleFix = (id: string, type?: string) => {
    if (type === "tone") {
      setExpandedFix(expandedFix === id ? null : id);
      return;
    }
    if (type === "logo") {
      setLocalLogoFixed(true);
      onLogoFix?.();
    }
  };

  const handleToneSuggestion = () => {
    setLocalToneFixed(true);
    setExpandedFix(null);
  };

  const label = warnCount === 0
    ? "All clear. Looking great."
    : `Almost ready, ${warnCount} item${warnCount > 1 ? "s" : ""} to address`;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Compliance Scan</h3>
      <div className="flex items-center gap-3 mb-1.5">
        <Progress value={displayScore} className="h-2 flex-1" />
        <span className="text-sm font-semibold text-foreground tabular-nums">{displayScore}%</span>
      </div>
      <p className="text-[11px] text-muted-foreground mb-4">{label}</p>

      <div className="space-y-1">
        {checks.map((item) => (
          <div key={item.id}>
            <div className="flex items-center gap-2 py-1.5">
              {item.status === "pass" ? (
                <Check className="h-3.5 w-3.5 text-success shrink-0" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />
              )}
              <span className="text-xs text-foreground flex-1">{item.label}</span>
              {item.status === "warn" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-[10px] font-medium text-primary hover:bg-primary/10 gap-1"
                  onClick={() => handleFix(item.id, item.fixType)}
                >
                  <Sparkles className="h-3 w-3" />
                  Fix with AI
                </Button>
              )}
            </div>
            {item.status === "warn" && item.detail && (
              <p className="text-[11px] text-muted-foreground ml-5.5 pl-[22px] pb-1">{item.detail}</p>
            )}
            {expandedFix === item.id && item.fixType === "tone" && (
              <div className="ml-[22px] mb-2 p-3 rounded-md bg-surface-overlay border border-border">
                <p className="text-[11px] text-muted-foreground mb-1.5">Current: "Discover Our Latest Summer Collection"</p>
                <p className="text-[11px] font-medium text-foreground mb-2">AI Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {toneSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={handleToneSuggestion}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceScanCard;
