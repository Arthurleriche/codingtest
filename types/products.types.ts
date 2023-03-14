import { PostgrestError } from '@supabase/supabase-js';

export type ProductDimension = {
  [key in string]: {
    delta: number;
    dimensions: string[];
  };
};

type Specifications = {
  fit: string;
  sizes: Array<string | number>;
  gender: string;
  product_dimensions: ProductDimension;
};

export type Product = {
  id: number;
  organization: string;
  name: string;
  specifications: Specifications;
};

export type NewProduct = {
  id?: number;
  organization: string;
  name: string;
  specifications: Specifications;
};

export type Data = {
  message: string;
  data?: Array<Product>;
  error?: PostgrestError;
};
