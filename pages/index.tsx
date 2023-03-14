import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Data } from '../types/products.types';
import Table from '../components/table/Table';
import Button from '../components/Button';
import styles from '../styles/Home.module.css';
import api from '../utils/axios';

interface Props {
  results: Data;
}

const Home = ({ results }: Props) => {
  const router = useRouter();
  const { data, error } = results;

  if (error) {
    return (
      <p>Please reload the page or contact the service for more information</p>
    );
  }

  return (
    <>
      <Head>
        <title>Coding Test by Leriche Arthur</title>
        <meta name="description" content="coding test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Coding Test By Leriche Arthur</p>
        </div>

        <div className={styles.containerTable}>
          <h2>Array of products element 👇</h2>
          <Table products={data} />

          <Button
            styleName="success"
            action={() => router.push('products/new')}
            otherOption={{ className: styles.fatButton }}
          >
            Create new table
          </Button>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await api.get('http://localhost:3000/api/products');
  const results = res.data;

  return {
    props: {
      results,
    },
  };
};

export default Home;
