"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, X } from "lucide-react";

interface FakeChatLoaderProps {
  onLoadScenario: (scenarioId: string) => void;
  onClose: () => void;
}

const scenarios = [
  {
    id: "osint-investigation-1",
    name: "Basic OSINT Investigation",
    description: "Investigate user 'CyberPhantom2024' for potential threats",
    tags: ["Person", "Social Media", "Threat Analysis"],
    estimatedSteps: 8,
  },
  {
    id: "domain-investigation",
    name: "Domain Threat Analysis",
    description: "Analyze suspicious-tech-deals.com for phishing activity",
    tags: ["Domain", "Phishing", "Web Analysis"],
    estimatedSteps: 3,
  },
  {
    id: "simple-query",
    name: "Quick Information Gathering",
    description: "Learn about OSINT tools for social media investigation",
    tags: ["Tools", "General Info"],
    estimatedSteps: 2,
  },
];

export function FakeChatLoader({ onLoadScenario, onClose }: FakeChatLoaderProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card border-border shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Load Demo Scenario</CardTitle>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Select a pre-configured OSINT investigation scenario to demonstrate the platform's capabilities.
          </p>

          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedScenario === scenario.id
                    ? "border-2 border-cyan-500 bg-cyan-950/20 shadow-md"
                    : "border border-border hover:border-cyan-600/50 hover:bg-secondary/30"
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {scenario.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {scenario.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {scenario.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-secondary"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs">
                          {scenario.estimatedSteps} messages
                        </Badge>
                      </div>
                    </div>
                    {selectedScenario === scenario.id && (
                      <div className="ml-4">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedScenario && onLoadScenario(selectedScenario)}
              disabled={!selectedScenario}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-muted disabled:text-muted-foreground text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="h-4 w-4" />
              Load Scenario
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
