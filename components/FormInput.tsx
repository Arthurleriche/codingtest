import { ChangeEvent } from 'react';
import styles from '../styles/Home.module.css';

interface Props {
  inputOptions: {
    name: string;
    placeholder: string;
    type: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  isRequired?: boolean;
}

const FormInput = ({ inputOptions, isRequired = false }: Props) => {
  const { name, placeholder, type, value, onChange } = inputOptions;

  return (
    <input
      className={styles.input}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required={isRequired}
    />
  );
};

export default FormInput;
