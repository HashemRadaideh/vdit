import { DragEvent, useEffect, useState } from "react";
import {
	ArrowUpIcon,
	LayoutIcon,
	MoveIcon,
	ShrinkIcon
} from "./Icons";

export const Canvas = () => {
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
	);
}
