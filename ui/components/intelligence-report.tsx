"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle, CheckCircle, Info, Download } from "lucide-react";

interface IntelligenceReportProps {
  onClose?: () => void;
}

export function IntelligenceReport({ onClose }: IntelligenceReportProps) {
  return (
    <Card className="w-full bg-card border-border shadow-lg">
      <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Intelligence Investigation Report
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Report Header */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground">Report ID</p>
            <p className="text-sm font-mono text-foreground">INTEL-742891</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Classification</p>
            <Badge className="bg-yellow-600 hover:bg-yellow-700">CONFIDENTIAL</Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Threat Level</p>
            <Badge className="bg-orange-600 hover:bg-orange-700">MEDIUM</Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Generated</p>
            <p className="text-sm text-foreground">{new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Target Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-cyan-400" />
            Target Information
          </h3>
          <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Target Name:</span>
              <span className="text-sm font-medium text-foreground">Unknown Subject</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Target ID:</span>
              <span className="text-sm font-mono text-foreground">TARGET-3847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Investigation Type:</span>
              <span className="text-sm text-foreground">OSINT Profile Analysis</span>
            </div>
          </div>
        </div>

        {/* Intelligence Summary */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            Intelligence Summary
          </h3>
          <div className="space-y-3">
            <Card className="bg-secondary/30 border-border">
              <CardContent className="p-3">
                <h4 className="text-sm font-semibold text-foreground mb-2">SNS Search Results</h4>
                <p className="text-xs text-muted-foreground">
                  • 12 social media profiles identified across 4 platforms
                </p>
                <p className="text-xs text-muted-foreground">
                  • 347 posts analyzed for pattern recognition
                </p>
                <p className="text-xs text-muted-foreground">
                  • High activity detected on LinkedIn and Twitter/X
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-border">
              <CardContent className="p-3">
                <h4 className="text-sm font-semibold text-foreground mb-2">Web Search Results</h4>
                <p className="text-xs text-muted-foreground">
                  • 87 relevant web sources discovered
                </p>
                <p className="text-xs text-muted-foreground">
                  • Mentions found in tech blogs, news articles, and forums
                </p>
                <p className="text-xs text-muted-foreground">
                  • Relevance score: 0.84/1.00
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-border">
              <CardContent className="p-3">
                <h4 className="text-sm font-semibold text-foreground mb-2">Image Analysis</h4>
                <p className="text-xs text-muted-foreground">
                  • 3 images processed with metadata extraction
                </p>
                <p className="text-xs text-muted-foreground">
                  • Geolocation data recovered from 2 images
                </p>
                <p className="text-xs text-muted-foreground">
                  • 15 reverse search matches found
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Findings */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            Key Findings
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>Subject maintains active presence across multiple technology platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>Professional background indicates expertise in software development</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>No indicators of malicious activity detected in current investigation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>Geographic patterns suggest primary location in North America</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <button
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            onClick={() => alert("Download functionality would be implemented here")}
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
          {onClose && (
            <button
              className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
