'use client'
import React, {useState} from 'react';
import {Trash} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast";
import axios from "axios";

interface DeleteProps {
  id: string
  item: string
}

const Delete: React.FC<DeleteProps> = ({id, item}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const onDelete = async () => {
    const itemType = item === "product" ? "products" : "collections"
    try {
      setLoading(true)
      const res = await axios.delete(`/api/${itemType}/${id}`)
      if (res.status === 200) {
        window.location.href = (`/dashboard/${itemType}`);
        toast.success(`${item} deleted!`)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="bg-red-1 p-2 rounded-lg text-white hover:bg-red-400">
          <Trash className="h-4 w-4"/>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;