import { ChangeEvent } from 'react';
import styles from '../styles/Home.module.css';

interface Props {
  inputOptions: {
    name: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
}

const FormInput = ({ inputOptions }: Props) => {
  return <input {...inputOptions} className={styles.input} />;
};

export default FormInput;
