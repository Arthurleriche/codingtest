import React, { useState, useEffect } from 'react';
import { Product } from '../../types/products.types';
import styles from '../../styles/Home.module.css';
import TableHeaderRow from './TableHeaderRow';
import FormProductRow from './FormProductRow';
import ProductRow from './ProductRow';

interface Props {
  products: Product[] | undefined;
}

const Table = ({ products }: Props) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>('');
  const [sortProduct, setSortProduct] = useState<Product[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (search) {
      const productFilter = products?.filter((product) => {
        if (
          product.organization.includes(search.toLocaleLowerCase()) ||
          product.name.includes(search.toLocaleLowerCase()) ||
          product.specifications.fit.includes(search.toLocaleLowerCase()) ||
          product.specifications.gender.includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
      });

      return setSortProduct(productFilter);
    }

    setSortProduct(
      products?.sort((b: Product, a: Product) =>
        b.organization.localeCompare(a.organization)
      )
    );
  }, [products, search]);

  const displayData = sortProduct?.map((elem) => {
    return (
      <React.Fragment key={elem.id}>
        {editId === elem.id ? (
          <FormProductRow product={elem} setEditId={setEditId} />
        ) : (
          <ProductRow product={elem} setEditId={setEditId} />
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      <table className={styles.table}>
        <thead>
          <TableHeaderRow setSearch={setSearch} search={search} />
        </thead>
        <tbody>{displayData}</tbody>
      </table>
    </>
  );
};

export default Table;
