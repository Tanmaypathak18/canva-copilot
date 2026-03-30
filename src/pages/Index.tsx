import { useState } from "react";
import ReviewHeader from "@/components/ReviewHeader";
import DesignPreview from "@/components/DesignPreview";
import SubmissionInfo from "@/components/SubmissionInfo";
import ProjectContextCard from "@/components/ProjectContextCard";
import ComplianceScanCard from "@/components/ComplianceScanCard";
import FeedbackCard from "@/components/FeedbackCard";
import ActionBar from "@/components/ActionBar";
import { toast } from "sonner";
import { useWorkflow } from "@/context/WorkflowContext";

const Index = () => {
  const workflow = useWorkflow();
  const [feedbackValue, setFeedbackValue] = useState("");

  const handleApprove = () => {
    workflow.approveDesign();
    toast.success("Design approved. Asana task updated to Approved. Priya M. notified via Canva. Slack notification sent to #q2-summer-campaign. Brief and Status pages updated.");
  };

  const handleRequestChanges = () => {
    workflow.requestChanges(feedbackValue || "Tone and logo spacing need adjustment");
    toast.info("Revision request sent to Priya M. with flagged items and your feedback. Asana task updated to Revisions Requested. Brief and Status pages updated.");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ReviewHeader status={workflow.reviewStatus} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[60%] border-r border-border">
          <DesignPreview />
        </div>
        <div className="w-[40%] flex flex-col">
          <SubmissionInfo />
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <ProjectContextCard />
            <ComplianceScanCard onLogoFix={workflow.fixLogo} logoFixed={workflow.logoFixed} toneFixed={workflow.toneFixed} />
            <FeedbackCard onFeedbackChange={setFeedbackValue} />
          </div>
          <ActionBar
            approved={workflow.reviewStatus !== "pending"}
            onApprove={handleApprove}
            onRequestChanges={handleRequestChanges}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
