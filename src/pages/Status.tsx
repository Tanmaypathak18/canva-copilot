import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const milestones = [
  { label: "Not Started", status: "completed" },
  { label: "In Progress", status: "completed" },
  { label: "Pending Review", status: "completed" },
  { label: "Revisions", status: "completed" },
  { label: "Approved", status: "completed" },
] as const;

const activities = [
  { name: "Karen L.", initials: "KL", action: "created campaign brief", time: "March 24, 9:00am", color: "bg-violet-500", ai: false },
  { name: "System", initials: "SY", action: "brief synced to Canva workspace", time: "March 24, 9:01am", color: "bg-muted-foreground", ai: true },
  { name: "Priya M.", initials: "PM", action: "started design", time: "March 25, 10:30am", color: "bg-pink-500", ai: false },
  { name: "AI Copilot", initials: "AI", action: "pre-flight scan: 78% ready, 2 items flagged", time: "March 25, 1:00pm", color: "bg-primary", ai: true },
  { name: "Priya M.", initials: "PM", action: "applied AI copy suggestion (tone match improved to 92%)", time: "March 25, 1:15pm", color: "bg-pink-500", ai: false },
  { name: "Priya M.", initials: "PM", action: "submitted for review (pre-flight: 92%)", time: "March 25, 2:15pm", color: "bg-pink-500", ai: false },
  { name: "AI Copilot", initials: "AI", action: "compliance scan complete: 2 items flagged for reviewer", time: "March 25, 2:16pm", color: "bg-primary", ai: true },
  { name: "James R.", initials: "JR", action: "applied AI fix for logo spacing (+4% compliance)", time: "March 26, 9:30am", color: "bg-blue-500", ai: false },
  { name: "James R.", initials: "JR", action: "approved design", time: "March 26, 9:45am", color: "bg-blue-500", ai: false },
  { name: "System", initials: "SY", action: "Asana task auto-updated to Approved", time: "March 26, 9:45am", color: "bg-muted-foreground", ai: true },
  { name: "System", initials: "SY", action: "Slack notification sent to #q2-summer-campaign", time: "March 26, 9:45am", color: "bg-muted-foreground", ai: true },
];

const derivatives = [
  { label: "LinkedIn banner", ratio: "1200x628", similarity: 94, autoApproved: true },
  { label: "Facebook post", ratio: "1080x1080", similarity: 91, autoApproved: true },
  { label: "Email header", ratio: "600x200", similarity: 78, autoApproved: false },
];

const Status = () => {
  const [showDerivatives, setShowDerivatives] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-8 px-6 space-y-6">
        {/* Persona label */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">KL</span>
          </div>
          <span className="text-xs text-muted-foreground">Karen L. (Marketing Lead) tracking progress in Asana</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Q2 Gen Z Summer Drop</h1>
          <Badge className="bg-success text-success-foreground text-xs font-medium">Approved</Badge>
        </div>

        {/* Milestone Tracker */}
        <Card className="border border-border px-5 py-5">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[11px] left-[11px] right-[11px] h-[2px] bg-success" />
            {milestones.map(({ label }) => (
              <div key={label} className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-[22px] h-[22px] rounded-full bg-success flex items-center justify-center">
                  <Check className="w-3 h-3 text-success-foreground" />
                </div>
                <span className="text-[11px] font-medium text-success">{label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Timeline */}
        <Card className="border border-border">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Activity timeline</span>
            <span className="text-[11px] text-muted-foreground">{activities.length} events</span>
          </div>
          <div className="px-5 py-3 space-y-0">
            {activities.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                    {item.ai ? (
                      <Sparkles className="w-3 h-3 text-white" />
                    ) : (
                      <span className="text-[10px] font-bold text-white">{item.initials}</span>
                    )}
                  </div>
                  {i < activities.length - 1 && <div className="w-px h-8 bg-border" />}
                </div>
                <div className="flex-1 min-w-0 pb-3">
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

        {/* Approved Assets + Derivative Approval (F13) */}
        <Card className="border border-border">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-sm font-semibold text-foreground">Approved assets</span>
          </div>
          <div className="px-5 py-4 flex items-start gap-4">
            <div className="w-16 h-28 rounded-lg overflow-hidden shrink-0 border border-border">
              <div className="w-full h-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600" />
            </div>
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-foreground">Instagram Story (master)</p>
              <div className="flex gap-1.5 flex-wrap">
                <Badge variant="secondary" className="text-[10px]">Approved</Badge>
                <Badge variant="secondary" className="text-[10px]">Instagram Story</Badge>
                <Badge variant="secondary" className="text-[10px]">Q2 Gen Z</Badge>
              </div>
              <button
                onClick={() => setShowDerivatives(!showDerivatives)}
                className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
              >
                <Copy className="w-3 h-3" />
                Create derivatives (resize for other channels)
              </button>
            </div>
          </div>

          {/* Derivative Approval Scoring (F13) */}
          {showDerivatives && (
            <div className="px-5 pb-4 pt-1">
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <p className="text-xs font-semibold text-foreground">AI derivative approval scoring</p>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  AI compares each adapted version to the approved master. Derivatives above 90% similarity can be auto-approved by team policy.
                </p>
                {derivatives.map((d) => (
                  <div key={d.label} className="flex items-center justify-between py-2 border-t border-border">
                    <div>
                      <p className="text-xs font-medium text-foreground">{d.label}</p>
                      <p className="text-[10px] text-muted-foreground">{d.ratio}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-semibold ${d.similarity >= 90 ? "text-success" : "text-warning"}`}>
                        {d.similarity}% match
                      </span>
                      {d.autoApproved ? (
                        <Badge className="text-[9px] bg-success/10 text-success border-success/20">Auto-approved</Badge>
                      ) : (
                        <Badge className="text-[9px] bg-warning/10 text-warning border-warning/20">Needs review</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Performance Metrics */}
        <Card className="border border-border">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-sm font-semibold text-foreground">Performance</span>
          </div>
          <div className="px-5 py-4 grid grid-cols-3 gap-4">
            <div>
              <p className="text-lg font-semibold text-foreground">4.5 hrs</p>
              <p className="text-[11px] text-muted-foreground">Total time</p>
              <p className="text-[10px] text-success font-medium">Team avg: 12 hrs</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">1</p>
              <p className="text-[11px] text-muted-foreground">Revision cycles</p>
              <p className="text-[10px] text-success font-medium">Team avg: 3.2</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">78% → 98%</p>
              <p className="text-[11px] text-muted-foreground">Pre-flight improvement</p>
              <p className="text-[10px] text-success font-medium">Using AI suggestions</p>
            </div>
          </div>
        </Card>

        {/* Sync Confirmation */}
        <div className="text-center py-3 space-y-1">
          <p className="text-xs text-muted-foreground">
            All {activities.filter(a => a.ai).length} AI-powered actions and {activities.length} status updates synced automatically.
          </p>
          <p className="text-xs font-medium text-primary">
            Zero manual updates required by Karen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Status;
