import React from 'react';

interface Props {
  name: string;
}

const FormLabel = ({ name }: Props) => {
  return <label>{name}</label>;
};
export default FormLabel;
