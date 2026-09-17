import React from 'react';

export default function Badge({ children, type = 'subject', style }) {
  let className = 'badge badge-subject';
  
  if (type === 'High') className = 'badge badge-high';
  else if (type === 'Medium') className = 'badge badge-medium';
  else if (type === 'Low') className = 'badge badge-low';
  else if (type === 'completed') className = 'badge badge-completed';

  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
}
