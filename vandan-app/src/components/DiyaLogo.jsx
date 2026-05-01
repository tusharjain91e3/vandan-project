import React from 'react';

export default function DiyaLogo({ size = 32, className = '' }) {
  return (
    <svg
      className={`diya-logo ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flame */}
      <path
        d="M32 6c-2 8-8 14-8 22a8 8 0 0016 0c0-8-6-14-8-22z"
        fill="url(#flame-grad)"
      />
      <path
        d="M32 12c-1.2 5-4.5 9-4.5 15a4.5 4.5 0 009 0c0-6-3.3-10-4.5-15z"
        fill="#FFF3C4"
        opacity="0.8"
      />
      {/* Bowl */}
      <ellipse cx="32" cy="42" rx="18" ry="5" fill="url(#bowl-grad)" />
      <path
        d="M14 42c0 0 2 14 18 14s18-14 18-14"
        stroke="url(#bowl-grad)"
        strokeWidth="3"
        fill="url(#bowl-fill)"
      />
      {/* Base */}
      <ellipse cx="32" cy="56" rx="10" ry="3" fill="#B8860B" />
      <defs>
        <linearGradient id="flame-grad" x1="32" y1="6" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
        <linearGradient id="bowl-grad" x1="14" y1="42" x2="50" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CD853F" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#CD853F" />
        </linearGradient>
        <linearGradient id="bowl-fill" x1="32" y1="42" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
    </svg>
  );
}
