import { CanvasInfo } from "./Canvas";
import React, {
  ReactNode,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

export interface DraggableComponentProps {
  children?: ReactNode;
  origin?: { x: number; y: number };
  transform?: CanvasInfo;
  gridSize?: number;
  className?: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
  children,
  origin = { x: 0, y: 0 },
  transform = { x: 0, y: 0, scale: 1 },
  gridSize = 80,
  className,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDraggingComponent, setIsDraggingComponent] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({
    x: origin.x,
    y: origin.y,
  });

  const componentFocus = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDraggingComponent(true);

    // const componentRect = componentRef.current?.getBoundingClientRect();
    // if (componentRect) {
    // 	const x = componentRect.left + componentRect.width / 2;
    // 	const y = componentRect.top + componentRect.height / 2;
    // 	setStart({ x, y });
    // } else {
    // 	setStart({ x: e.clientX, y: e.clientY });
    // }

    setStart({ x: e.clientX, y: e.clientY });
  }, []);

  const componentDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isDraggingComponent) {
        let dx = e.clientX - start.x;
        let dy = e.clientY - start.y;

        if (e.ctrlKey) {
          const gridSideSize = gridSize / 2;
          dx = Math.round(dx / gridSideSize) * gridSideSize;
          dy = Math.round(dy / gridSideSize) * gridSideSize;
        }

        const newX = lastPosition.x + dx;
        const newY = lastPosition.y + dy;

        setOffset({ x: newX - origin.x, y: newY - origin.y });

        requestAnimationFrame(() => componentDrag(e));
      }
    },
    [isDraggingComponent, lastPosition, gridSize, origin, start],
  );

  const componentUnfocus = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDraggingComponent(false);
      setLastPosition({ x: origin.x + offset.x, y: origin.y + offset.y });
    },
    [origin, offset],
  );

  const positionStyle = useMemo(
    () => ({
      left: `${origin.x + transform.x + offset.x}px`,
      top: `${origin.y + transform.y + offset.y}px`,
      transform: `scale(${transform.scale})`,
    }),
    [origin, transform, offset],
  );

  // useEffect(() => {
  //   if (transform.scale > 1) {
  //     const dx = lastPosition.x;
  //     const dy = lastPosition.y;
  //     setLastPosition({
  //       x: dx,
  //       y: dy,
  //     });
  //   } else if (transform.scale < 1) {
  //     const dx = lastPosition.x;
  //     const dy = lastPosition.y;
  //     setLastPosition({
  //       x: dx,
  //       y: dy,
  //     });
  //   }
  // }, [transform.scale]);

  return (
    <div
      ref={componentRef}
      className={`absolute cursor-move touch-none select-none ${className}`}
      onMouseDown={componentFocus}
      onMouseMove={componentDrag}
      onMouseUp={componentUnfocus}
      onMouseOut={componentUnfocus}
      style={positionStyle}
    >
      {children}
    </div>
  );
};
