"use client";

import { PanelSection } from "./panel-section";
import { Card, CardContent } from "@/components/ui/card";
import { BookText } from "lucide-react";

interface ConversationContextProps {
  context: {
    target_name?: string;
    target_id?: string;
    investigation_type?: string;
    threat_level?: string;
    classification?: string;
    report_id?: string;
    collected_data?: Record<string, any>;
  };
}

export function ConversationContext({ context }: ConversationContextProps) {
  // Filter out collected_data from display as it's complex
  const displayContext = Object.entries(context).filter(([key]) => key !== 'collected_data');

  return (
    <PanelSection
      title="Investigation Context"
      icon={<BookText className="h-4 w-4 text-cyan-400" />}
    >
      <Card className="bg-gradient-to-br from-card to-secondary border-border shadow-sm">
        <CardContent className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {displayContext.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-2 bg-background p-2 rounded-md border border-border shadow-sm transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <div className="text-xs">
                  <span className="text-muted-foreground font-light">{key}:</span>{" "}
                  <span
                    className={
                      value
                        ? "text-foreground font-medium"
                        : "text-muted-foreground/50 italic"
                    }
                  >
                    {value || "null"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PanelSection>
  );
}