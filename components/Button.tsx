import React from 'react';

interface Props {
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styleName: 'danger' | 'success' | 'primary';
  children: React.ReactNode;
  otherOption?: object;
}

const Button = ({ styleName, action, children, otherOption }: Props) => {
  const styles = {
    danger: {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: 3,
      cursor: 'pointer',
    },
    success: {
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      padding: 3,
      cursor: 'pointer',
    },
    primary: {
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      padding: 3,
      cursor: 'pointer',
    },
  };

  return (
    <button onClick={action} style={styles[styleName]} {...otherOption}>
      {children}
    </button>
  );
};

export default Button;
