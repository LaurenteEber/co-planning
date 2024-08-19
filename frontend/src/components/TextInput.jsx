import React from "react";

export const TextInput = React.forwardRef(({ label, name, ...rest }, ref) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />
    </div>
  );
})

TextInput.displayName = "TextInput";