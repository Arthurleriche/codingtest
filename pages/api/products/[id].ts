// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../../assets/db_types';
import { supabase } from '../../../database/initSupabse';
import { Product } from '../../../types/products.types';

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse<Product | { error: string }>
) {
  // Getting the table name from the environment variables. This is simply your first name
  const table = process.env.FIRST_NAME!;

  const {
    query: { id },
    body,
    method,
  } = req;

  if (method === 'PUT') {
    const { id, organization, name, specifications } = body;
    const { data, error } = await supabase
      .from(table)
      .update({ organization, name, specifications })
      .eq('id', id)
      .select();

    if (error && !data) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    res.status(200).json(data[0]);
  }
}
