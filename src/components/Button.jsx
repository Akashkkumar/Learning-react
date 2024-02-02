// ReUsable Button component

function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
      className={` px-3 py-2 font-semibold rounded-md ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
