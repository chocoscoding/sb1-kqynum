// Mock data for testing and development
export const mockStats = {
  totalRequests: 157893,
  activeUsers: 2341,
  activeKeys: 15,
  requestsPerDay: [
    { date: '2024-03-01', count: 5231 },
    { date: '2024-03-02', count: 4892 },
    { date: '2024-03-03', count: 6123 },
    { date: '2024-03-04', count: 5478 },
    { date: '2024-03-05', count: 7234 },
    { date: '2024-03-06', count: 6891 },
    { date: '2024-03-07', count: 5912 }
  ],
  topApplications: [
    { name: 'HealthTrack Pro', requests: 45231 },
    { name: 'MedSync', requests: 32145 },
    { name: 'VitalFlow', requests: 28967 },
    { name: 'CareConnect', requests: 21543 }
  ]
};

export const mockClientKeys = [
  {
    id: '1',
    key: 'mk_test_123456789',
    createdAt: '2024-02-15T10:30:00Z',
    lastUsed: '2024-03-07T15:45:00Z',
    requests: 45231,
    status: 'active'
  },
  {
    id: '2',
    key: 'mk_test_987654321',
    createdAt: '2024-01-20T08:15:00Z',
    lastUsed: '2024-03-07T14:20:00Z',
    requests: 32145,
    status: 'active'
  },
  {
    id: '3',
    key: 'mk_test_456789123',
    createdAt: '2024-03-01T12:00:00Z',
    lastUsed: '2024-03-07T16:10:00Z',
    requests: 5912,
    status: 'active'
  }
];

export const mockPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    rateLimit: 1000,
    features: [
      'Up to 1,000 requests/month',
      'Basic authentication',
      'Email support',
      'API documentation'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 149,
    rateLimit: 10000,
    features: [
      'Up to 10,000 requests/month',
      'Advanced authentication',
      'Priority support',
      'Custom domains',
      'Analytics dashboard'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    rateLimit: 100000,
    features: [
      'Unlimited requests',
      'Enterprise SSO',
      '24/7 support',
      'Custom integration',
      'Advanced analytics',
      'SLA guarantee'
    ]
  }
];