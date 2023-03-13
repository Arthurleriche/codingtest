// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../../assets/db_types';
import { supabase } from '../../../database/initSupabse';
import { Data } from '../../../types/products.types';

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Creating a supabase client using the environment variables

  // Getting the table name from the environment variables. This is simply your first name
  const table = process.env.FIRST_NAME!;

  // Get relevant data from the database
  const { data, error } = await supabase.from(table).select('*');

  return data
    ? res.status(200).json({ message: 'OK', data })
    : res.status(404).json({ message: `Error during fetch.`, error });
}
