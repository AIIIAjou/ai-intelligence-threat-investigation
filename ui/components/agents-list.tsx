"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, Search, Globe, Image, Zap } from "lucide-react";
import { PanelSection } from "./panel-section";
import type { Agent } from "@/lib/types";

interface AgentsListProps {
  agents: Agent[];
  currentAgent: string;
}

const agentIcons: Record<string, React.ReactNode> = {
  "Management Agent": <Brain className="h-6 w-6" />,
  "Create Variations Agent": <Zap className="h-5 w-5" />,
  "SNS Search Agent": <Search className="h-5 w-5" />,
  "Web Search Agent": <Globe className="h-5 w-5" />,
  "Image Process Agent": <Image className="h-5 w-5" />,
};

export function AgentsList({ agents, currentAgent }: AgentsListProps) {
  const activeAgent = agents.find((a) => a.name === currentAgent);
  const managementAgent = agents.find((a) => a.name === "Management Agent");
  const subAgents = agents.filter((a) => a.name !== "Management Agent");

  return (
    <PanelSection
      title="Intelligence Agents"
      icon={<Bot className="h-4 w-4 text-cyan-400" />}
    >
      <div className="space-y-4">
        {/* Management Agent - Large Featured Card */}
        {managementAgent && (
          <Card
            className={`bg-gradient-to-br from-card via-card to-cyan-950/20 border-2 transition-all duration-300 ${
              managementAgent.name === currentAgent
                ? "border-cyan-500 shadow-xl shadow-cyan-500/30 ring-4 ring-cyan-500/20"
                : "border-cyan-700/50 hover:border-cyan-600/70"
            }`}
          >
            <CardHeader className="p-4 pb-2 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    managementAgent.name === currentAgent
                      ? "bg-cyan-500 text-white animate-pulse"
                      : "bg-cyan-900/50 text-cyan-400"
                  }`}>
                    {agentIcons[managementAgent.name]}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-card-foreground flex items-center gap-2">
                      {managementAgent.name}
                      {managementAgent.name === currentAgent && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-green-500 font-normal">ACTIVE</span>
                        </div>
                      )}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Central Intelligence Coordinator
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-cyan-950/50 border-cyan-500/30 text-cyan-400">
                  Primary
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {managementAgent.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="text-xs text-muted-foreground">Coordinates:</div>
                <div className="flex flex-wrap gap-1">
                  {managementAgent.handoffs.slice(0, 4).map((handoff) => (
                    <Badge key={handoff} variant="secondary" className="text-xs bg-secondary/50">
                      {handoff.replace(" Agent", "")}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sub Agents - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {subAgents.map((agent) => {
            const isActive = agent.name === currentAgent;
            const isAvailable = activeAgent?.handoffs.includes(agent.name);

            return (
              <Card
                key={agent.name}
                className={`group relative overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-card to-cyan-950/30 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20"
                    : isAvailable
                    ? "bg-card border border-border hover:border-cyan-600/50 hover:shadow-md"
                    : "bg-card/50 border border-border/50 opacity-40 grayscale cursor-not-allowed"
                }`}
              >
                {/* Glow effect for active agent */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse" />
                )}

                <CardHeader className="p-3 pb-2 relative">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${
                      isActive
                        ? "bg-cyan-500 text-white"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {agentIcons[agent.name]}
                    </div>
                    <CardTitle className="text-sm font-semibold text-card-foreground">
                      {agent.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-1 relative">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {agent.description}
                  </p>
                  {isActive && (
                    <div className="mt-2 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-500 font-medium">EXECUTING</span>
                    </div>
                  )}
                  {!isActive && isAvailable && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-secondary/30">
                        Ready
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PanelSection>
  );
}