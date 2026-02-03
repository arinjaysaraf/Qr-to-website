import React, { useEffect, useState } from 'react';
import './HeartRain.css';

const HeartRain = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟'];
    const newHearts = [];
    
    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 8 + Math.random() * 4,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        size: 20 + Math.random() * 15
      });
    }
    
    setHearts(newHearts);
  }, []);

  return (
    <div className="heart-rain-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-drop"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`,
            animationDuration: `${heart.animationDuration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default HeartRain;
