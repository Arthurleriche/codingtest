import { ChangeEvent } from 'react';

interface Props {
  inputOptions: {
    name: string;
    placeholder: string;
    type: string;
    value: string | number;
    onChange: (e: string[]) => void;
  };
  isRequired?: boolean | undefined;
}

const FormInputArray = ({ inputOptions, isRequired }: Props) => {
  const { value, type, placeholder, onChange } = inputOptions;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    const arrayValue = inputValue.split(',');
    onChange(arrayValue);
  };

  return (
    <>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        required={isRequired}
      />
    </>
  );
};

export default FormInputArray;
