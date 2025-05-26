/**
 * Market Sentiment Component - Displays sentiment analysis
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegionalSentiment } from "@/lib/agents/api-agent";
import { AlertCircle, CheckCircle, MehIcon } from "lucide-react";

interface MarketSentimentProps {
  sentiment: RegionalSentiment;
}

export function MarketSentiment({ sentiment }: MarketSentimentProps) {
  // Define sentiment display properties
  const sentimentProps = {
    positive: {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      label: 'Positive',
    },
    neutral: {
      icon: <MehIcon className="h-6 w-6 text-amber-500" />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      label: 'Neutral',
    },
    negative: {
      icon: <AlertCircle className="h-6 w-6 text-red-500" />,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      label: 'Negative',
    },
  };

  const currentSentiment = sentimentProps[sentiment.sentiment];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Market Sentiment</CardTitle>
        <CardDescription>{sentiment.region} Region Outlook</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center p-4 rounded-lg mb-4 ${currentSentiment.bgColor}`}>
          {currentSentiment.icon}
          <div className="ml-4">
            <h4 className={`font-medium ${currentSentiment.color}`}>{currentSentiment.label}</h4>
            <p className="text-sm text-muted-foreground mt-1">Current market sentiment</p>
          </div>
        </div>
        
        <div className="text-sm">
          <p>{sentiment.details}</p>
        </div>
      </CardContent>
    </Card>
  );
}
