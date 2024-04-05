export const ArrowUpIcon = (props: { className?: string }) => {
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
			<path d="m5 12 7-7 7 7" />
			<path d="M12 19V5" />
		</svg>
	);
};
