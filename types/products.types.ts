import { PostgrestError } from '@supabase/supabase-js';

export type ProductDimension = {
  [key in
    | 'chest'
    | 'waist'
    | 'pelvis'
    | 'hips'
    | 'arm_length'
    | 'shoulder_length']: {
    delta: number;
    dimensions: number[];
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

export type Data = {
  message: string;
  data?: Array<Product>;
  error?: PostgrestError;
};
