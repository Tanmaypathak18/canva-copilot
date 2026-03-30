import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Circle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const briefData = [
  { label: "Campaign", value: "Q2 Gen Z Summer Drop" },
  { label: "Channel", value: "Instagram Story" },
  { label: "Audience", value: "18–24, Gen Z, trend-conscious" },
  { label: "Tone", value: "Playful, urgent, casual" },
  { label: "Key message", value: "Summer collection launch, create urgency, highlight limited availability" },
  { label: "Deadline", value: "April 15, 2026" },
  { label: "Assigned to", value: "Priya M., APAC Marketing" },
  { label: "Reviewer", value: "James R., Brand Manager" },
];

const milestones = [
  { label: "Not Started", status: "completed" },
  { label: "In Progress", status: "active" },
  { label: "Pending Review", status: "upcoming" },
  { label: "Revisions", status: "upcoming" },
  { label: "Approved", status: "upcoming" },
] as const;

const activities = [
  { name: "Karen L.", initials: "KL", action: "created the campaign brief", time: "March 24, 9:00am", color: "bg-violet-500" },
  { name: "System", initials: "AI", action: "brief synced to Canva workspace", time: "March 24, 9:01am", color: "bg-muted-foreground" },
  { name: "Priya M.", initials: "PM", action: "started design in Canva", time: "March 25, 10:30am", color: "bg-pink-500" },
  { name: "AI Copilot", initials: "AI", action: "pre-flight scan: 78% ready, 2 items flagged", time: "March 25, 1:00pm", color: "bg-primary" },
];

const Brief = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-8 px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Q2 Gen Z Summer Drop</h1>
            <Badge className="bg-primary/15 text-primary border-primary/20 text-xs font-medium">In Progress</Badge>
          </div>
        </div>

        {/* Campaign Brief Card */}
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

        {/* Milestone Tracker */}
        <Card className="border border-border px-5 py-5">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-[11px] left-[11px] right-[11px] h-[2px] bg-border" />
            <div
              className="absolute top-[11px] left-[11px] h-[2px] bg-success"
              style={{ width: "calc(25% - 11px)" }}
            />
            {milestones.map(({ label, status }, i) => (
              <div key={label} className="flex flex-col items-center gap-2 relative z-10">
                {status === "completed" ? (
                  <div className="w-[22px] h-[22px] rounded-full bg-success flex items-center justify-center">
                    <Check className="w-3 h-3 text-success-foreground" />
                  </div>
                ) : status === "active" ? (
                  <div className="w-[22px] h-[22px] rounded-full bg-primary flex items-center justify-center">
                    <Circle className="w-2.5 h-2.5 text-primary-foreground fill-primary-foreground" />
                  </div>
                ) : (
                  <div className="w-[22px] h-[22px] rounded-full bg-secondary border-2 border-border" />
                )}
                <span className={`text-[11px] font-medium ${
                  status === "active" ? "text-primary" : status === "completed" ? "text-success" : "text-muted-foreground"
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="border border-border">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-sm font-semibold text-foreground">Activity</span>
          </div>
          <div className="px-5 py-3 space-y-4">
            {activities.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                  <span className="text-[10px] font-bold text-white">{item.initials}</span>
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

        {/* Action */}
        <Button onClick={() => navigate("/create")} className="w-full gap-2">
          <ExternalLink className="w-4 h-4" />
          View in Canva
        </Button>
      </div>
    </div>
  );
};

export default Brief;
