/**
 * Market Overview Component - Displays the main market metrics
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketData } from "@/lib/agents/api-agent";
import { ArrowDown, ArrowUp, BarChart2 } from "lucide-react";

interface MarketOverviewProps {
  stocks: MarketData[];
}

export function MarketOverview({ stocks }: MarketOverviewProps) {
  // Calculate market metrics
  const averageChange = stocks.reduce((acc, stock) => acc + stock.changePercent, 0) / stocks.length;
  const gainers = stocks.filter(stock => stock.change > 0).length;
  const losers = stocks.filter(stock => stock.change < 0).length;
  
  // Format the average change with sign and 2 decimal places
  const formattedAvgChange = `${averageChange > 0 ? '+' : ''}${averageChange.toFixed(2)}%`;
  
  // Determine color for average change
  const changeColor = averageChange > 0 ? 'text-green-500' : averageChange < 0 ? 'text-red-500' : 'text-slate-500';

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Change</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            {averageChange > 0 ? (
              <ArrowUp className="mr-2 h-4 w-4 text-green-500" />
            ) : averageChange < 0 ? (
              <ArrowDown className="mr-2 h-4 w-4 text-red-500" />
            ) : null}
            <span className={changeColor}>{formattedAvgChange}</span>
          </div>
          <p className="text-xs text-muted-foreground">Asia Tech Sector</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gainers</CardTitle>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{gainers}</div>
          <p className="text-xs text-muted-foreground">{((gainers / stocks.length) * 100).toFixed(0)}% of tracked stocks</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Losers</CardTitle>
          <ArrowDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{losers}</div>
          <p className="text-xs text-muted-foreground">{((losers / stocks.length) * 100).toFixed(0)}% of tracked stocks</p>
        </CardContent>
      </Card>
    </div>
  );
}
