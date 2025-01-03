import React from 'react';
import { Signal } from '../types';

interface SignalButtonProps {
  color: Signal;
  onClick: () => void;
  disabled?: boolean;
}

const colorMap: Record<Signal, string> = {
  red: 'bg-red-500 hover:bg-red-600',
  orange: 'bg-orange-500 hover:bg-orange-600',
  green: 'bg-green-500 hover:bg-green-600',
};

export const SignalButton: React.FC<SignalButtonProps> = ({
  color,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colorMap[color]} text-white font-bold py-2 px-4 rounded transition-colors`}
    >
      {color.charAt(0).toUpperCase() + color.slice(1)}
    </button>
  );
};