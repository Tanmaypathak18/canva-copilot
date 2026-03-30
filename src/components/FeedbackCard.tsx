import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const ENRICHMENT_TRIGGER = "tone feels off";
const ENRICHMENT_TEXT =
  "The campaign brief requests a casual, urgent tone targeting Gen Z (18\u201324). The current headline uses formal language. Suggested: use shorter, punchy phrasing with urgency signals. See AI-suggested alternatives above.";

interface FeedbackCardProps {
  onFeedbackChange?: (value: string) => void;
}

const FeedbackCard = ({ onFeedbackChange }: FeedbackCardProps) => {
  const [feedback, setFeedback] = useState("");

  const handleChange = (value: string) => {
    setFeedback(value);
    onFeedbackChange?.(value);
  };

  const showEnrichment = feedback.toLowerCase().includes(ENRICHMENT_TRIGGER);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Feedback</h3>
      <Textarea
        value={feedback}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type your feedback... (try 'tone feels off' to see AI enrichment)"
        className="text-xs min-h-[72px] resize-none border-border bg-surface focus-visible:ring-primary/30"
      />
      {showEnrichment && (
        <div className="mt-3 p-3 rounded-md bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            <p className="text-[10px] font-medium text-primary uppercase tracking-wider">AI-enriched preview</p>
          </div>
          <p className="text-xs text-foreground leading-relaxed">{ENRICHMENT_TEXT}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
