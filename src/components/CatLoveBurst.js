import React, { useEffect, useMemo, useState } from 'react';
import './CatLoveBurst.css';

const CatLoveBurst = () => {
  const [pieces, setPieces] = useState([]);

  const emojis = useMemo(() => ['😻', '🐱', '🐾', '💖', '💗', '💞', '💕', '💘'], []);

  useEffect(() => {
    const next = [];
    for (let i = 0; i < 42; i++) {
      next.push({
        id: i,
        left: Math.random() * 100,
        drift: (Math.random() - 0.5) * 120,
        delay: Math.random() * 0.6,
        duration: 1.8 + Math.random() * 1.2,
        size: 18 + Math.random() * 28,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }
    setPieces(next);
  }, [emojis]);

  return (
    <div className="catburst-container" aria-hidden="true">
      <div className="catburst-center">😻💖</div>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="catburst-piece"
          style={{
            left: `${p.left}%`,
            '--drift': `${p.drift}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

export default CatLoveBurst;

