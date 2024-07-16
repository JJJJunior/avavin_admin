"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Delete from "@/components/custom ui/Delete";
import { CollectionType } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string().url({
    message: "At least one image",
  }),
});

interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
  }
};

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData ? `/api/collections/${initialData.id}` : "/api/collections";
      const res = await axios.post(url, values);
      if (res.status === 200) {
        setLoading(false);
        toast.success(`Collection ${initialData ? "updated" : "created"} successfully!`);
        window.location.href = "/dashboard/collections";
      }
    } catch (err) {
      setLoading(false);
      console.log("[collections_POST]", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete id={initialData.id} item={"collection"} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Collection</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} rows={5} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white" disabled={loading}>
              Submit
            </Button>
            <Button
              type="button"
              className="bg-blue-1 text-white"
              onClick={() => router.push("/dashboard/collections")}
            >
              DisCard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
