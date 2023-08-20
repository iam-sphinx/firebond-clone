import React, { ReactNode } from 'react';

type SpinnerProps = {
  icon?: ReactNode;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

const Spinner = ({ icon, size = 32, className = '', style }: SpinnerProps) => {
  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : { width: size };
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{ ...sizeStyle, ...style }}
    >
      {icon ? (
        icon
      ) : (
        <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
    </div>
  );
};

export default Spinner;
