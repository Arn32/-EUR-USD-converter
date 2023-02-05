import React from 'react';
import {
  defaultInputFieldClassName,
  disabledInputFieldClassName,
  errorInputFieldClassName
} from './InputField.styled';

const InputField = ({
  required = false,
  type = 'text',
  disabled = false,
  value,
  onChange,
  id,
  placeholder,
  errorMessage,
  label
}) => {
  let className = defaultInputFieldClassName;
  if (disabled) className = disabledInputFieldClassName;
  if (!!errorMessage) className = errorInputFieldClassName;

  return (
    <div className="w-full flex flex-col">
      <label for={id} className="text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={!onChange}
      />
    </div>
  );
};

export default InputField;
