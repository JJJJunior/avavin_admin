"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/collections/CollectionColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Loader from "@/components/custom ui/Loader";

const Page = () => {
  const [loading, setLoading] = React.useState(false);
  const [collections, setCollections] = React.useState([]);
  const router = useRouter();

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/collections");
      if (res.status === 200) {
        // console.log(res.data);
        setCollections(res.data);
      }
    } catch (err) {
      console.log("[collections_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/dashboard/collections/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Page;
