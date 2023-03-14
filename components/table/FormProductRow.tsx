import { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '../../types/products.types';
import api from '../../utils/axios';
import Button from '../Button';
import FormProductDimensionsTable from './FormProductDimensionsTable';
import FormInput from '../FormInput';
import FormInputSelect from '../FormInputSelect';
import FormInputArray from '../FormInputArray';
import styles from '../../styles/Home.module.css';

interface Props {
  product: Product;
  setEditId: (id: number | null) => void;
}

const FormProductRow = ({ product, setEditId }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    ...product,
  });

  const { id, organization, name, specifications } = formData;
  const { product_dimensions } = specifications;

  const handleSubmit = useCallback(
    async (data: Product) => {
      try {
        const response = await api.put(`api/products/${id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response) {
          throw new Error('update failed');
        }

        router.replace(router.asPath);
        setEditId(null);
        alert('update success');
      } catch (error) {
        console.error(error);
        alert('update failed');
      }
    },
    [router, setEditId, id]
  );

  return (
    <tr key={id}>
      <td className={styles.td}>{id}</td>

      <td className={styles.td}>
        <FormInput
          inputOptions={{
            name: 'organization',
            placeholder: 'organization',
            type: 'text',
            value: organization,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                organization: e.target.value.toLowerCase(),
              }),
          }}
        />
      </td>

      <td className={styles.td}>
        <FormInput
          inputOptions={{
            name: 'name',
            placeholder: 'name',
            type: 'text',
            value: name,

            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, name: e.target.value.toLowerCase() }),
          }}
        />
      </td>

      <td className={styles.td}>
        <FormInputSelect
          inputOptions={{
            id: 'selectFit',
            name: 'fit',
            value: specifications.fit,
            options: ['fitted', 'semifitted', 'loose'],
            onChange: (value: string) => {
              setFormData({
                ...formData,
                specifications: {
                  ...specifications,
                  fit: value,
                },
              });
            },
          }}
        />
      </td>

      <td className={styles.td}>
        <FormInputArray
          inputOptions={{
            name: 'sizes',
            placeholder: 'sizes',
            type: 'string',
            value: specifications.sizes.join(','),

            onChange: (e: string[]) => {
              setFormData({
                ...formData,
                specifications: {
                  ...specifications,
                  sizes: e,
                },
              });
            },
          }}
        />
      </td>

      <td className={styles.td}>
        <FormInputSelect
          inputOptions={{
            id: 'selectGender',
            name: 'gender',
            value: specifications.gender,
            options: ['unisex', 'female', 'male'],
            onChange: (value: string) => {
              setFormData({
                ...formData,
                specifications: {
                  ...specifications,
                  gender: value,
                },
              });
            },
          }}
        />
      </td>

      <td className={styles.td}>
        <FormProductDimensionsTable
          dimensions={product_dimensions}
          setFormData={setFormData}
        />
      </td>

      <td className={styles.td}>
        <div className={styles.buttons}>
          <Button action={() => handleSubmit(formData)} styleName="success">
            Update
          </Button>
          <Button
            action={() => {
              setFormData(product);
              setEditId(null);
            }}
            styleName="danger"
          >
            Reset
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default FormProductRow;
