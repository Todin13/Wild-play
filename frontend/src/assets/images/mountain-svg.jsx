import React from "react";

const MountainSVG = ({
  className = "",
  color = "currentColor",
  darkColor = "rgba(0, 0, 0, 0.25)",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1372 999"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main colored paths */}
      <path d="M347.5 220L682.5 852H0.5L347.5 220Z" fill={color} />
      <path
        d="M629.31 155.5L977.08 787.75H281.539L629.31 155.5Z"
        fill={color}
      />
      <path d="M796.803 0.5L1371.5 851.5H334.279L796.803 0.5Z" fill={color} />
      <path
        d="M528.917 110.5L876.688 742.75H181.146L528.917 110.5Z"
        fill={color}
      />

      {/* Shaded (darker) paths */}
      <path
        d="M796.802 0.5L773.24 238.5L817.802 348.5V470.5L773.24 603.5L692.823 692.5L675.408 781.5L629.31 851.5H726.117H1002.71H1371.5L796.802 0.5Z"
        fill={darkColor}
      />
      <path
        d="M629.311 155.5L667.727 229.5L646.214 289.5L629.311 418L612.408 320L629.311 155.5Z"
        fill={darkColor}
      />
      <path
        d="M528.918 110.5L591.407 224.5L599.602 355.5L644.677 461L607.798 542.5L570.406 580.5L516.112 597L476.16 490L483.843 310.5L528.918 110.5Z"
        fill={darkColor}
      />
      <path
        d="M346.571 219.5L407 332.5L402.211 435.201L455.059 537.768L495.079 708.21L513.551 791.672L481.226 851H226.737L213.396 687.094L250.339 600.616L297.029 529.221V435.201L319.809 354.756L346.571 219.5Z"
        fill={darkColor}
      />
    </svg>
  );
};

export default MountainSVG;
