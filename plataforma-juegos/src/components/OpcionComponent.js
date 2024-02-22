import React from 'react';

function OptionComponent({ value, label, selected }) {
  return (
    <option value={value} selected={selected}>
      {label}
    </option>
  );
}

export default OptionComponent;