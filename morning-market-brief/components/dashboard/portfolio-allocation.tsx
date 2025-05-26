/**
 * Portfolio Allocation Component - Displays portfolio allocation metrics
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PortfolioData } from "@/lib/agents/api-agent";
import { ArrowDown, ArrowUp, PieChart } from "lucide-react";

interface PortfolioAllocationProps {
  data: PortfolioData;
}

export function PortfolioAllocation({ data }: PortfolioAllocationProps) {
  const changeDirection = data.change >= 0 ? 'increase' : 'decrease';
  const changeColor = data.change >= 0 ? 'text-green-500' : 'text-red-500';
  const changeIcon = data.change >= 0 ? (
    <ArrowUp className="h-4 w-4 text-green-500" />
  ) : (
    <ArrowDown className="h-4 w-4 text-red-500" />
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Portfolio Allocation</CardTitle>
          <CardDescription>Asia Tech exposure as % of AUM</CardDescription>
        </div>
        <PieChart className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold">{data.allocation}%</div>
          <div className={`flex items-center ${changeColor}`}>
            {changeIcon}
            <span className="ml-1">{Math.abs(data.change)}%</span>
          </div>
        </div>
        
        <Progress className="h-2" value={data.allocation} />
        
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <div>Previous: {data.previousAllocation}%</div>
          <div>{changeDirection} of {Math.abs(data.change)}%</div>
        </div>
      </CardContent>
    </Card>
  );
}
