/**
 * Earnings Surprises Component - Displays earnings data
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EarningsSurprise } from "@/lib/agents/api-agent";
import { ArrowDown, ArrowUp, BarChart } from "lucide-react";

interface EarningsSurprisesProps {
  data: EarningsSurprise[];
}

export function EarningsSurprises({ data }: EarningsSurprisesProps) {
  // Sort by absolute surprise percentage (highest first)
  const sortedData = [...data].sort((a, b) => Math.abs(b.surprisePercent) - Math.abs(a.surprisePercent));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Earnings Surprises</CardTitle>
        <CardDescription>Latest earnings reports vs. estimates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.map((item) => (
            <div key={item.symbol} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">{item.symbol}</p>
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">EPS: </span>
                  <span className="ml-1 font-medium">${item.reportedEPS.toFixed(2)}</span>
                  <span className="text-muted-foreground ml-2">Est: </span>
                  <span className="ml-1">${item.estimatedEPS.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {item.surprisePercent > 0 ? (
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    <span>+{item.surprisePercent.toFixed(1)}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    <span>{item.surprisePercent.toFixed(1)}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
