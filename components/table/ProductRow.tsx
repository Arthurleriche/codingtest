import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import { Product } from '../../types/products.types';
import Button from '../Button';
import ProductDimensionsTable from './ProductDimensionTable';

interface Props {
  product: Product;
  setEditId: (id: number) => void;
}

const ProductRow = ({ product, setEditId }: Props) => {
  const router = useRouter();
  const { id, organization, name, specifications } = product;
  return (
    <tr key={id}>
      <td className={styles.td}>{id}</td>
      <td className={styles.td}>
        {organization.charAt(0).toUpperCase() + organization.slice(1)}
      </td>
      <td className={styles.td}>{name}</td>
      <td className={styles.td}>{specifications.fit}</td>
      <td className={styles.td}>
        {specifications.sizes.map((size: any, index: number) => (
          <span key={size}>
            {size}
            {index !== specifications.sizes.length - 1 ? ' / ' : ''}
          </span>
        ))}
      </td>
      <td className={styles.td}>{specifications.gender}</td>
      <td className={styles.td}>
        <ProductDimensionsTable
          dimensions={specifications.product_dimensions}
        />
      </td>
      <td className={styles.td}>
        <div className={styles.buttons}>
          <Button action={() => setEditId(id)} styleName="primary">
            Edit Product
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
