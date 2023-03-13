import { ChangeEvent } from 'react';
import styles from '../../styles/Home.module.css';
import FormInput from '../FormInput';

interface Props {
  search: string;
  setSearch: (e: string) => void;
}

const TableHeaderRow = ({ search, setSearch }: Props) => {
  return (
    <tr>
      <th className={styles.th}>ID</th>
      <th className={styles.th}>Organization</th>
      <th className={styles.th}>Name</th>
      <th className={styles.th}>Fit</th>
      <th className={styles.th}>Sizes</th>
      <th className={styles.th}>Gender</th>
      <th className={styles.th}>Product Dimensions</th>
      <th className={styles.th}>
        <FormInput
          inputOptions={{
            value: search,
            name: 'search',
            type: 'text',
            placeholder: 'Search here',
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value),
          }}
        />
      </th>
    </tr>
  );
};

export default TableHeaderRow;
