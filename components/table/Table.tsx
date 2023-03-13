import React, { useState, useMemo, useCallback } from 'react';
import { Product } from '../../types/products.types';
import TableHeaderRow from './TableHeaderRow';
import FormProductRow from './FormProductRow';
import ProductRow from './ProductRow';
import styles from '../../styles/Home.module.css';

interface Props {
  products: Product[] | undefined;
}

const Table = ({ products }: Props) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>('');

  const sortedProducts = useMemo(() => {
    if (search) {
      return products?.filter((product) => {
        if (
          product.organization.includes(search.toLocaleLowerCase()) ||
          product.name.includes(search.toLocaleLowerCase()) ||
          product.specifications.fit.includes(search.toLocaleLowerCase()) ||
          product.specifications.gender.includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
      });
    }

    return products?.sort((b: Product, a: Product) =>
      b.organization.localeCompare(a.organization)
    );
  }, [products, search]);

  const setSearchCallback = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const setEditIdCallback = useCallback((id: number | null) => {
    setEditId(id);
  }, []);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <TableHeaderRow setSearch={setSearchCallback} search={search} />
        </thead>
        <tbody>
          {sortedProducts?.map((elem) => (
            <React.Fragment key={elem.id}>
              {editId === elem.id ? (
                <FormProductRow product={elem} setEditId={setEditIdCallback} />
              ) : (
                <ProductRow product={elem} setEditId={setEditIdCallback} />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
