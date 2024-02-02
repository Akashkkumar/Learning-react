import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { label, className = "", options, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}

      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-md text-black ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {" "}
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
