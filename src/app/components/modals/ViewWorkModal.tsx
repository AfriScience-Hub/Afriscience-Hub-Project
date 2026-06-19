'use client';

import { X, Eye, TrendingUp, Calendar, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ViewWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestant: {
    id: string;
    name: string;
    country: string;
    image: string;
    competition: string;
    category: string;
    workTitle?: string;
    workSummary?: string;
    workDescription?: string;
    workMedia?: string[];
    votes: number;
    views?: number;
    livePosition: number;
    voteHistory?: Array<{ date: string; votes: number }>;
  };
  liveVotes: number;
}

export function ViewWorkModal({ isOpen, onClose, contestant, liveVotes }: ViewWorkModalProps) {
  if (!isOpen) return null;

  // Format vote history data for chart
  const chartData = contestant.voteHistory?.map((item, index) => ({
    name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    votes: item.votes,
    position: contestant.livePosition, // Simplified - in real app would track historical positions
  })) || [];

  // Add current data point
  if (chartData.length > 0 && liveVotes !== chartData[chartData.length - 1].votes) {
    chartData.push({
      name: 'Now',
      votes: liveVotes,
      position: contestant.livePosition,
    });
  }

  const workTitle = contestant.workTitle || `${contestant.name}'s Work`;
  const workSummary = contestant.workSummary || 'Competition entry for ' + contestant.competition;
  const workDescription = contestant.workDescription || 'Detailed description of the work will be displayed here.';
  const workMedia = contestant.workMedia || [contestant.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-gray-light bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 backdrop-blur">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{workTitle}</h2>
              <p className="text-sm text-slate-200">by {contestant.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Media Gallery */}
          <div className="p-6 border-b border-neutral-gray-light bg-neutral-bg-light">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workMedia.map((media, index) => (
                <div key={index} className="relative aspect-video rounded-xl overflow-hidden group">
                  <img
                    src={media}
                    alt={`${workTitle} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="flex items-center justify-center h-12 w-12 rounded-full bg-white/90 text-brand-navy-900 hover:bg-white transition-colors">
                      {media.includes('video') ? (
                        <Play className="h-6 w-6" />
                      ) : (
                        <Eye className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Details */}
          <div className="p-6 border-b border-neutral-gray-light">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={contestant.image}
                alt={contestant.name}
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-neutral-black mb-1">{contestant.name}</h3>
                <p className="text-sm text-neutral-gray-medium mb-2">{contestant.country}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    {contestant.competition}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                    {contestant.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
                    Position #{contestant.livePosition}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-2">Summary</h4>
                <p className="text-neutral-gray-dark leading-relaxed">{workSummary}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-2">Full Description</h4>
                <p className="text-neutral-gray-dark leading-relaxed whitespace-pre-line">{workDescription}</p>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-brand-red-600" />
              <h3 className="text-lg font-bold text-neutral-black">Performance Analytics</h3>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-brand-red-50 to-orange-50 border border-brand-red-200">
                <p className="text-xs font-medium text-neutral-gray-medium uppercase tracking-wider mb-1">Total Votes</p>
                <p className="text-2xl font-black text-brand-red-600">{liveVotes.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                <p className="text-xs font-medium text-neutral-gray-medium uppercase tracking-wider mb-1">Views</p>
                <p className="text-2xl font-black text-blue-600">{(contestant.views || 0).toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
                <p className="text-xs font-medium text-neutral-gray-medium uppercase tracking-wider mb-1">Position</p>
                <p className="text-2xl font-black text-amber-600">#{contestant.livePosition}</p>
              </div>
            </div>

            {/* Votes Over Time Chart */}
            {chartData.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-neutral-gray-medium" />
                  <h4 className="text-sm font-bold text-neutral-black">Votes Over Time</h4>
                </div>
                <div className="p-4 rounded-xl border border-neutral-gray-light bg-white">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ED3237" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ED3237" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        stroke="#9CA3AF"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="#9CA3AF"
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="votes" 
                        stroke="#ED3237" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorVotes)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Growth Insights */}
                {chartData.length >= 2 && (
                  <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
                    <p className="text-sm font-medium text-green-800">
                      📈 Growing by {Math.round((chartData[chartData.length - 1].votes - chartData[0].votes) / chartData.length)} votes per period on average
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-gray-light bg-neutral-bg-light">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
