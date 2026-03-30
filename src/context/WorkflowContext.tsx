import { createContext, useContext, useState, ReactNode } from "react";

export type WorkflowPhase = "not-started" | "in-progress" | "submitted" | "changes-requested" | "approved";

export interface ActivityEntry {
  name: string;
  initials: string;
  action: string;
  time: string;
  color: string;
  ai: boolean;
}

interface WorkflowState {
  phase: WorkflowPhase;
  headline: string;
  toneFixed: boolean;
  toneScore: number;
  preflightScore: number;
  logoFixed: boolean;
  reviewStatus: "pending" | "approved" | "changes-requested";
  activities: ActivityEntry[];
  feedbackText: string;

  setPhase: (phase: WorkflowPhase) => void;
  fixTone: (newHeadline: string) => void;
  fixLogo: () => void;
  submitForReview: () => void;
  approveDesign: () => void;
  requestChanges: (feedback: string) => void;
  addActivity: (entry: ActivityEntry) => void;
}

const baseActivities: ActivityEntry[] = [
  { name: "Karen L.", initials: "KL", action: "created campaign brief", time: "March 24, 9:00am", color: "bg-violet-500", ai: false },
  { name: "System", initials: "SY", action: "brief synced to Canva workspace", time: "March 24, 9:01am", color: "bg-muted-foreground", ai: true },
  { name: "Priya M.", initials: "PM", action: "started design", time: "March 25, 10:30am", color: "bg-pink-500", ai: false },
  { name: "AI Copilot", initials: "AI", action: "pre-flight scan: 78% ready, 2 items flagged", time: "March 25, 1:00pm", color: "bg-primary", ai: true },
];

const WorkflowContext = createContext<WorkflowState | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [phase, setPhase] = useState<WorkflowPhase>("in-progress");
  const [headline, setHeadline] = useState("Discover Our Latest Summer Collection");
  const [toneFixed, setToneFixed] = useState(false);
  const [toneScore, setToneScore] = useState(45);
  const [logoFixed, setLogoFixed] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<"pending" | "approved" | "changes-requested">("pending");
  const [activities, setActivities] = useState<ActivityEntry[]>(baseActivities);
  const [feedbackText, setFeedbackText] = useState("");

  const preflightScore = (toneFixed ? 4 : 0) + (logoFixed ? 4 : 0) + 78;

  const addActivity = (entry: ActivityEntry) => {
    setActivities((prev) => [...prev, entry]);
  };

  const fixTone = (newHeadline: string) => {
    setHeadline(newHeadline);
    setToneFixed(true);
    setToneScore(92);
    addActivity({
      name: "Priya M.", initials: "PM",
      action: `applied AI copy suggestion: "${newHeadline}" (tone match: 92%)`,
      time: "March 25, 1:15pm", color: "bg-pink-500", ai: false,
    });
  };

  const fixLogo = () => {
    setLogoFixed(true);
    addActivity({
      name: "James R.", initials: "JR",
      action: "applied AI fix for logo spacing (+4% compliance)",
      time: "March 26, 9:30am", color: "bg-blue-500", ai: false,
    });
  };

  const submitForReview = () => {
    setPhase("submitted");
    setReviewStatus("pending");
    addActivity({
      name: "Priya M.", initials: "PM",
      action: `submitted for review (pre-flight: ${preflightScore}%)`,
      time: "March 25, 2:15pm", color: "bg-pink-500", ai: false,
    });
    addActivity({
      name: "AI Copilot", initials: "AI",
      action: `compliance scan complete: ${[!toneFixed && "tone", !logoFixed && "logo"].filter(Boolean).length || 0} items flagged for reviewer`,
      time: "March 25, 2:16pm", color: "bg-primary", ai: true,
    });
  };

  const approveDesign = () => {
    setPhase("approved");
    setReviewStatus("approved");
    addActivity({
      name: "James R.", initials: "JR",
      action: "approved design",
      time: "March 26, 9:45am", color: "bg-blue-500", ai: false,
    });
    addActivity({
      name: "System", initials: "SY",
      action: "Asana task auto-updated to Approved",
      time: "March 26, 9:45am", color: "bg-muted-foreground", ai: true,
    });
    addActivity({
      name: "System", initials: "SY",
      action: "Slack notification sent to #q2-summer-campaign",
      time: "March 26, 9:45am", color: "bg-muted-foreground", ai: true,
    });
  };

  const requestChanges = (feedback: string) => {
    setPhase("changes-requested");
    setReviewStatus("changes-requested");
    setFeedbackText(feedback);
    addActivity({
      name: "James R.", initials: "JR",
      action: `requested changes: "${feedback.slice(0, 50)}${feedback.length > 50 ? "..." : ""}"`,
      time: "March 26, 9:30am", color: "bg-blue-500", ai: false,
    });
    addActivity({
      name: "System", initials: "SY",
      action: "Asana task updated to Revisions Requested",
      time: "March 26, 9:30am", color: "bg-muted-foreground", ai: true,
    });
  };

  return (
    <WorkflowContext.Provider value={{
      phase, headline, toneFixed, toneScore, preflightScore, logoFixed,
      reviewStatus, activities, feedbackText,
      setPhase, fixTone, fixLogo, submitForReview, approveDesign, requestChanges, addActivity,
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) throw new Error("useWorkflow must be used within WorkflowProvider");
  return context;
};
