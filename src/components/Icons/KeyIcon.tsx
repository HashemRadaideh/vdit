interface KeyIconProps {
  className?: string;
}

export const KeyIcon: React.FC<KeyIconProps> = (props: KeyIconProps) => {
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
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
      {/* millionjs gives an error because of this line*/}
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  );
};
