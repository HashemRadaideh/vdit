import { DragEvent, ReactNode, useState, MouseEvent } from "react";
import { ArrowUpIcon, LayoutIcon, MoveIcon, ShrinkIcon } from "./Icons";
import { GridLines } from "./GridLines";

interface CanvasProps {
  handleAppendGhost: (ghost: ReactNode | null) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  handleAppendGhost,
}: CanvasProps) => {
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [canvasPosition, setCanvasPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();

    let color = "green";
    const width = 100;
    const height = 50;

    const viewport = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - viewport.left - canvasPosition.x - width / 2;
    let y = e.clientY - viewport.top - canvasPosition.y - height / 2;

    setPreviewComponent(
      <div
        style={{
          position: "absolute",
          left: x + "px",
          top: y + "px",
          width: width + "px",
          height: height + "px",
          backgroundColor: color,
        }}
        className="flex items-center justify-center"
      >
        Preview
      </div>,
    );
  };

  const handleClick = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("Hello, World!");
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const componentName = e.dataTransfer.getData("componentName");

    const width = 100;
    const height = 50;

    const viewport = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - viewport.left - canvasPosition.x - width / 2;
    let y = e.clientY - viewport.top - canvasPosition.y - height / 2;

    setDroppedComponents([
      ...droppedComponents,
      <div
        onClick={handleClick}
        key={droppedComponents.length}
        style={{
          position: "absolute",
          left: x + "px",
          top: y + "px",
          width: width + "px",
          height: height + "px",
          backgroundColor: "lightblue",
        }}
        className="flex items-center justify-center"
      >
        {componentName}
      </div>,
    ]);

    setPreviewComponent(null);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingCanvas(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingCanvas) {
      const dx = e.clientX - startPosition.x;
      const dy = e.clientY - startPosition.y;

      setCanvasPosition({
        x: canvasPosition.x + dx,
        y: canvasPosition.y + dy,
      });

      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  return (
    <div className="flex grow flex-col justify-start overflow-auto">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        className="relative grow overflow-hidden"
      >
        {droppedComponents.length === 0 && previewComponent === null && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <span className="select-none text-2xl font-semibold text-gray-500">
              Drop here
            </span>
          </div>
        )}
        <div
          className="absolute"
          style={{
            transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`,
          }}
        >
          {previewComponent}
          {droppedComponents}
        </div>
      </div>

      <div className="flex justify-center gap-4 border border-gray-200 p-2">
        <button
          type="button"
          className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
        >
          <MoveIcon className="h-4 w-4" />
          <span>Move</span>
        </button>
        <button
          type="button"
          className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
        >
          <ShrinkIcon className="h-4 w-4" />
          <span>Resize</span>
        </button>
        <button
          type="button"
          className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
        >
          <LayoutIcon className="h-6 w-6" />
          <span>Layout</span>
        </button>
        <button
          type="button"
          className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
        >
          <ArrowUpIcon className="h-6 w-6" />
          <span>Canvas</span>
        </button>
      </div>
    </div>
  );
};
