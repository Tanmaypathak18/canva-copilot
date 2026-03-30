import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Circle, ExternalLink, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWorkflow } from "@/context/WorkflowContext";

const briefData = [
  { label: "Campaign", value: "Q2 Gen Z Summer Drop" },
  { label: "Channel", value: "Instagram Story" },
  { label: "Audience", value: "18-24, Gen Z, trend-conscious" },
  { label: "Tone", value: "Playful, urgent, casual" },
  { label: "Key message", value: "Summer collection launch, create urgency, highlight limited availability" },
  { label: "Deadline", value: "April 15, 2026" },
  { label: "Assigned to", value: "Priya M., APAC Marketing" },
  { label: "Reviewer", value: "James R., Brand Manager" },
];

const milestoneLabels = ["Not Started", "In Progress", "Pending Review", "Revisions", "Approved"];

const Brief = () => {
  const navigate = useNavigate();
  const { phase, activities } = useWorkflow();
  const [showIntro, setShowIntro] = useState(true);

  const phaseIndex = {
    "not-started": 0,
    "in-progress": 1,
    "submitted": 2,
    "changes-requested": 3,
    "approved": 4,
  }[phase];

  const phaseBadge = {
    "not-started": { label: "Not Started", cls: "bg-muted text-muted-foreground" },
    "in-progress": { label: "In Progress", cls: "bg-primary/15 text-primary border-primary/20" },
    "submitted": { label: "Pending Review", cls: "bg-warning/15 text-warning border-warning/20" },
    "changes-requested": { label: "Revisions Requested", cls: "bg-warning/15 text-warning border-warning/20" },
    "approved": { label: "Approved", cls: "bg-success text-success-foreground" },
  }[phase];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-8 px-6 space-y-6">
        {showIntro && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 relative">
            <button onClick={() => setShowIntro(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Context-Aware Creative Copilot for Canva Teams</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  This prototype follows one Instagram Story design through the complete collaboration workflow.
                  Click through the 4 tabs to see how AI bridges project context across personas and tools.
                  Actions on each page update the shared workflow state across all pages.
                </p>
                <div className="flex gap-4 text-[11px]">
                  <span className="text-violet-600 font-medium">Brief: Karen (orchestrator)</span>
                  <span className="text-pink-600 font-medium">Create: Priya (creator)</span>
                  <span className="text-blue-600 font-medium">Review: James (reviewer)</span>
                  <span className="text-green-600 font-medium">Status: Karen (visibility)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">KL</span>
          </div>
          <span className="text-xs text-muted-foreground">Karen L. (Marketing Lead) viewing campaign in Asana</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Q2 Gen Z Summer Drop</h1>
            <Badge className={`text-xs font-medium ${phaseBadge.cls}`}>{phaseBadge.label}</Badge>
          </div>
        </div>

        <Card className="border border-border">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Campaign Brief</span>
            <Badge className="bg-success/15 text-success border-success/20 text-xs font-medium">Synced to Canva</Badge>
          </div>
          <div className="px-5 py-4 space-y-3">
            {briefData.map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="w-28 shrink-0 text-muted-foreground">{label}</span>
                <span className="text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-border px-5 py-5">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[11px] left-[11px] right-[11px] h-[2px] bg-border" />
            <div
              className="absolute top-[11px] left-[11px] h-[2px] bg-success transition-all duration-500"
              style={{ width: `calc(${(phaseIndex / 4) * 100}% - 11px)` }}
            />
            {milestoneLabels.map((label, i) => {
              const isCompleted = i < phaseIndex;
              const isActive = i === phaseIndex;
              return (
                <div key={label} className="flex flex-col items-center gap-2 relative z-10">
                  {isCompleted ? (
                    <div className="w-[22px] h-[22px] rounded-full bg-success flex items-center justify-center">
                      <Check className="w-3 h-3 text-success-foreground" />
                    </div>
                  ) : isActive ? (
                    <div className="w-[22px] h-[22px] rounded-full bg-primary flex items-center justify-center">
                      <Circle className="w-2.5 h-2.5 text-primary-foreground fill-primary-foreground" />
                    </div>
                  ) : (
                    <div className="w-[22px] h-[22px] rounded-full bg-secondary border-2 border-border" />
                  )}
                  <span className={`text-[11px] font-medium ${
                    isActive ? "text-primary" : isCompleted ? "text-success" : "text-muted-foreground"
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="border border-border">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Activity</span>
            <span className="text-[11px] text-muted-foreground">{activities.length} events</span>
          </div>
          <div className="px-5 py-3 space-y-4">
            {activities.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                  {item.ai ? (
                    <Sparkles className="w-3 h-3 text-white" />
                  ) : (
                    <span className="text-[10px] font-bold text-white">{item.initials}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.name}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Button onClick={() => navigate("/create")} className="w-full gap-2">
          <ExternalLink className="w-4 h-4" />
          View in Canva
        </Button>
      </div>
    </div>
  );
};

export default Brief;
