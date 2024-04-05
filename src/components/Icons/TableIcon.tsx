export const TableIcon = (props: { className?: string }) => {
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
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      {/* millionjs gives an error because of this line*/}
      <path d="M12 3v18" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
};
