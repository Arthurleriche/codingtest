import { ProductDimension } from '../../types/products.types';
import styles from '../../styles/Home.module.css';

interface Props {
  dimensions: ProductDimension;
}

const ProductDimensionsTable = ({ dimensions }: Props) => {
  return (
    <table className={styles.dimensionTable}>
      <thead>
        <tr>
          <th className={styles.dimensionTableTheadTh}>Body</th>
          <th className={styles.dimensionTableTheadTh}>Delta</th>
          <th className={styles.dimensionTableTheadTh}>Dimensions available</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(dimensions).map(([dimensionName, dimension]) => (
          <tr className={styles.dimensionTableTr} key={dimensionName}>
            <td className={(styles.td, styles.dimensionTableTd)}>
              {dimensionName}
            </td>

            <td className={(styles.td, styles.dimensionTableTd)}>
              {dimension.delta}
            </td>

            <td className={(styles.td, styles.dimensionTableTd)}>
              {dimension.dimensions.map((size, index) => (
                <span key={index}>
                  {size}
                  {index !== dimension.dimensions.length - 1 ? ' / ' : ''}{' '}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductDimensionsTable;
