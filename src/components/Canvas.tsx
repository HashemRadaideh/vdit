import { DragEvent, ReactNode, useState } from "react";
import { ArrowUpIcon, LayoutIcon, MoveIcon, ShrinkIcon } from "./Icons";

export const Canvas = () => {
	const [droppedComponents, setDroppedComponents] = useState<any[]>([]);
	const [previewComponent, setPreviewComponent] = useState<ReactNode | null>(null);

	const handleDragOver = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();

		let color = "green";
		const width = 100;
		const height = 50;

		let x = e.clientX - width / 2;
		let y = e.clientY - height / 2;
		const viewport = e.currentTarget.getBoundingClientRect();

		if (x + width >= viewport.right) {
			x = viewport.right - width;
			color = "red";
		} else if (x <= viewport.left) {
			x = viewport.left;
			color = "red";
		}

		if (y + height >= viewport.bottom) {
			y = viewport.bottom - height;
			color = "red";
		} else if (y <= viewport.top) {
			y = viewport.top;
			color = "red";
		}

		setPreviewComponent((
			<div
				style={{
					position: "fixed",
					left: x + "px",
					top: y + "px",
					width: width + "px",
					height: height + "px",
					backgroundColor: color,
				}}
				className="flex items-center justify-center"
			>
				Preview
			</div>
		));
	};

	const handleDrop = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		const componentName = e.dataTransfer.getData("componentName");

		const width = 100;
		const height = 50;

		let x = e.clientX - width / 2;
		let y = e.clientY - height / 2;
		const viewport = e.currentTarget.getBoundingClientRect();

		if (x + width >= viewport.right) {
			x = viewport.right - width;
		} else if (x <= viewport.left) {
			x = viewport.left;
		}

		if (y + height >= viewport.bottom) {
			y = viewport.bottom - height;
		} else if (y <= viewport.top) {
			y = viewport.top;
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
				className="flex items-center justify-center"
			>
				{componentName}
			</div>,
		]);

		setPreviewComponent(null);
	};

	return (
		<div className="flex grow flex-col justify-start p-4 overflow-auto">
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
				{previewComponent}

				{droppedComponents.length === 0 ? (
					<div className="flex h-full w-full flex-col items-center justify-center gap-2">
						<span className="text-2xl font-semibold text-gray-500">
							Drop here
						</span>
					</div>
				) : (
					droppedComponents
				)}
			</div>
		</div>
	);
};
