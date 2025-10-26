"use client";

import { useEffect, useState } from "react";
import { AgentPanel } from "@/components/agent-panel";
import { Chat } from "@/components/chat";
import { FakeChatLoader } from "@/components/fake-chat-loader";
import type { Agent, AgentEvent, GuardrailCheck, Message } from "@/lib/types";
import { callChatAPI } from "@/lib/api";
import { FileText } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<string>("");
  const [guardrails, setGuardrails] = useState<GuardrailCheck[]>([]);
  const [context, setContext] = useState<Record<string, any>>({});
  const [conversationId, setConversationId] = useState<string | null>(null);
  // Loading state while awaiting assistant response
  const [isLoading, setIsLoading] = useState(false);
  // Fake chat loader state
  const [showFakeChatLoader, setShowFakeChatLoader] = useState(false);

  // Boot the conversation
  useEffect(() => {
    (async () => {
      const data = await callChatAPI("", conversationId ?? "");
      setConversationId(data.conversation_id);
      setCurrentAgent(data.current_agent);
      setContext(data.context);
      const initialEvents = (data.events || []).map((e: any) => ({
        ...e,
        timestamp: e.timestamp ?? Date.now(),
      }));
      setEvents(initialEvents);
      setAgents(data.agents || []);
      setGuardrails(data.guardrails || []);
      if (Array.isArray(data.messages)) {
        setMessages(
          data.messages.map((m: any) => ({
            id: Date.now().toString() + Math.random().toString(),
            content: m.content,
            role: "assistant",
            agent: m.agent,
            timestamp: new Date(),
          }))
        );
      }
    })();
  }, []);

  // Send a user message
  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const data = await callChatAPI(content, conversationId ?? "");

    if (!conversationId) setConversationId(data.conversation_id);
    setCurrentAgent(data.current_agent);
    setContext(data.context);
    if (data.events) {
      const stamped = data.events.map((e: any) => ({
        ...e,
        timestamp: e.timestamp ?? Date.now(),
      }));
      setEvents((prev) => [...prev, ...stamped]);
    }
    if (data.agents) setAgents(data.agents);
    // Update guardrails state
    if (data.guardrails) setGuardrails(data.guardrails);

    if (data.messages) {
      const responses: Message[] = data.messages.map((m: any) => ({
        id: Date.now().toString() + Math.random().toString(),
        content: m.content,
        role: "assistant",
        agent: m.agent,
        timestamp: new Date(),
      }));
      setMessages((prev) => [...prev, ...responses]);
    }

    setIsLoading(false);
  };

  // Load fake chat scenario
  const handleLoadScenario = async (scenarioId: string) => {
    try {
      const response = await fetch("/fake-chat-data.json");
      const data = await response.json();
      const scenario = data.scenarios.find((s: any) => s.id === scenarioId);

      if (scenario) {
        // Clear existing state
        setMessages([]);
        setEvents([]);

        // Load scenario messages
        const scenarioMessages: Message[] = scenario.messages.map((m: any, idx: number) => ({
          id: `fake-${idx}`,
          content: m.content,
          role: m.role,
          timestamp: new Date(),
        }));

        setMessages(scenarioMessages);

        // Update context if available
        if (scenario.context) {
          setContext(scenario.context);
        }

        // Simulate agent changes
        setCurrentAgent("Management Agent");

        setShowFakeChatLoader(false);
      }
    } catch (error) {
      console.error("Failed to load fake scenario:", error);
    }
  };

  return (
    <>
      <main className="flex h-screen gap-2 bg-background p-2 relative">
        {/* Demo Scenario Button */}
        <button
          onClick={() => setShowFakeChatLoader(true)}
          className="absolute top-4 right-4 z-10 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg shadow-lg flex items-center gap-2 transition-all duration-200 hover:shadow-xl"
          title="Load Demo Scenario"
        >
          <FileText className="h-4 w-4" />
          <span className="font-medium">Demo Scenarios</span>
        </button>

        <AgentPanel
          agents={agents}
          currentAgent={currentAgent}
          events={events}
          guardrails={guardrails}
          context={context}
        />
        <Chat
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>

      {/* Fake Chat Loader Modal */}
      {showFakeChatLoader && (
        <FakeChatLoader
          onLoadScenario={handleLoadScenario}
          onClose={() => setShowFakeChatLoader(false)}
        />
      )}
    </>
  );
}
