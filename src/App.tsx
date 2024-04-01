import { DragEvent, useEffect, useState } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { ArrowUpIcon } from "./components/Icons/ArrowUpIcon";
import { CreditCardIcon } from "./components/Icons/CreditCardIcon";
import { ImageIcon } from "./components/Icons/ImageIcon";
import { KeyIcon } from "./components/Icons/KeyIcon";
import { LayoutGridIcon } from "./components/Icons/LayoutGridIcon";
import { LayoutIcon } from "./components/Icons/LayoutIcon";
import { ListIcon } from "./components/Icons/ListIcon";
import { MoveIcon } from "./components/Icons/MoveIcon";
import { ShrinkIcon } from "./components/Icons/ShrinkIcon";
import { TableIcon } from "./components/Icons/TableIcon";

export default function App() {
  const [droppedComponents, setDroppedComponents] = useState<any[]>([]);
  const [previewComponent, setPreviewComponent] = useState<{
    x: number;
    y: number;
    color: string;
  } | null>(null);

  useEffect(() => {
    const handleDragEnd = () => {
      setPreviewComponent(null);
    };

    document.addEventListener("dragend", handleDragEnd);

    return () => {
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, []);

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    componentName: string,
  ) => {
    e.dataTransfer.setData("componentName", componentName);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    let x = e.clientX;
    let y = e.clientY;
    let color = "lightblue";

    const width = 100;
    const height = 50;

    const viewport = e.currentTarget.getBoundingClientRect();
    if (x + width > viewport.right) {
      x = viewport.right - width;
      color = "red";
    } else if (x < viewport.left) {
      x = viewport.left + width;
      color = "red";
    }

    if (y + height > viewport.bottom) {
      y = viewport.bottom - height;
      color = "red";
    } else if (y < viewport.top) {
      y = viewport.top + height;
      color = "red";
    }

    setPreviewComponent({ x, y, color });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentName = e.dataTransfer.getData("componentName");

    let x = e.clientX;
    let y = e.clientY;

    if (x < 0 || y < 0) {
      return;
    }

    const width = 100;
    const height = 50;

    const viewport = e.currentTarget.getBoundingClientRect();
    if (x + width > viewport.right) {
      x = viewport.right - width;
    } else if (x < viewport.left) {
      x = viewport.left + width;
    }

    if (y + height > viewport.bottom) {
      y = viewport.bottom - height;
    } else if (y < viewport.top) {
      y = viewport.top + height;
    }

    setDroppedComponents([
      ...droppedComponents,
      <div
        key={droppedComponents.length}
        style={{
          position: "fixed",
          left: x + "px",
          top: y + "px",
          width: width + "px",
          height: height + "px",
          backgroundColor: "lightblue",
        }}
      >
        {componentName}
      </div>,
    ]);

    setPreviewComponent(null);
  };

  return (
    <>
      <header>
        <nav className="flex justify-between bg-primary text-xl text-secondary">
          <a className="logo p-4" href="/">
            Vdit
          </a>

          <div className="flex justify-between">
            <ul className="flex py-4">
              <li>
                <ThemeToggle />
              </li>

              <li>
                <a className="p-4" href="/home">
                  Home
                </a>
              </li>

              <li>
                <a className="p-4" href="/about">
                  About
                </a>
              </li>

              <li>
                <a className="p-4" href="/chat">
                  chat
                </a>
              </li>
            </ul>
            <div className="p-4">profile</div>
          </div>
        </nav>
      </header>

      <main className="flex grow">
        <div className="flex flex-col border-r border-gray-200">
          <form className="flex items-center gap-4 border-b border-gray-200 p-4">
            <input name="search" placeholder="search" />
            <button type="submit">
              <span>search</span>
            </button>
          </form>

          <div className="grid gap-4 overflow-auto p-4">
            <div
              draggable
              onDragStart={(e): void => handleDragStart(e, "Button")}
              className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
            >
              <KeyIcon className="h-4 w-4" />
              <span className="text-xs">Button</span>
            </div>
            <div
              draggable
              onDragStart={(e): void => handleDragStart(e, "Card")}
              className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
            >
              <CreditCardIcon className="h-4 w-4" />
              <span className="text-xs">Card</span>
            </div>
            <div
              draggable
              onDragStart={(e): void => handleDragStart(e, "Image")}
              className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
            >
              <ImageIcon className="h-4 w-4" />
              <span className="text-xs">Image</span>
            </div>
            <div
              draggable
              onDragStart={(e): void => handleDragStart(e, "Grid")}
              className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
            >
              <LayoutGridIcon className="h-4 w-4" />
              <span className="text-xs">Grid</span>
            </div>
            <div
              draggable
              onDragStart={(e): void => handleDragStart(e, "List")}
              className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
            >
              <ListIcon className="h-4 w-4" />
              <span className="text-xs">List</span>
            </div>
            <div
              draggable
              onDragStart={(e): void => handleDragStart(e, "Table")}
              className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
            >
              <TableIcon className="h-4 w-4" />
              <span className="text-xs">Table</span>
            </div>
          </div>
        </div>

        <div className="flex grow flex-col justify-start p-4">
          <div className="flex justify-center gap-4 pb-4">
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

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative aspect-[16/9] overflow-hidden border border-dashed border-gray-200"
          >
            {previewComponent && (
              <div
                style={{
                  position: "fixed",
                  left: previewComponent.x + "px",
                  top: previewComponent.y + "px",
                  width: "100px", // Adjust width as needed
                  height: "50px", // Adjust height as needed
                  backgroundColor: previewComponent.color,
                }}
              >
                Preview
              </div>
            )}

            {droppedComponents.length === 0 ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <span className="text-2xl font-semibold text-gray-500">
                  Drop here
                </span>
              </div>
            ) : (
              droppedComponents.map((component, index) => (
                <div key={index}>{component}</div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col border-l border-gray-200">
          <span className="border-b border-gray-200 p-4 text-xl font-semibold">
            Properties
          </span>

          <div className="grid gap-4 overflow-auto p-4">
            <button
              type="button"
              className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
            >
              <span>Draggable</span>
            </button>
            <div>
              <button
                type="button"
                className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
              >
                <span>Resizable</span>
              </button>

              <div>
                <label htmlFor="direction_options">
                  <span>Direction</span>
                </label>
                <ul id="direction_options">
                  <li className="flex justify-between gap-2">
                    <label htmlFor="horizontal">
                      <span>Horizontally</span>
                    </label>
                    <input
                      type="checkbox"
                      name="horizontal"
                      id="horizontal"
                      value="Horizontal"
                    />
                  </li>

                  <li className="flex justify-between gap-2">
                    <label htmlFor="vertical">
                      <span>Vertically</span>
                    </label>
                    <input
                      type="checkbox"
                      name="vertical"
                      id="vertical"
                      value="Vertical"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}
