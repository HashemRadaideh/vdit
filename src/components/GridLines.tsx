import { CanvasInfo } from "./Canvas";
import { useId } from "react";

interface GridLinesProps {
  transform?: CanvasInfo;
  gap?: number;
  stroke?: number;
  className?: string;
}

export const GridLines: React.FC<GridLinesProps> = ({
  className = "h-full w-full",
  transform = { x: 0, y: 0, scale: 1 },
  gap = 15,
  stroke = 1,
}: GridLinesProps) => {
  const patternID = useId();
  const { x, y, scale } = transform;
  const scaledGap = gap * scale;

  return (
    <>
      <svg className={className} viewBox="0 0 100% 100%">
        <pattern
          id={patternID}
          x={x}
          y={y}
          width={scaledGap}
          height={scaledGap}
          patternUnits="userSpaceOnUse"
        >
          <path
            stroke="hsl(var(--color-secondary))"
            strokeWidth={stroke}
            d={`M${scaledGap / 2} 0 V${scaledGap} M0 ${scaledGap / 2} H${scaledGap}`}
          />
        </pattern>
        <rect
          x={0}
          y={0}
          width="100%"
          height="100%"
          fill={`url(#${patternID})`}
        />
      </svg>
    </>
  );
};
