import { DragEvent, useRef } from "react";
import {
	CreditCardIcon,
	ImageIcon,
	KeyIcon,
	LayoutGridIcon,
	ListIcon,
	TableIcon,
} from "./Icons";

export const Sidebar = ({
	handleAppendGhost,
}: {
	handleAppendGhost: (ghost: HTMLElement | null) => void;
}) => {
	const ghostRef = useRef<HTMLElement>();

	const handleDragStart = (
		e: DragEvent<HTMLElement>,
		componentName: string,
	) => {
		e.dataTransfer.setData("componentName", componentName);

		e.currentTarget.classList.add("bg-primary");
		e.currentTarget.classList.add("text-secondary");

		// const customElement = document.createElement("div");
		// customElement.innerHTML = renderToStaticMarkup(
		// 	<div className="bg-primary text-secondary">{componentName}</div>,
		// );

		// const ghostElement = customElement.firstChild as HTMLElement;
		// document.body.appendChild(ghostElement);

		const ghostElement: HTMLElement = (
			<>
				{componentName}
			</>
		) as unknown as HTMLElement;

		handleAppendGhost(ghostElement);
		ghostRef.current = ghostElement;
		e.dataTransfer.setDragImage(ghostElement, 500, 500);
	};

	const handleDragEnd = (e: DragEvent<HTMLElement>) => {
		e.currentTarget.classList.remove("bg-primary");
		e.currentTarget.classList.remove("text-secondary");
		// handleAppendGhost(null);
		if (ghostRef.current) {
			ghostRef.current.remove();
		}
	};

	return (
		<aside className="flex flex-col border-r border-gray-200">
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
					onDragEnd={handleDragEnd}
					className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
				>
					<KeyIcon className="h-4 w-4" />
					<span className="text-xs">Button</span>
				</div>
				<div
					draggable
					onDragStart={(e): void => handleDragStart(e, "Card")}
					onDragEnd={handleDragEnd}
					className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
				>
					<CreditCardIcon className="h-4 w-4" />
					<span className="text-xs">Card</span>
				</div>
				<div
					draggable
					onDragStart={(e): void => handleDragStart(e, "Image")}
					onDragEnd={handleDragEnd}
					className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
				>
					<ImageIcon className="h-4 w-4" />
					<span className="text-xs">Image</span>
				</div>
				<div
					draggable
					onDragStart={(e): void => handleDragStart(e, "Grid")}
					onDragEnd={handleDragEnd}
					className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
				>
					<LayoutGridIcon className="h-4 w-4" />
					<span className="text-xs">Grid</span>
				</div>
				<div
					draggable
					onDragStart={(e): void => handleDragStart(e, "List")}
					onDragEnd={handleDragEnd}
					className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
				>
					<ListIcon className="h-4 w-4" />
					<span className="text-xs">List</span>
				</div>
				<div
					draggable
					onDragStart={(e): void => handleDragStart(e, "Table")}
					onDragEnd={handleDragEnd}
					className="flex justify-center gap-2 rounded-lg border border-gray-200 p-2"
				>
					<TableIcon className="h-4 w-4" />
					<span className="text-xs">Table</span>
				</div>
			</div>
		</aside>
	);
};
