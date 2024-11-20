import { useState, useEffect } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { generateLeaderRankings } from '../../services/openai';
import LeaderCard from './LeaderCard';
import TrendingPolicies from './TrendingPolicies';

export default function LeaderDashboard() {
  const [rankings, setRankings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await generateLeaderRankings();
      setRankings(data);
    } catch (error) {
      setError('Failed to load rankings');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={loadRankings}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Rankings */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Weekly Rankings</h2>
          <div className="space-y-4">
            {rankings?.rankings.map((leader: any, index: number) => (
              <LeaderCard
                key={leader.name}
                leader={leader}
                position={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Approval Trends */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Approval Rating Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={rankings?.rankings}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="approvalRating" 
                  stroke="#A855F7" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Key Metrics</h2>
          <div className="space-y-4">
            {rankings?.rankings.slice(0, 3).map((leader: any) => (
              <div key={leader.name} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-white">{leader.name}</p>
                  <p className="text-sm text-gray-400">{leader.country}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">
                    {leader.approvalRating}%
                  </span>
                  {leader.position < leader.previousPosition ? (
                    <ArrowUpIcon className="w-4 h-4 text-green-500" />
                  ) : leader.position > leader.previousPosition ? (
                    <ArrowDownIcon className="w-4 h-4 text-red-500" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Policies */}
        <TrendingPolicies leaders={rankings?.rankings} />
      </div>
    </div>
  );
}