/**
 * Orchestrator - Coordinates all agents and manages the workflow
 */

'use client';

import { ApiAgent, EarningsSurprise, MarketData, PortfolioData, RegionalSentiment } from './agents/api-agent';
import { BriefingSummary, LanguageAgent } from './agents/language-agent';
import { VoiceAgent } from './agents/voice-agent';

export interface OrchestrationResult {
  marketData: MarketData[];
  earningsSurprises: EarningsSurprise[];
  sentiment: RegionalSentiment;
  portfolioData: PortfolioData;
  briefing: BriefingSummary;
}

export class Orchestrator {
  private apiAgent: ApiAgent;
  private languageAgent: LanguageAgent;
  private voiceAgent: VoiceAgent;

  constructor() {
    this.apiAgent = new ApiAgent();
    this.languageAgent = new LanguageAgent();
    this.voiceAgent = new VoiceAgent();
  }

  async processRequest(query: string): Promise<OrchestrationResult> {
    console.log('Processing request:', query);

    try {
      // 1. Fetch market data
      const [marketData, earningsSurprises, sentiment, portfolioData] = await Promise.all([
        this.apiAgent.fetchAsiaTechStocks(),
        this.apiAgent.fetchEarningsSurprises(),
        this.apiAgent.fetchRegionalSentiment(),
        this.apiAgent.fetchPortfolioAllocation()
      ]);

      // 2. Generate language briefing
      const briefing = this.languageAgent.generateBriefing(
        portfolioData,
        earningsSurprises,
        sentiment,
        marketData
      );

      // 3. Return the comprehensive result
      return {
        marketData,
        earningsSurprises,
        sentiment,
        portfolioData,
        briefing
      };
    } catch (error) {
      console.error('Error in orchestrator:', error);
      throw error;
    }
  }

  async processVoiceInput(audioBlob: Blob): Promise<OrchestrationResult> {
    try {
      // 1. Convert speech to text
      const query = await this.voiceAgent.processVoiceInput(audioBlob);
      
      // 2. Process the text query
      const result = await this.processRequest(query);
      
      // 3. Generate voice response (in a real implementation)
      await this.voiceAgent.generateVoiceResponse(result.briefing.fullBriefing);
      
      return result;
    } catch (error) {
      console.error('Error processing voice input:', error);
      throw error;
    }
  }
}
