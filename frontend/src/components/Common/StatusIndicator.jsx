import React from 'react';

export const StatusIndicator = ({ status, count, showBorder = true, size = 'md' }) => {
  const getStatusStyle = (status) => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium';
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    };
    
    const dotClasses = {
      sm: 'w-1.5 h-1.5 mr-1',
      md: 'w-2 h-2 mr-2', 
      lg: 'w-3 h-3 mr-2'
    };

    let colorClasses = '';
    let borderClasses = '';
    let dotColor = '';

    switch (status?.toLowerCase()) {
      case 'fonctionnel':
        colorClasses = 'bg-green-100 text-green-800';
        borderClasses = showBorder ? 'border border-green-300' : '';
        dotColor = 'bg-green-500';
        break;
      case 'en panne':
        colorClasses = 'bg-red-100 text-red-800';
        borderClasses = showBorder ? 'border border-red-300' : '';
        dotColor = 'bg-red-500';
        break;
      case 'en maintenance':
        colorClasses = 'bg-yellow-100 text-yellow-800';
        borderClasses = showBorder ? 'border border-yellow-300' : '';
        dotColor = 'bg-yellow-500';
        break;
      case 'hors service':
        colorClasses = 'bg-gray-100 text-gray-800';
        borderClasses = showBorder ? 'border border-gray-300' : '';
        dotColor = 'bg-gray-500';
        break;
      case 'installee':
      case 'installée':
        colorClasses = 'bg-blue-100 text-blue-800';
        borderClasses = showBorder ? 'border border-blue-300' : '';
        dotColor = 'bg-blue-500';
        break;
      case 'retirée':
      case 'retiree':
        colorClasses = 'bg-orange-100 text-orange-800';
        borderClasses = showBorder ? 'border border-orange-300' : '';
        dotColor = 'bg-orange-500';
        break;
      default:
        colorClasses = 'bg-gray-100 text-gray-800';
        borderClasses = showBorder ? 'border border-gray-300' : '';
        dotColor = 'bg-gray-500';
    }

    return {
      container: `${baseClasses} ${sizeClasses[size]} ${colorClasses} ${borderClasses}`,
      dot: `${dotClasses[size]} rounded-full ${dotColor}`
    };
  };

  const styles = getStatusStyle(status);

  return (
    <span className={styles.container}>
      <span className={styles.dot}></span>
      {status}
      {count !== undefined && (
        <span className="ml-1 font-bold">({count})</span>
      )}
    </span>
  );
};

export const MotriceIndicator = ({ motrice, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const getMotriceStyle = (motrice) => {
    const baseClasses = `inline-flex items-center rounded-full font-medium ${sizeClasses[size]}`;
    
    switch (motrice) {
      case 'M':
        return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-300`;
      case 'MH':
        return `${baseClasses} bg-purple-100 text-purple-800 border border-purple-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-300`;
    }
  };

  return (
    <span className={getMotriceStyle(motrice)}>
      {motrice || 'N/A'}
    </span>
  );
};

export default StatusIndicator;
