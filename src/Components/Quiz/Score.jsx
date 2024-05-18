import React from 'react';

const Score = ({ score, total }) => {
  const percentage = Math.round((score / total) * 100); 

  return (
    <div className="score">
      <h2>Score: {percentage}%</h2>
    </div>
  );
};

export default Score;