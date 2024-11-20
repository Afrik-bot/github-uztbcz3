import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface TrendingPoliciesProps {
  leaders: any[];
}

export default function TrendingPolicies({ leaders = [] }: TrendingPoliciesProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const policies = leaders?.flatMap(leader => 
    leader.keyAchievements.map(achievement => ({
      id: `${leader.name}-${achievement}`,
      leader: leader.name,
      country: leader.country,
      policy: achievement
    }))
  ) || [];

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Trending Policies</h2>
      <div className="space-y-4">
        {policies.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer"
            onClick={() => setSelectedPolicy(selectedPolicy === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg group-hover:bg-gray-800/80 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-white mb-1">{item.policy}</p>
                <p className="text-sm text-gray-400">
                  {item.leader} • {item.country}
                </p>
              </div>
              <ChevronRightIcon className={`w-5 h-5 text-gray-400 transition-transform ${
                selectedPolicy === item.id ? 'rotate-90' : ''
              }`} />
            </div>
            
            {selectedPolicy === item.id && (
              <div className="mt-2 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-300">
                  Detailed analysis and impact metrics for this policy will be displayed here.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}