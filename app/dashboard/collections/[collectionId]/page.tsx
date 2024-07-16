"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";
import { CollectionType } from "@/lib/types";

const CollectionDetails = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/collections/${params.collectionId}`);
      if (res.status === 200) {
        setCollectionDetails(res.data);
      }
    } catch (err) {
      console.log("[collectionId_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);
  return loading ? <Loader /> : <CollectionForm initialData={collectionDetails} />;
};

export default CollectionDetails;
