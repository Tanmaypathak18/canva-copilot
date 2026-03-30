import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, AlertTriangle, Sparkles, ArrowRight, Clock } from "lucide-react";
import CopilotChat from "@/components/CopilotChat";
import BriefChangeAlert from "@/components/BriefChangeAlert";
import CampaignMemory from "@/components/CampaignMemory";

const briefData = [
  { label: "Campaign", value: "Q2 Gen Z Summer Drop" },
  { label: "Channel", value: "Instagram Story" },
  { label: "Audience", value: "18-24, Gen Z" },
  { label: "Tone", value: "Playful, urgent, casual" },
  { label: "Deadline", value: "April 15, 2026" },
];

const templates = [
  { id: 1, label: "Story Bold", color: "from-pink-400 to-rose-500", approval: "1.8" },
  { id: 2, label: "Summer Vibe", color: "from-orange-400 to-pink-500", best: true, approval: "1.2" },
  { id: 3, label: "Clean Drop", color: "from-violet-400 to-purple-500", approval: "2.1" },
];

const suggestions = [
  "Summer just dropped. You in?",
  "This won't last. 24hrs only.",
  "Your summer fit is here.",
];

const preflightChecks = [
  { label: "Brand colors", pass: true, key: "colors" },
  { label: "Channel format (9:16)", pass: true, key: "format" },
  { label: "Font compliance", pass: true, key: "font" },
  { label: "Tone alignment", pass: false, key: "tone" },
  { label: "Logo spacing", pass: false, key: "logo" },
];

const Create = () => {
  const navigate = useNavigate();
  const [headline, setHeadline] = useState("Discover Our Latest Summer Collection");
  const [toneScore, setToneScore] = useState(45);
  const [toneFixed, setToneFixed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(2);

  const handleSuggestion = (text: string) => {
    setHeadline(text);
    setToneScore(92);
    setToneFixed(true);
  };

  const preflightScore = toneFixed ? 92 : 78;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-10 border-b border-border flex items-center justify-between px-5 shrink-0 bg-card">
        <div className="flex items-center gap-3">
          <h1 className="text-[13px] font-semibold text-foreground">Editing</h1>
          <span className="text-[13px] text-muted-foreground">Untitled design - Instagram Story</span>
          <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            Draft
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>Auto-saving</span>
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
          </div>
          <span className="text-border">|</span>
          <span>33%</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[60%] border-r border-border flex items-center justify-center bg-muted/50 p-8">
          <div className="relative w-[320px] rounded-2xl overflow-hidden shadow-xl border border-border bg-black">
            <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-orange-300" />
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white_0%,transparent_60%)]" />
              <div className="relative h-full flex flex-col px-6 py-8">
                <div className="self-center mb-auto flex items-center gap-2 px-3 py-2">
                  <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-xs font-black text-rose-500">V</span>
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">VIBE&CO</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <h2
                    className="text-[22px] leading-tight text-white"
                    style={{
                      fontFamily: toneFixed ? "'Inter', sans-serif" : "Georgia, 'Times New Roman', serif",
                      fontWeight: toneFixed ? 700 : 400,
                      letterSpacing: toneFixed ? "-0.01em" : "0.01em",
                    }}
                  >
                    {headline.includes(".") ? headline.split(".").map((s, i) => (
                      <span key={i}>{s.trim()}{i < headline.split(".").length - 1 ? "." : ""}<br /></span>
                    )) : headline}
                  </h2>
                  {!toneFixed && (
                    <p className="text-[9px] text-white/40 font-mono tracking-wide uppercase">
                      AI: Headline reads formal for Gen Z audience
                    </p>
                  )}
                </div>

                <div className="self-center mb-5 w-36 h-36 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white/15 flex items-center justify-center">
                      <span className="text-2xl">👟</span>
                    </div>
                    <span className="text-[10px] text-white/60 font-medium">Product Image</span>
                  </div>
                </div>

                <button className="self-center px-10 py-3 rounded-full bg-white text-rose-500 text-sm font-bold tracking-wide shadow-lg shadow-black/20 cursor-default">
                  Shop Now
                </button>

                <div className="flex gap-1 mt-5">
                  <div className="flex-1 h-0.5 rounded-full bg-white" />
                  <div className="flex-1 h-0.5 rounded-full bg-white/30" />
                  <div className="flex-1 h-0.5 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[40%] flex flex-col">
          <BriefChangeAlert />

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Project Brief</h3>
                <Badge variant="secondary" className="text-[10px] font-medium bg-primary/8 text-primary border-primary/15">
                  Synced from Asana
                </Badge>
              </div>
              <div className="space-y-2">
                {briefData.map((item) => (
                  <div key={item.label} className="flex items-start justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-medium text-foreground text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border">
                Last updated by Karen L. · 10 min ago
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Recommended Templates</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`relative rounded-lg overflow-hidden border text-left transition-all ${
                      selectedTemplate === t.id
                        ? "border-primary ring-1 ring-primary/30"
                        : "border-border hover:border-primary/20"
                    }`}
                  >
                    <div className={`w-full aspect-[9/16] bg-gradient-to-br ${t.color}`} />
                    {t.best && (
                      <div className="absolute top-1 left-1">
                        <span className="text-[8px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Best match</span>
                      </div>
                    )}
                    <div className="p-1.5">
                      <p className="text-[10px] font-medium text-foreground">{t.label}</p>
                      <p className="text-[9px] text-muted-foreground">Avg approval: {t.approval} days</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                Ranked by channel fit, audience match, and team approval speed
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Copy Analysis</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-1">Current headline</p>
              <p className={`text-xs font-medium mb-3 ${toneFixed ? "text-foreground" : "text-muted-foreground italic"}`}>
                "{headline}"
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] text-muted-foreground">Tone match</span>
                <span className={`text-[11px] font-semibold ${toneFixed ? "text-success" : "text-warning"}`}>{toneScore}%</span>
              </div>
              <Progress value={toneScore} className={`h-1.5 mb-2 ${toneFixed ? "[&>div]:bg-success" : "[&>div]:bg-warning"}`} />
              {!toneFixed && (
                <>
                  <p className="text-[11px] text-muted-foreground mb-3">
                    Brief requests casual and urgent. This headline reads formal.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {toneFixed && (
                <p className="text-[11px] text-success flex items-center gap-1">
                  <Check className="w-3 h-3" /> Tone aligned with brief
                </p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Suggested Assets</h3>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[
                  { emoji: "👟", label: "Summer kicks" },
                  { emoji: "🕶️", label: "Shades" },
                  { emoji: "👕", label: "Drop tee" },
                ].map((item, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-muted border border-border flex flex-col items-center justify-center gap-1 hover:border-primary/30 cursor-pointer transition-colors">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-[9px] text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <Badge variant="secondary" className="text-[9px] bg-success/10 text-success border-success/20">
                  Team library
                </Badge>
                <span className="text-[10px] text-muted-foreground">From Q1 campaign shoot</span>
              </div>
              <p className="text-[10px] text-primary/70 font-medium mt-1">Team assets get approved 2x faster than stock</p>
            </div>

            <CampaignMemory />

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Pre-flight Check</h3>
                <span className={`text-xs font-bold ${preflightScore >= 90 ? "text-success" : "text-warning"}`}>{preflightScore}%</span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2.5">
                {preflightScore >= 90
                  ? "Looking good. Ready to submit."
                  : `${preflightChecks.filter(c => !c.pass && !(c.key === "tone" && toneFixed)).length} items to address before submitting`
                }
              </p>
              <Progress value={preflightScore} className={`h-1.5 mb-3 ${preflightScore >= 90 ? "[&>div]:bg-success" : "[&>div]:bg-warning"}`} />
              <div className="space-y-2">
                {preflightChecks.map((c) => {
                  const isPass = c.pass || (c.key === "tone" && toneFixed);
                  return (
                    <div key={c.label} className="flex items-center gap-2">
                      {isPass ? (
                        <Check className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                      )}
                      <span className="text-xs text-foreground">{c.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <CopilotChat />
          </div>

          <div className="border-t border-border p-4">
            <Button className="w-full" onClick={() => setShowModal(true)}>
              Submit for Review
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              Submitted for Review
            </DialogTitle>
            <DialogDescription asChild>
              <div className="pt-3 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reviewer</span>
                  <span className="font-medium text-foreground">James R. (Brand Manager)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated review</span>
                  <span className="font-medium text-foreground">1.5 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pre-flight score</span>
                  <span className={`font-medium ${preflightScore >= 90 ? "text-success" : "text-warning"}`}>{preflightScore}%</span>
                </div>
                {preflightScore < 90 && (
                  <div className="rounded-md bg-warning/5 border border-warning/20 p-2.5">
                    <p className="text-[11px] text-foreground">
                      <span className="font-medium">Tip:</span> Fix the remaining items now to increase approval likelihood. Designs above 90% get approved 2.3x faster.
                    </p>
                  </div>
                )}
                <div className="text-[11px] text-muted-foreground pt-2 border-t border-border">
                  Asana task updated to "Pending Review" · James R. notified
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Button className="w-full mt-2" onClick={() => navigate("/review")}>
            Go to Review <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Create;
