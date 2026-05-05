'use client';

import { useState } from 'react';
import { Eye, ThumbsUp, Share2, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function OverviewPage() {
  const [user] = useState({
    name: 'Wisdomcezeh',
    email: 'wisdomcezeh@gmail.com',
    profileCompletion: 71
  });

  const completionTasks = [
    { label: 'Upload Photo', completed: true },
    { label: 'Add Name', completed: true },
    { label: 'Add Email', completed: true },
    { label: 'Add Phone', completed: false },
    { label: 'Add Services', completed: true },
    { label: 'Upload Certifications', completed: false },
  ];

  const stats = [
    { icon: Eye, label: 'Total Views', value: '12,450', change: '+8.2%', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: ThumbsUp, label: 'Total Likes', value: '3,400', change: '+12.5%', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: Share2, label: 'Total Shares', value: '1,200', change: '+6.3%', color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { icon: CheckCircle, label: 'Active Listings', value: '3', change: '+1', color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  const recentActivity = [
    { icon: 'message', title: 'New message from Dr. Wanjiku Muthoni', time: '2 hours ago' },
    { icon: 'invoice', title: 'Invoice #INV-2024-0045 received from TechConsult Services', time: '3 hours ago' },
    { icon: 'booking', title: 'New service booking request received', time: '5 hours ago' },
    { icon: 'views', title: 'Your SolaPump Pro listing reached 12k views', time: '1 day ago' },
    { icon: 'invoice', title: 'Invoice #INV-2024-0042 confirmed by client', time: '1 day ago' },
    { icon: 'verified', title: 'EcoBrick Builder listing approved', time: '2 days ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-6 lg:mb-8 bg-white shadow-sm border border-gray-200 rounded-2xl p-4 lg:p-6">
        <h1 className="text-lg lg:text-2xl font-black text-gray-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-sm lg:text-base text-gray-600">Here&apos;s what&apos;s happening with your listings and activity.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:w-16 h-10 lg:h-16 bg-linear-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white text-lg lg:text-2xl font-bold">
              W
            </div>
            <div>
              <h2 className="text-sm lg:text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 text-xs lg:text-sm">{user.email}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs lg:text-sm text-gray-600">Profile Completion</p>
            <p className="text-lg lg:text-3xl font-bold text-red-600">{user.profileCompletion}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-red-600 h-2 rounded-full transition-all"
            style={{ width: `${user.profileCompletion}%` }}
          />
        </div>

        {/* Completion Tasks */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {completionTasks.map((task, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  task.completed
                    ? 'bg-green-600 border-green-600'
                    : 'border-gray-300'
                }`}
              >
                {task.completed && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-xs lg:text-sm ${task.completed ? 'text-gray-600 line-through' : 'text-gray-900 font-medium'}`}>
                {task.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200`}>
              <div className="flex items-start justify-between mb-4">
                <Icon className={`${stat.color}`}/>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <p className="text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Listing Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-start lg:text-center">
          <p className="text-2xl lg:text-4xl font-bold text-green-600 mb-2">3</p>
          <p className="text-gray-700 font-medium">Active Listings</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 text-start lg:text-center">
          <p className="text-2xl lg:text-4xl font-bold text-yellow-600 mb-2">1</p>
          <p className="text-gray-700 font-medium">Pending Verification</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-start lg:text-center">
          <p className="text-2xl lg:text-4xl font-bold text-gray-600 mb-2">2</p>
          <p className="text-gray-700 font-medium">Archived Listings</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg lg:rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="text-red-600 h-5 w-5" />
            Recent Activity
          </h3>
          <Link href="/dashboard/notifications" className="text-red-600 font-semibold text-xs lg:text-sm hover:text-red-700">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 p-2 lg:p-4 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-red-600">
              <div className="shrink-0">
                {activity.icon === 'message' && (
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>
                )}
                {activity.icon === 'invoice' && (
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </div>
                )}
                {activity.icon === 'booking' && (
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5H4v8a2 2 0 002 2h12a2 2 0 002-2V7h-2v1a1 1 0 11-2 0V7H9v1a1 1 0 11-2 0V7H6v1a1 1 0 11-2 0V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {activity.icon === 'views' && (
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
                {activity.icon === 'verified' && (
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.372a3.066 3.066 0 01-2.812 3.062 3.066 3.066 0 01-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 01-1.745-.723 3.066 3.066 0 01-2.812-3.062V6.517a3.066 3.066 0 012.812-3.062zm7.069 4.175a.75.75 0 10-1.06-1.06L9 10.939 7.591 9.529a.75.75 0 00-1.061 1.061l2 2a.75.75 0 001.06 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
