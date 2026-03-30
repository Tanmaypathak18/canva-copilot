import { Badge } from "@/components/ui/badge";

const data = [
  { label: "Campaign", value: "Q2 Gen Z Summer Drop" },
  { label: "Channel", value: "Instagram Story" },
  { label: "Audience", value: "18-24, Gen Z" },
  { label: "Tone", value: "Playful, urgent, casual" },
  { label: "Deadline", value: "April 15, 2026" },
];

const ProjectContextCard = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Project Context</h3>
        <Badge variant="secondary" className="text-[10px] font-medium bg-primary/8 text-primary border-primary/15">
          Synced from Asana
        </Badge>
      </div>
      <div className="space-y-2.5">
        {data.map((item) => (
          <div key={item.label} className="flex items-start justify-between">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="text-xs font-medium text-foreground text-right max-w-[60%]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectContextCard;
