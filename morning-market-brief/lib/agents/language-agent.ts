/**
 * Language Agent - Responsible for generating natural language narratives
 */

'use client';

import { EarningsSurprise, MarketData, PortfolioData, RegionalSentiment } from './api-agent';

export interface BriefingSummary {
  allocationSummary: string;
  earningsSummary: string;
  sentimentSummary: string;
  fullBriefing: string;
}

export class LanguageAgent {
  generateBriefing(
    portfolioData: PortfolioData,
    earningsSurprises: EarningsSurprise[],
    sentiment: RegionalSentiment,
    stockData: MarketData[]
  ): BriefingSummary {
    console.log('Generating market briefing...');

    // Generate allocation summary
    const allocationSummary = this.generateAllocationSummary(portfolioData);
    
    // Generate earnings summary
    const earningsSummary = this.generateEarningsSummary(earningsSurprises);
    
    // Generate sentiment summary
    const sentimentSummary = this.generateSentimentSummary(sentiment);
    
    // Combine all sections into a full briefing
    const fullBriefing = `${allocationSummary} ${earningsSummary} ${sentimentSummary}`;
    
    return {
      allocationSummary,
      earningsSummary,
      sentimentSummary,
      fullBriefing
    };
  }

  private generateAllocationSummary(portfolioData: PortfolioData): string {
    const direction = portfolioData.change > 0 ? 'up' : 'down';
    const changeAbs = Math.abs(portfolioData.change);
    
    return `Today, your ${portfolioData.name} allocation is ${portfolioData.allocation}% of AUM, ${direction} from ${portfolioData.previousAllocation}% yesterday.`;
  }

  private generateEarningsSummary(earningsSurprises: EarningsSurprise[]): string {
    const significantSurprises = earningsSurprises
      .filter(surprise => Math.abs(surprise.surprisePercent) >= 2.0)
      .sort((a, b) => Math.abs(b.surprisePercent) - Math.abs(a.surprisePercent))
      .slice(0, 2);
    
    if (significantSurprises.length === 0) return 'No significant earnings surprises to report.';
    
    const surpriseTexts = significantSurprises.map(surprise => {
      const direction = surprise.surprise > 0 ? 'beat' : 'missed';
      return `${surprise.symbol} ${direction} estimates by ${Math.abs(surprise.surprisePercent).toFixed(1)}%`;
    });
    
    return surpriseTexts.join(', ') + '.';
  }

  private generateSentimentSummary(sentiment: RegionalSentiment): string {
    return `Regional sentiment is ${sentiment.sentiment} with ${sentiment.details}`;
  }
}
