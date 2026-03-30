import { useState } from "react";
import ReviewHeader from "@/components/ReviewHeader";
import DesignPreview from "@/components/DesignPreview";
import SubmissionInfo from "@/components/SubmissionInfo";
import ProjectContextCard from "@/components/ProjectContextCard";
import ComplianceScanCard from "@/components/ComplianceScanCard";
import FeedbackCard from "@/components/FeedbackCard";
import ActionBar from "@/components/ActionBar";
import { toast } from "sonner";

const Index = () => {
  const [status, setStatus] = useState<"pending" | "approved" | "changes-requested">("pending");

  const handleApprove = () => {
    setStatus("approved");
    toast.success("Design approved. Asana task updated to Approved. Priya M. notified via Canva. Slack notification sent to #q2-summer-campaign.");
  };

  const handleRequestChanges = () => {
    setStatus("changes-requested");
    toast.info("Revision request sent to Priya M. with 2 flagged items and your feedback. Asana task updated to Revisions Requested. Estimated resubmission: tomorrow based on Priya's typical response time.");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ReviewHeader status={status} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left column - 60% */}
        <div className="w-[60%] border-r border-border">
          <DesignPreview />
        </div>

        {/* Right column - 40% */}
        <div className="w-[40%] flex flex-col">
          <SubmissionInfo />
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <ProjectContextCard />
            <ComplianceScanCard />
            <FeedbackCard />
          </div>
          <ActionBar approved={status !== "pending"} onApprove={handleApprove} onRequestChanges={handleRequestChanges} />
        </div>
      </div>
    </div>
  );
};

export default Index;
