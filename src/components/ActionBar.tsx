import { Button } from "@/components/ui/button";

interface ActionBarProps {
  approved: boolean;
  onApprove: () => void;
  onRequestChanges: () => void;
}

const ActionBar = ({ approved, onApprove, onRequestChanges }: ActionBarProps) => {
  return (
    <div className="flex items-center gap-2 px-5 py-3 border-t border-border bg-surface">
      <Button
        onClick={onApprove}
        disabled={approved}
        className="flex-1 h-9 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {approved ? "Approved ✓" : "Approve"}
      </Button>
      <Button
        variant="outline"
        disabled={approved}
        onClick={onRequestChanges}
        className="flex-1 h-9 text-xs font-medium border-border text-foreground hover:bg-accent"
      >
        Request Changes
      </Button>
    </div>
  );
};

export default ActionBar;
