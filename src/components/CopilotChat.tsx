import { useState } from "react";
import { Sparkles, Send, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "ai";
  text: string;
  timestamp: string;
}

const preloadedMessages: Message[] = [
  {
    role: "user",
    text: "What tone should I use for this campaign?",
    timestamp: "1:02 PM",
  },
  {
    role: "ai",
    text: "Based on your brief, use a playful, urgent, casual tone. Your audience is Gen Z (18-24) who respond to short, punchy language with urgency signals. Avoid formal or corporate phrasing. Examples from your team's past approved designs: \"Don't sleep on this\" and \"Gone by midnight.\"",
    timestamp: "1:02 PM",
  },
  {
    role: "user",
    text: "Are there approved images I should use instead of stock?",
    timestamp: "1:05 PM",
  },
  {
    role: "ai",
    text: "I found 4 approved product photos from your Q1 campaign shoot that match this brief's style. Team assets get approved 2x faster than stock photos. I've added them to Suggested Assets above. The top-performing image from similar campaigns had a 96% first-submission approval rate.",
    timestamp: "1:05 PM",
  },
];

const quickPrompts = [
  "Check my copy against the brief",
  "Suggest a better CTA",
  "What's missing from my design?",
];

const CopilotChat = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [messages, setMessages] = useState<Message[]>(preloadedMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input, timestamp: "1:10 PM" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        role: "ai",
        text: "Based on your brief and brand guidelines, I'd suggest making the CTA more action-oriented. Instead of \"Shop Now\", try \"Grab yours\" or \"Don't miss out\" to match the urgency your brief specifies. Your team's highest-performing CTAs for Gen Z used 2-3 word phrases.",
        timestamp: "1:10 PM",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="rounded-lg border border-primary/20 bg-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-primary/5 hover:bg-primary/8 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-xs font-semibold text-foreground">@Canva Copilot</span>
          <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary border-primary/15">
            Context-aware
          </Badge>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <>
          {/* Messages */}
          <div className="max-h-[240px] overflow-y-auto px-3 py-2 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/80 text-foreground"
                  }`}
                >
                  <p className="text-[11px] leading-relaxed">{msg.text}</p>
                  <p className={`text-[9px] mt-1 ${
                    msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-2.5 h-2.5 text-primary" />
                </div>
                <div className="bg-muted/80 rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="px-3 py-1.5 flex gap-1.5 flex-wrap">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-[10px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask @Canva about your design..."
              className="flex-1 text-[11px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center disabled:opacity-30 hover:bg-primary/90 transition-colors"
            >
              <Send className="w-3 h-3 text-primary-foreground" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CopilotChat;
