import { useState } from "react";
import { AlertTriangle, X, ExternalLink } from "lucide-react";

const BriefChangeAlert = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="mx-5 mt-3 rounded-lg border border-warning/30 bg-warning/5 px-4 py-3">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground">Brief updated by Karen L.</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            10 minutes ago: Deadline changed April 15 → April 12. Target audience narrowed to 18-22.
          </p>
          <button className="flex items-center gap-1 text-[11px] text-primary hover:underline mt-1.5">
            View changes <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default BriefChangeAlert;
