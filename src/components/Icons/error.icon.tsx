const ErrorIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z"
      stroke="#EF4444" // Bright red for error
      strokeWidth="2"
    />
    <path
      d="M16 12V16"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 20H16.01"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default ErrorIcon;
