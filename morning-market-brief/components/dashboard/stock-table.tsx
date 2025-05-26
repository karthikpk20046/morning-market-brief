/**
 * Stock Table Component - Displays stock price data in a table
 */

'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MarketData } from "@/lib/agents/api-agent";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StockTableProps {
  stocks: MarketData[];
}

export function StockTable({ stocks }: StockTableProps) {
  // Sort stocks by market cap (largest first)
  const sortedStocks = [...stocks].sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStocks.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {stock.change > 0 ? (
                    <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  ) : stock.change < 0 ? (
                    <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  ) : null}
                  <span
                    className={stock.change > 0 ? 'text-green-500' : stock.change < 0 ? 'text-red-500' : ''}
                  >
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(1)}%)
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {stock.volume ? new Intl.NumberFormat().format(stock.volume) : 'N/A'}
              </TableCell>
              <TableCell className="text-right">
                {stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(1)}B` : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
