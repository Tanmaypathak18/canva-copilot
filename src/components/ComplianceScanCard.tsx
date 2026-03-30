import { useState } from "react";
import { Check, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CheckItem {
  id: string;
  label: string;
  status: "pass" | "warn";
  detail?: string;
  fixType?: "tone" | "logo";
}

const initialChecks: CheckItem[] = [
  { id: "colors", label: "Brand colors", status: "pass" },
  { id: "font", label: "Font compliance", status: "pass" },
  { id: "format", label: "Channel format", status: "pass" },
  { id: "logo", label: "Logo spacing", status: "warn", detail: "Logo is 4px below minimum safe zone", fixType: "logo" },
  { id: "tone", label: "Tone alignment", status: "warn", detail: "Headline reads formal, brief requests casual", fixType: "tone" },
];

const toneSuggestions = [
  "Summer just dropped. You in?",
  "This won't last. 24hrs only.",
  "Your summer fit is here.",
];

interface ComplianceScanCardProps {
  onScoreChange?: (score: number) => void;
}

const ComplianceScanCard = ({ onScoreChange }: ComplianceScanCardProps) => {
  const [checks, setChecks] = useState(initialChecks);
  const [expandedFix, setExpandedFix] = useState<string | null>(null);
  const [score, setScore] = useState(92);

  const handleFix = (id: string, type?: string) => {
    if (type === "tone") {
      setExpandedFix(expandedFix === id ? null : id);
      return;
    }
    // Direct fix for logo
    applyFix(id);
  };

  const applyFix = (id: string) => {
    setChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "pass" as const, detail: undefined } : c))
    );
    const newScore = Math.min(100, score + 4);
    setScore(newScore);
    onScoreChange?.(newScore);
    if (expandedFix === id) setExpandedFix(null);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Compliance Scan</h3>

      {(() => {
        const warnCount = checks.filter((c) => c.status === "warn").length;
        const label =
          warnCount === 0
            ? "All clear — looking great"
            : `Almost ready, ${warnCount} item${warnCount > 1 ? "s" : ""} to address`;
        return (
          <>
            <div className="flex items-center gap-3 mb-1.5">
              <Progress value={score} className="h-2 flex-1" />
              <span className="text-sm font-semibold text-foreground tabular-nums">{score}%</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">{label}</p>
          </>
        );
      })()}

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
                      onClick={() => applyFix(item.id)}
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
