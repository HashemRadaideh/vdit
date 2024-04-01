import { DragEvent } from "react";
import {
	CreditCardIcon,
	ImageIcon,
	KeyIcon,
	LayoutGridIcon, ListIcon, TableIcon
} from "./Icons";

export const Sidebar = () => {
	const handleDragStart = (
		e: DragEvent<HTMLDivElement>,
		componentName: string,
	) => {
		e.dataTransfer.setData("componentName", componentName);
	};


	return (
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
	);
}
