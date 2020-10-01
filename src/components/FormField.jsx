import React from "react";

export default function FormField({
  type,
  name,
  placeholder,
  value,
  handleSubmit,
  handleChange,
}) {
  return (
    <form onSubmit={(event) => handleSubmit(event, name)}>
      <input
        type={type}
        name={name}
        placeholder={placeholder && placeholder}
        value={value}
        onChange={handleChange}
      />
    </form>
  );
}
