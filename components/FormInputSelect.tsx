import React, { ChangeEvent } from 'react';

interface Props {
  inputOptions: {
    id: string;
    name: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
  };
  isRequired?: boolean;
}

const FormInputSelect = ({ inputOptions, isRequired = false }: Props) => {
  const { id, options, value, onChange } = inputOptions;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select id={id} value={value} onChange={handleChange} required={isRequired}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default FormInputSelect;
