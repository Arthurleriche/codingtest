import React, { ChangeEvent, useState } from 'react';

interface Props {
  inputOptions: {
    id: string;
    name: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
  };
}

const FormInputSelect = ({ inputOptions }: Props) => {
  const { id, options, value, onChange } = inputOptions;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  const displayOptions = options.map((opt) => {
    return (
      <React.Fragment key={opt}>
        <option value={opt}>{opt}</option>
      </React.Fragment>
    );
  });

  return (
    <>
      <select id={id} value={value} onChange={handleChange}>
        {displayOptions}
      </select>
    </>
  );
};

export default FormInputSelect;
