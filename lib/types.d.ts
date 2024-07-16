
type OrderType = {
  id:string
  customerClerkId:string,
  shippingRate: string,
  totalAmount: number,
  createdAt: Date,
  updatedAt: Date,
  customerId:string,
  customer:CustomerType;
  shippingAddress:ShippingAddressType;
  products:ProductType[];
}

type CustomerType={
  id:string,
  name:string,
  email:string,
  createdAt:Date,
  updatedAt:Date
}

type ShippingAddressType= {
  id:string,
  streetNumber:string,
  streetName:string,
  city:string,
  state:string,
  postalCode:number,
  country:string,
  orderId:string
}

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
  productId?:string;
  orderId?:string;
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
