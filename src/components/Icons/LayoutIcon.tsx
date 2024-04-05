export const LayoutIcon = (props: { className?: string }) => {
	return (
		<svg
			{...props}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="3" x2="21" y1="9" y2="9" />
			<line x1="9" x2="9" y1="21" y2="9" />
			{/* millionjs gives an error because of this line*/}
			<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		</svg>
	);
};
