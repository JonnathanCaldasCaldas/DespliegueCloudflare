
export interface ComparisonItem {
  feature: string;
  traditional: string;
  cloudflare: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
