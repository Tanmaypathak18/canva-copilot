const SubmissionInfo = () => {
  return (
    <div className="px-5 py-3 border-b border-border bg-surface-overlay/50">
      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
        <span>Submitted by <span className="font-medium text-foreground">Priya M.</span> (APAC Marketing)</span>
        <span>·</span>
        <span>2 hours ago</span>
        <span>·</span>
        <span>Template: <span className="font-medium text-foreground">Bold Summer Story v2</span></span>
      </div>
    </div>
  );
};

export default SubmissionInfo;
