import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/axios';

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.put(`api/products/${id}`);
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (!user) return <p>Null</p>;

  return <div>ok</div>;
};

export default Product;
