import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { NewProduct } from '../../types/products.types';
import api from '../../utils/axios';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import FormInputArray from '../../components/FormInputArray';
import FormInputSelect from '../../components/FormInputSelect';
import FormLabel from '../../components/FormLabel';
import FormProductDimensionsTable from '../../components/table/FormProductDimensionsTable';
import styles from '../../styles/Home.module.css';

const New = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<NewProduct>({
    organization: '',
    name: '',
    specifications: {
      fit: '',
      sizes: [],
      gender: '',
      product_dimensions: {},
    },
  });

  const { organization, name, specifications } = formData;
  const { product_dimensions } = specifications;

  const getLastKey = (object: any) => {
    const keys = Object.keys(object);
    return keys[keys.length - 1];
  };

  const addNewDimension = (dim: string) => {
    const { product_dimensions } = specifications;
    if (Object.keys(product_dimensions).includes(dim)) return;
    const dimObject: any = { ...product_dimensions };
    dimObject[dim] = { delta: 0, dimensions: [] };
    setFormData({
      ...formData,
      specifications: { ...specifications, product_dimensions: dimObject },
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: NewProduct
  ) => {
    e.preventDefault();
    const response = await api.post('api/products/create', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) throw new Error('update failed');

    router.push('/');

    return alert('update success');
  };

  return (
    <>
      <main className={styles.main}>
        <h1>👇 Create a new Product 👇</h1>
        <Button styleName="primary" action={() => router.push('/')}>
          Go back
        </Button>
        <form
          className={styles.form}
          onSubmit={(e) => handleSubmit(e, formData)}
        >
          <div className={styles.formInputLabel}>
            <FormLabel name="Organization" />
            <FormInput
              inputOptions={{
                name: 'organization',
                placeholder: 'Organization',
                type: 'text',
                value: organization,

                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, organization: e.target.value }),
              }}
              isRequired={true}
            />
          </div>
          <div className={styles.formInputLabel}>
            <FormLabel name="Name" />
            <FormInput
              inputOptions={{
                name: 'name',
                placeholder: 'Name',
                type: 'text',
                value: name,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, name: e.target.value }),
              }}
              isRequired={true}
            />
          </div>
          <div className={styles.formInputLabel}>
            <FormLabel name="Fit" />
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
              isRequired={true}
            />
          </div>
          <div className={styles.formInputLabel}>
            <FormLabel name="Sizes available (number or letter separate by comma)" />
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
              isRequired={true}
            />
          </div>
          <div className={styles.formInputLabel}>
            <FormLabel name="Gender" />
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
              isRequired={true}
            />
          </div>
          <div className={styles.formInputLabel}>
            <FormLabel name="Dimensions" />
            <FormLabel name="Part of body" />
            <FormInputSelect
              inputOptions={{
                id: 'dimensions',
                name: 'dimensions',
                value: getLastKey(product_dimensions),
                options: [
                  'chest',
                  'waist',
                  'pelvis',
                  'hips',
                  'arm_length',
                  'shoulder_length',
                ],
                onChange: (value: string) => {
                  addNewDimension(value);
                },
              }}
              isRequired={true}
            />
          </div>

          {Object.keys(product_dimensions).length > 0 && (
            <div className={styles.formInputLabel}>
              <FormProductDimensionsTable
                dimensions={product_dimensions}
                setFormData={setFormData}
              />
            </div>
          )}

          <Button
            styleName="success"
            otherOption={{ type: 'submit', className: styles.fatButton }}
          >
            Create
          </Button>
        </form>
      </main>
    </>
  );
};

export default New;
