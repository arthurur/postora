// BRL marketing offers. Annual Pro and Ultimate equivalents are R$115 and R$190.
// Checkout configuration is a separate change.
export const plans = [
  {
    name: 'Standard',
    monthly: 80,
    annual: 720,
    channels: 5,
    team: false,
    images: 0,
    videos: 3,
    webhooks: 2,
  },
  {
    name: 'Team',
    monthly: 120,
    annual: 1080,
    channels: 10,
    team: true,
    images: 100,
    videos: 10,
    webhooks: 10,
  },
  {
    name: 'Pro',
    monthly: 150,
    annual: 1380,
    channels: 30,
    team: true,
    images: 300,
    videos: 30,
    webhooks: 30,
  },
  {
    name: 'Ultimate',
    monthly: 250,
    annual: 2280,
    channels: 100,
    team: true,
    images: 500,
    videos: 60,
    webhooks: 10000,
  },
] as const;
