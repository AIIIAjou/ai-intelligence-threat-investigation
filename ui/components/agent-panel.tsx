"use client";

import { Bot } from "lucide-react";
import type { Agent, AgentEvent, GuardrailCheck } from "@/lib/types";
import { AgentsList } from "./agents-list";
import { Guardrails } from "./guardrails";
import { ConversationContext } from "./conversation-context";
import { RunnerOutput } from "./runner-output";

interface AgentPanelProps {
  agents: Agent[];
  currentAgent: string;
  events: AgentEvent[];
  guardrails: GuardrailCheck[];
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

export function AgentPanel({
  agents,
  currentAgent,
  events,
  guardrails,
  context,
}: AgentPanelProps) {
  const activeAgent = agents.find((a) => a.name === currentAgent);
  const runnerEvents = events.filter((e) => e.type !== "message");

  return (
    <div className="w-3/5 h-full flex flex-col border-r border-border bg-card rounded-xl shadow-sm">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white h-12 px-4 flex items-center gap-3 shadow-md rounded-t-xl">
        <Bot className="h-5 w-5" />
        <h1 className="font-semibold text-sm sm:text-base lg:text-lg">Intelligence Operations</h1>
        <span className="ml-auto text-xs font-light tracking-wide opacity-90">
          OSINT&nbsp;Platform
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-background">
        <AgentsList agents={agents} currentAgent={currentAgent} />
        <Guardrails
          guardrails={guardrails}
          inputGuardrails={activeAgent?.input_guardrails ?? []}
        />
        <ConversationContext context={context} />
        <RunnerOutput runnerEvents={runnerEvents} />
      </div>
    </div>
  );
}