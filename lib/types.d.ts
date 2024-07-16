type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

export type ProductType = {
  id: string;
  title: string;
  description: string;
  media: string;
  category: string;
  collections: string;
  tags: string;
  sizes: string;
  colors: string;
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

type UserType = {
  id: string;
  email_address: EmailAddress[];
  first_name: string;
  last_name: string;
  last_sign_in_at: number;
  image_ur: string;
  object: string;
  created_at: number;
};

type EmailAddressType = {
  id: string;
  email_address: string;
  object: string;
  user_id: UserType.id;
};
