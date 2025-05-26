/**
 * API Agent - Responsible for fetching market data from external sources
 */

'use client';

import axios from 'axios';

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose?: number;
  volume?: number;
  marketCap?: number;
}

export interface EarningsSurprise {
  symbol: string;
  reportedEPS: number;
  estimatedEPS: number;
  surprise: number;
  surprisePercent: number;
}

export interface RegionalSentiment {
  region: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  details: string;
}

export interface PortfolioData {
  name: string;
  allocation: number;
  previousAllocation: number;
  change: number;
}

export class ApiAgent {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // For demo purposes - in real implementation, these would be environment variables
    this.apiKey = 'demo';
    this.baseUrl = 'https://www.alphavantage.co/query';
  }

  // Mock function for demo - would connect to actual API in production
  async fetchAsiaTechStocks(): Promise<MarketData[]> {
    console.log('Fetching Asia tech stocks data...');
    
    // Simulated data for demo purposes
    return [
      { symbol: 'TSMC', price: 142.76, change: 5.32, changePercent: 4.0, volume: 1500000, marketCap: 680000000000 },
      { symbol: 'Samsung', price: 78.23, change: -1.56, changePercent: -2.0, volume: 2100000, marketCap: 520000000000 },
      { symbol: 'Alibaba', price: 92.45, change: 0.75, changePercent: 0.8, volume: 3200000, marketCap: 240000000000 },
      { symbol: 'Tencent', price: 45.67, change: 1.12, changePercent: 2.5, volume: 1800000, marketCap: 380000000000 },
      { symbol: 'Baidu', price: 112.34, change: -0.45, changePercent: -0.4, volume: 900000, marketCap: 38000000000 },
    ];
  }

  async fetchEarningsSurprises(): Promise<EarningsSurprise[]> {
    console.log('Fetching earnings surprises...');
    
    // Simulated data for demo purposes
    return [
      { symbol: 'TSMC', reportedEPS: 1.35, estimatedEPS: 1.30, surprise: 0.05, surprisePercent: 4.0 },
      { symbol: 'Samsung', reportedEPS: 0.89, estimatedEPS: 0.91, surprise: -0.02, surprisePercent: -2.0 },
      { symbol: 'Alibaba', reportedEPS: 2.10, estimatedEPS: 1.95, surprise: 0.15, surprisePercent: 7.7 },
      { symbol: 'Tencent', reportedEPS: 0.75, estimatedEPS: 0.78, surprise: -0.03, surprisePercent: -3.8 },
    ];
  }

  async fetchRegionalSentiment(): Promise<RegionalSentiment> {
    console.log('Fetching regional sentiment data...');
    
    // Simulated data for demo purposes
    return {
      region: 'Asia Tech',
      sentiment: 'neutral',
      details: 'Neutral with a cautionary tilt due to rising yields. Semiconductor stocks showing strength, while consumer tech faces headwinds.',
    };
  }

  async fetchPortfolioAllocation(): Promise<PortfolioData> {
    console.log('Fetching portfolio allocation data...');
    
    // Simulated data for demo purposes
    return {
      name: 'Asia Tech',
      allocation: 22.0,
      previousAllocation: 18.0,
      change: 4.0
    };
  }
}
