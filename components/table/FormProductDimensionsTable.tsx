import { ChangeEvent, useState, useCallback } from 'react';
import { Product, ProductDimension } from '../../types/products.types';
import Button from '../Button';
import FormInput from '../FormInput';
import FormInputArray from '../FormInputArray';
import styles from '../../styles/Home.module.css';

interface Props {
  dimensions: ProductDimension;
  setFormData: (e: any) => void;
}

const ProductDimensionsTable = ({ dimensions, setFormData }: Props) => {
  const [productDimensions, setProductDimensions] = useState(dimensions);

  const removeDimension = useCallback(
    (key: string) => {
      const removeDim = { ...productDimensions };
      delete removeDim[key];
      setProductDimensions(removeDim);
      setFormData((prev: Product) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          product_dimensions: removeDim,
        },
      }));
    },
    [productDimensions, setFormData]
  );

  const handleDeltaChange = useCallback(
    (dimensionName: string, value: number) => {
      setProductDimensions((prev) => ({
        ...prev,
        [dimensionName]: {
          ...prev[dimensionName],
          delta: value,
        },
      }));
      setFormData((prev: Product) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          product_dimensions: {
            ...prev.specifications.product_dimensions,
            [dimensionName]: {
              ...prev.specifications.product_dimensions[dimensionName],
              delta: value,
            },
          },
        },
      }));
    },
    [setFormData]
  );

  const handleDimensionsChange = useCallback(
    (dimensionName: string, value: string[]) => {
      const isNumeric = value.every((str) => !isNaN(Number(str)));
      if (!isNumeric) return;
      setProductDimensions((prev) => ({
        ...prev,
        [dimensionName]: {
          ...prev[dimensionName],
          dimensions: value,
        },
      }));
      setFormData((prev: Product) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          product_dimensions: {
            ...prev.specifications.product_dimensions,
            [dimensionName]: {
              dimensions: value,
              delta:
                prev.specifications.product_dimensions[dimensionName].delta,
            },
          },
        },
      }));
    },
    [setFormData]
  );

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
              <FormInput
                inputOptions={{
                  name: 'name',
                  placeholder: 'name',
                  type: 'number',
                  value: dimension.delta,
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev: Product) => {
                      const { specifications } = prev;
                      const { product_dimensions } = specifications;
                      product_dimensions[dimensionName].delta = parseInt(
                        e.target.value
                      );
                      return { ...prev, specifications };
                    });
                  },
                }}
                isRequired={true}
              />
            </td>

            <td className={(styles.td, styles.dimensionTableTd)}>
              <FormInputArray
                inputOptions={{
                  name: 'sizes',
                  placeholder: 'sizes',
                  type: 'text',
                  value: dimension.dimensions.join(','),
                  onChange: (e: string[]) => {
                    setFormData((prev: Product) => {
                      const { specifications } = prev;
                      const { product_dimensions } = specifications;
                      const isNumeric = e.every((str) => !isNaN(Number(str)));
                      if (!isNumeric) return prev;
                      product_dimensions[dimensionName] = {
                        dimensions: e,
                        delta: dimension.delta,
                      };

                      return { ...prev, specifications };
                    });
                  },
                }}
                isRequired={true}
              />
            </td>

            <Button
              action={() => removeDimension(dimensionName)}
              styleName="danger"
            >
              Remove
            </Button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductDimensionsTable;
