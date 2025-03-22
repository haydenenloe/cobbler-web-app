import * as React from "react";

interface ArrowDownProps {
  className?: string;
}

export const ArrowDown: React.FC<ArrowDownProps> = ({ className }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <svg
      width="87"
      height="36"
      viewBox="0 0 87 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`arrow-down transition-colors duration-300 ${className}`}
      style={{ width: "119px", height: "47px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        d="M41.2415 34.455C42.6031 35.3865 44.3969 35.3865 45.7585 34.455L84.3553 8.05141C87.6014 5.83081 86.0298 0.75 82.0968 0.75H4.90316C0.970213 0.75 -0.601365 5.83082 2.64471 8.05142L41.2415 34.455Z"
        fill={isHovered ? "#1C8757" : "black"}
        className="transition-colors duration-200"
      />
    </svg>
  );
};