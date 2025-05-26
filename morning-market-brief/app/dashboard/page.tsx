/**
 * Dashboard Page - Main interface for the financial market intelligence system
 */

'use client';

import { BriefingCard } from "@/components/dashboard/briefing-card";
import { EarningsSurprises } from "@/components/dashboard/earnings-surprises";
import { MarketOverview } from "@/components/dashboard/market-overview";
import { MarketSentiment } from "@/components/dashboard/market-sentiment";
import { PortfolioAllocation } from "@/components/dashboard/portfolio-allocation";
import { StockTable } from "@/components/dashboard/stock-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Orchestrator, OrchestrationResult } from "@/lib/orchestrator";
import { AudioLines, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { VoiceInput } from "@/components/voice-input";

export default function DashboardPage() {
  const [result, setResult] = useState<OrchestrationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const { toast } = useToast();
  const orchestrator = new Orchestrator();

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await orchestrator.processRequest(
        "What's our risk exposure in Asia tech stocks today, and highlight any earnings surprises?"
      );
      setResult(data);
      console.log('Received orchestration result:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch market data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = async (audioBlob: Blob) => {
    setLoading(true);
    try {
      const data = await orchestrator.processVoiceInput(audioBlob);
      setResult(data);
      toast({
        title: "Voice processed",
        description: "Your voice query has been processed successfully.",
      });
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast({
        title: "Error",
        description: "Failed to process voice input. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleInputMode = () => {
    setInputMode(prevMode => prevMode === 'text' ? 'voice' : 'text');
  };

  // Using useEffect to handle date display client-side only
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Market Intelligence</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{currentDate}</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={toggleInputMode}
        >
          <AudioLines className="h-4 w-4 mr-2" />
          {inputMode === 'text' ? 'Enable Voice Input' : 'Disable Voice Input'}
        </Button>
      </div>

      {inputMode === 'voice' && (
        <VoiceInput onVoiceInput={handleVoiceInput} isLoading={loading} />
      )}

      {loading && !result ? (
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[120px] rounded-xl" />
            <Skeleton className="h-[120px] rounded-xl" />
            <Skeleton className="h-[120px] rounded-xl" />
          </div>
        </div>
      ) : result ? (
        <div className="space-y-6">
          <BriefingCard 
            briefing={result.briefing} 
            onRefresh={fetchData} 
            isLoading={loading} 
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <PortfolioAllocation data={result.portfolioData} />
            <MarketSentiment sentiment={result.sentiment} />
          </div>
          
          <Separator />
          
          <h2 className="text-2xl font-bold tracking-tight">Market Metrics</h2>
          <MarketOverview stocks={result.marketData} />
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-3">Stock Performance</h3>
              <StockTable stocks={result.marketData} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Earnings Reports</h3>
              <EarningsSurprises data={result.earningsSurprises} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <h3 className="text-xl font-medium">Failed to load market data</h3>
          <p className="text-muted-foreground mb-4">Please try refreshing the page</p>
          <Button onClick={fetchData}>Refresh Data</Button>
        </div>
      )}
    </div>
  );
}
