import { ReactNode } from "react";

interface PropertiesProps {
  children?: ReactNode;
}

export const Properties: React.FC<PropertiesProps> = ({
  children,
}: PropertiesProps) => {
  return (
    <aside className="flex flex-col border-l border-tertiary">
      <div className="h-2/6 w-full p-4 text-xl font-semibold max-2xl:h-1/5">
        {children}
      </div>

      <div className="grid gap-4 overflow-auto border-t border-tertiary p-4">
        <button
          type="button"
          className="flex justify-center gap-2 rounded-lg border border-tertiary p-2"
        >
          <span>Draggable</span>
        </button>
        <div>
          <button
            type="button"
            className="flex justify-center gap-2 rounded-lg border border-tertiary p-2"
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
    </aside>
  );
};
