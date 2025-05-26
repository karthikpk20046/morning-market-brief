/**
 * Briefing Card Component - Displays the AI-generated market briefing
 */

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefingSummary } from "@/lib/agents/language-agent";
import { Headphones, RefreshCw } from "lucide-react";
import { useState } from "react";

interface BriefingCardProps {
  briefing: BriefingSummary;
  onRefresh: () => void;
  isLoading: boolean;
}

export function BriefingCard({ briefing, onRefresh, isLoading }: BriefingCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // In a real implementation, this would play the audio
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">Morning Market Brief</CardTitle>
          <CardDescription>AI-generated market insights for today</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePlayAudio}
            disabled={isPlaying}
          >
            <Headphones className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-lg font-medium">{briefing.fullBriefing}</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border p-3">
              <h4 className="text-sm font-medium mb-1">Portfolio Allocation</h4>
              <p className="text-sm text-muted-foreground">{briefing.allocationSummary}</p>
            </div>
            
            <div className="rounded-md border p-3">
              <h4 className="text-sm font-medium mb-1">Earnings Highlights</h4>
              <p className="text-sm text-muted-foreground">{briefing.earningsSummary}</p>
            </div>
            
            <div className="rounded-md border p-3">
              <h4 className="text-sm font-medium mb-1">Market Sentiment</h4>
              <p className="text-sm text-muted-foreground">{briefing.sentimentSummary}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
