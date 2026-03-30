import { Badge } from "@/components/ui/badge";

interface ReviewHeaderProps {
  status: "pending" | "approved" | "changes-requested";
}

const ReviewHeader = ({ status }: ReviewHeaderProps) => {
  const badgeConfig = {
    approved: { className: "bg-success text-success-foreground text-xs font-medium", label: "Approved" },
    "changes-requested": { className: "bg-warning/15 text-warning border-warning/20 text-xs font-medium", label: "Changes Requested" },
    pending: { className: "bg-warning/15 text-warning border-warning/20 text-xs font-medium", label: "Pending Review" },
  }[status];

  return (
    <header className="flex items-center justify-between px-6 py-2.5 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-foreground tracking-tight">Design Review</h1>
        <span className="text-xs text-muted-foreground">Instagram Story</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">James R.</span>
        <Badge
          variant={status === "approved" ? "default" : "secondary"}
          className={badgeConfig.className}
        >
          {badgeConfig.label}
        </Badge>
      </div>
    </header>
  );
};

export default ReviewHeader;
