import { DraggableComponent } from "./DraggableComponent";
import {
  DragEvent,
  ReactNode,
  useState,
  MouseEvent,
  useMemo,
  useCallback,
  useRef,
} from "react";

export interface CanvasInfo {
  x: number;
  y: number;
  scale: number;
}

interface CanvasProps {
  handleAppendGhost: (ghost: ReactNode | null) => void;
  gridSize?: number;
}

export const Canvas: React.FC<CanvasProps> = ({
  handleAppendGhost,
  gridSize = 80,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [components, setComponents] = useState<ReactNode[]>([]);

  const [preview, setPreview] = useState<ReactNode | null>(null);

  const [isPanningCanvas, setIsDraggingCanvas] = useState(false);

  const [canvasOffset, setCanvasOffset] = useState<CanvasInfo>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const [canvasPrevious, setCanvasPrevious] = useState<CanvasInfo>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const canvasDragOver = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();

      const color = "blueviolet";
      const width = 80;
      const height = 160;

      const viewport = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasOffset.x - viewport.left - width / 2;
      const y = e.clientY - canvasOffset.y - viewport.top - height / 2;

      setPreview(
        <div
          className="flex select-none items-center justify-center"
          style={{
            position: "absolute",
            left: x + "px",
            top: y + "px",
            width: width + "px",
            height: height + "px",
            backgroundColor: color,
          }}
        >
          Preview
        </div>,
      );
    },
    [canvasOffset],
  );

  const canvasDropOver = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      const componentName = e.dataTransfer.getData("componentName");

      const color = "green";
      const width = 80;
      const height = 160;

      const viewport = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasOffset.x - viewport.left - width / 2;
      const y = e.clientY - canvasOffset.y - viewport.top - height / 2;

      setComponents([
        ...components,
        <DraggableComponent
          key={components.length}
          className="flex select-none items-center justify-center"
          origin={{ x: x, y: y }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: width + "px",
              height: height + "px",
              backgroundColor: color,
            }}
          >
            {componentName}
          </div>
        </DraggableComponent>,
      ]);

      setPreview(null);
    },
    [canvasOffset, components],
  );

  const canvasFocus = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleAppendGhost(null);
      setIsDraggingCanvas(true);
      setPreview(null);
      setCanvasPrevious({
        x: e.clientX,
        y: e.clientY,
        scale: canvasOffset.scale,
      });
    },
    [canvasOffset.scale, handleAppendGhost],
  );

  const canvasPanning = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (isPanningCanvas) {
        const dx = e.clientX - canvasPrevious.x;
        const dy = e.clientY - canvasPrevious.y;

        setCanvasOffset({
          x: canvasOffset.x + dx,
          y: canvasOffset.y + dy,
          scale: canvasOffset.scale,
        });

        setCanvasPrevious({
          x: e.clientX,
          y: e.clientY,
          scale: canvasOffset.scale,
        });
      }
    },
    [isPanningCanvas, canvasOffset, canvasPrevious],
  );

  const canvasUnfocus = useCallback(() => {
    setIsDraggingCanvas(false);
  }, []);

  const canvasZoom = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      const scaleChange = e.deltaY > 0 ? -0.25 : 0.25;
      const newScale = Math.min(
        2,
        Math.max(0.1, canvasOffset.scale + scaleChange),
      );
      setCanvasOffset({
        ...canvasOffset,
        scale: newScale,
      });
    },
    [canvasOffset],
  );

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(to right, rgb(203 213 225) 2px, transparent 2px), linear-gradient(to bottom, rgb(203 213 225) 2px, transparent 2px)`,
      backgroundSize: `${(gridSize / 2) * canvasOffset.scale}px ${(gridSize / 2) * canvasOffset.scale}px`,
      backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`,
    }),
    [gridSize, canvasOffset],
  );

  return (
    <div
      ref={canvasRef}
      className="relative grow overflow-hidden"
      onDragOver={canvasDragOver}
      onDrop={canvasDropOver}
      onMouseDown={canvasFocus}
      onMouseMove={canvasPanning}
      onMouseUp={canvasUnfocus}
      onWheel={canvasZoom}
      style={backgroundStyle}
    >
      {components.length === 0 && preview === null && (
        <span className="absolute inset-0 flex select-none items-center justify-center text-5xl font-semibold text-secondary-700">
          Drop here
        </span>
      )}
      <div
        className="absolute"
        style={{
          transform: `scale(${canvasOffset.scale}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
        }}
      >
        {preview}
        {components}
      </div>
    </div>
  );
};
