'use client'
import React, {useEffect, useState} from 'react';
import {CollectionType, ProductType} from "@/lib/types";
import axios from "axios";
import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";
import ProductForm from "@/components/products/ProductForm";

const ProductDetails = ({params}: { params: { productId: string } }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<ProductType | null>(null);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/products/${params.productId}`);
      if (res.status === 200) {
        setProductDetails(res.data);
      }
    } catch (err) {
      console.log("[productId_GET]", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [])
  return loading ? (
    <Loader/>
  ) : (
    <ProductForm initialData={productDetails}/>
  )
};

export default ProductDetails;