"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/products/ProductColumns";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState<[]>([]);
  const router = useRouter();

  const getProducts = async ()=> {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      if (res.status === 200) {
        setProducts(res.data);
      }
    } catch (err) {
      console.log("[products_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log(products);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/dashboard/products/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={products} searchKey="title"/>
    </div>
  );
};

export default ProductsPage;
