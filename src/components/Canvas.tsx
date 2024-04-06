import { DragEvent, ReactNode, useState, MouseEvent } from "react";
import { ArrowUpIcon, LayoutIcon, MoveIcon, ShrinkIcon } from "./Icons";
import { GridLines } from "./GridLines";

export interface CanvasInfo {
  x: number;
  y: number;
  scale: number;
}

interface CanvasProps {
  handleAppendGhost: (ghost: ReactNode | null) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  handleAppendGhost,
}: CanvasProps) => {
  const [components, setComponents] = useState<ReactNode[]>([]);

  const [preview, setPreview] = useState<ReactNode | null>(null);

  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);

  const [canvasState, setCanvasState] = useState<CanvasInfo>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const [previousState, setPreviousState] = useState<CanvasInfo>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const componentSelect = (
    _e: MouseEvent<HTMLDivElement>,
    componentName: string,
  ) => {
    handleAppendGhost(<>{componentName}</>);
  };

  const componentDrag = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const componentDeselect = (_e: MouseEvent<HTMLDivElement>) => {};

  const canvasDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();

    let color = "blueviolet";
    const width = 100;
    const height = 50;

    const viewport = e.currentTarget.getBoundingClientRect();

    // actual mouse (x, y) position relative to the screen
    let x = e.clientX;
    let y = e.clientY;

    // translating mouse (x, y) to relative canvas coordinates
    x -= canvasState.x;
    y -= canvasState.y;

    // bounding the mouse into the canvas's viewport
    x -= viewport.left;
    y -= viewport.top;

    // positioning the (x, y) into the center of the widget
    x -= width / 2;
    y -= height / 2;

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
  };

  const canvasDropOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const componentName = e.dataTransfer.getData("componentName");

    let color = "green";
    const width = 100;
    const height = 50;

    const viewport = e.currentTarget.getBoundingClientRect();

    // actual mouse (x, y) position relative to the screen
    let x = e.clientX;
    let y = e.clientY;

    // translating mouse (x, y) to relative canvas coordinates
    x -= canvasState.x;
    y -= canvasState.y;

    // bounding the mouse into the canvas's viewport
    x -= viewport.left;
    y -= viewport.top;

    // positioning the (x, y) into the center of the widget
    x -= width / 2;
    y -= height / 2;

    setComponents([
      ...components,
      <div
        className="flex select-none items-center justify-center"
        key={components.length}
        onMouseDown={(e) => componentSelect(e, componentName)}
        onMouseMove={componentDrag}
        onMouseUp={componentDeselect}
        style={{
          position: "absolute",
          left: x + "px",
          top: y + "px",
          width: width + "px",
          height: height + "px",
          backgroundColor: color,
        }}
      >
        {componentName}
      </div>,
    ]);

    setPreview(null);
  };

  const canvasMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleAppendGhost(null);
    setIsDraggingCanvas(true);
    setPreview(null);
    setPreviousState({ x: e.clientX, y: e.clientY, scale: canvasState.scale });
  };

  const canvasMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (isDraggingCanvas) {
      const dx = e.clientX - previousState.x;
      const dy = e.clientY - previousState.y;

      setCanvasState({
        x: canvasState.x + dx,
        y: canvasState.y + dy,
        scale: canvasState.scale,
      });

      setPreviousState({
        x: e.clientX,
        y: e.clientY,
        scale: canvasState.scale,
      });
    }
  };

  const canvasMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const canvasMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? -0.1 : 0.1;
    setCanvasState({
      ...canvasState,
      scale: Math.min(1.9, Math.max(0.1, canvasState.scale + scaleChange)),
    });
  };

  return (
    <div className="flex grow flex-col justify-start">
      <div
        className="relative grow overflow-hidden"
        onDragOver={canvasDragOver}
        onDrop={canvasDropOver}
        onMouseDown={canvasMouseDown}
        onMouseMove={canvasMouseMove}
        onMouseUp={canvasMouseUp}
        onWheel={canvasMouseWheel}
      >
        {components.length === 0 && preview === null && (
          <span className="absolute inset-0 flex select-none items-center justify-center text-5xl font-semibold text-secondary-700">
            Drop here
          </span>
        )}
        <div
          className="absolute"
          style={{
            transform: `scale(${canvasState.scale}) translate(${canvasState.x}px, ${canvasState.y}px)`,
          }}
        >
          {preview}
          {components}
        </div>
      </div>

      <div className="flex justify-center gap-4 border border-tertiary p-2">
        <button
          className="flex justify-center gap-2 rounded-lg border border-tertiary p-2"
          type="button"
        >
          <MoveIcon className="h-4 w-4" />
          <span>Move</span>
        </button>
        <button
          className="flex justify-center gap-2 rounded-lg border border-tertiary p-2"
          type="button"
        >
          <ShrinkIcon className="h-4 w-4" />
          <span>Resize</span>
        </button>
        <button
          className="flex justify-center gap-2 rounded-lg border border-tertiary p-2"
          type="button"
        >
          <LayoutIcon className="h-6 w-6" />
          <span>Layout</span>
        </button>
        <button
          className="flex justify-center gap-2 rounded-lg border border-tertiary p-2"
          type="button"
        >
          <ArrowUpIcon className="h-6 w-6" />
          <span>Canvas</span>
        </button>
      </div>
    </div>
  );
};
