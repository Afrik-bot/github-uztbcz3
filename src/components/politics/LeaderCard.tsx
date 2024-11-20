import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface LeaderCardProps {
  leader: {
    name: string;
    country: string;
    approvalRating: number;
    position: number;
    previousPosition: number;
    keyAchievements: string[];
    recentPolicies: string;
  };
  position: number;
}

export default function LeaderCard({ leader, position }: LeaderCardProps) {
  const positionChange = leader.previousPosition - position;
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-800/80 transition-colors">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
          #{position}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-medium text-white">{leader.name}</h3>
              <p className="text-sm text-purple-400">{leader.country}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-white">
                {leader.approvalRating}%
              </div>
              {positionChange !== 0 && (
                <div className={`flex items-center ${
                  positionChange > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {positionChange > 0 ? (
                    <ArrowUpIcon className="w-5 h-5" />
                  ) : (
                    <ArrowDownIcon className="w-5 h-5" />
                  )}
                  <span className="text-sm">{Math.abs(positionChange)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">Key Achievements:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {leader.keyAchievements.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">Recent Policy Impact:</h4>
              <p className="text-sm text-gray-400">{leader.recentPolicies}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}