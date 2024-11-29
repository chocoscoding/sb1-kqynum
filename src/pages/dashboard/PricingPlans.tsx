import React from 'react';
import { Check } from 'lucide-react';
import { mockPlans } from '../../data/mockData';

export const PricingPlans: React.FC = () => {
  const handleSubscribe = async (planId: string) => {
    console.log('Subscribing to plan:', planId);
    // Subscription logic would go here
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                plan.id === 'professional'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};