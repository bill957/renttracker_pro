import React from 'react';
import Icon from '../../../components/AppIcon';

const RequestStats = ({ requests }) => {
  const stats = {
    total: requests?.length,
    submitted: requests?.filter(r => r?.status === 'submitted')?.length,
    inProgress: requests?.filter(r => r?.status === 'in-progress')?.length,
    completed: requests?.filter(r => r?.status === 'completed')?.length,
    emergency: requests?.filter(r => r?.priority === 'emergency')?.length,
    avgResolutionTime: 3.2, // Mock data
    totalCost: requests?.reduce((sum, r) => sum + (r?.actualCost?.total || 0), 0)
  };

  const statCards = [
    {
      title: 'Total Requests',
      value: stats?.total,
      icon: 'Wrench',
      color: 'text-primary bg-primary/10',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Pending',
      value: stats?.submitted,
      icon: 'Clock',
      color: 'text-warning bg-warning/10',
      change: '-5%',
      changeType: 'decrease'
    },
    {
      title: 'In Progress',
      value: stats?.inProgress,
      icon: 'Settings',
      color: 'text-secondary bg-secondary/10',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Completed',
      value: stats?.completed,
      icon: 'CheckCircle',
      color: 'text-success bg-success/10',
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Emergency',
      value: stats?.emergency,
      icon: 'AlertTriangle',
      color: 'text-error bg-error/10',
      change: '0%',
      changeType: 'neutral'
    },
    {
      title: 'Avg Resolution',
      value: `${stats?.avgResolutionTime} days`,
      icon: 'Timer',
      color: 'text-accent bg-accent/10',
      change: '-0.5d',
      changeType: 'decrease'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase': return 'text-success';
      case 'decrease': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className={`flex items-center space-x-1 text-xs ${getChangeColor(stat?.changeType)}`}>
              <Icon name={getChangeIcon(stat?.changeType)} size={12} />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestStats;