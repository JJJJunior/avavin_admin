"use client";
import React, {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import ImageUpload from "@/components/custom ui/ImageUpload";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Delete from "@/components/custom ui/Delete";
import MultiText from "@/components/custom ui/MultiText";
import MultiSelect from "@/components/custom ui/MultiSelect";
import {CollectionType, ProductType} from "@/lib/types";
import Loader from "@/components/custom ui/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000).trim(),
  media: z
    .array(z.string())
    .min(1, {
      message: "At least one image",
    })
    .max(8, {
      message: "Maximum of 8 images allowed",
    }),
  category: z.string().min(2).max(20),
  collections: z.array(z.string()),
  status: z.string(),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
  }
};

const ProductForm: React.FC<ProductFormProps> = ({initialData}) => {
  //处理initialData 切换成mysql数据库后，media、tags、sizes、colors 都是数组转成字符串保存数据库,collections是对象，转成id

  let existingData: {
    productId?: string;
    orderId?: string;
    description: string;
    media: string[];
    title: string;
    status: string;
    expense: number;
    colors: string[];
    tags: string[];
    createdAt: Date;
    sizes: string[];
    collections: any;
    price: number;
    id: string;
    category: string;
    updatedAt: Date
  };

  if (initialData) {
    existingData = {
      ...initialData,
      media: initialData.media.split(","),
      collections: initialData.collections.map((item) => item.collectionId),
      tags: initialData.tags.split(",").filter(item => item !== ""),
      sizes: initialData.sizes.split(",").filter(item => item !== ""),
      colors: initialData.colors.split(",").filter(item => item !== "")
    };
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: existingData
      ? existingData
      : {
        title: "",
        description: "",
        media: [],
        category: "",
        status: "",
        collections: [],
        tags: [],
        sizes: [],
        colors: [],
        price: 0.1,
        expense: 0.1,
      },
  });

  // console.log(initialData);

  // console.log({
  //   ...initialData,
  //   collections: initialData?.collections.map((collection) => collection.id),
  // });

  const [loading, setLoading] = useState<boolean>(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      const res = await axios.get("/api/collections/");
      if (res.status === 200) {
        setCollections(res.data);
      }
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const router = useRouter();
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("[collections_POST]", values);
    //这里需要将数组转成字符串保存在数据库中
    const data = {
      ...values,
      media: values.media.join(","),
      tags: values.tags.join(","),
      sizes: values.sizes.join(","),
      colors: values.colors.join(","),
    };
    console.log("onSubmit", data);
    try {
      setLoading(true);
      const url = existingData ? `/api/products/${existingData.id}` : "/api/products";
      const res = await axios.post(url, data);
      if (res.status === 200) {
        setLoading(false);
        toast.success(`Product ${existingData ? "updated" : "created"} successfully!`);
        window.location.href = "/dashboard/products";
      }
    } catch (err) {
      setLoading(false);
      console.log("[products_POST]", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  };

  return loading ? (
    <Loader/>
  ) : (
    <div className="p-10">
      {existingData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          <Delete id={existingData.id} item={"product"}/>
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7"/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} onKeyDown={handleKeyPress}/>
                </FormControl>
                <FormMessage className="text-red-1"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({field}) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(status) => field.onChange(status)}
                    value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status"/>
                    </SelectTrigger>
                    <SelectContent className="bg-grey-1 text-white">
                      <SelectItem value="published" className="cursor-pointer">Published</SelectItem>
                      <SelectItem value="draft" className="cursor-pointer">Draft</SelectItem>
                      <SelectItem value="archived" className="cursor-pointer">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-1"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} rows={5} onKeyDown={handleKeyPress}/>
                </FormControl>
                <FormMessage className="text-red-1"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({field}) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) => field.onChange([...field.value.filter((image) => image !== url)])}
                  />
                </FormControl>
                <FormMessage className="text-red-1"/>
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} onKeyDown={handleKeyPress}/>
                  </FormControl>
                  <FormMessage className="text-red-1"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Expense ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Expense" {...field} onKeyDown={handleKeyPress}/>
                  </FormControl>
                  <FormMessage className="text-red-1"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} onKeyDown={handleKeyPress}/>
                  </FormControl>
                  <FormMessage className="text-red-1"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagToRemove) => field.onChange([...field.value.filter((tag) => tag !== tagToRemove)])}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1"/>
                </FormItem>
              )}
            />
            {collections.length > 0 && (
              <FormField
                control={form.control}
                name="collections"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Collections</FormLabel>
                    <FormControl>
                      <MultiSelect
                        collections={collections}
                        placeholder="Search Collections"
                        value={field.value}
                        onChange={(id) => field.onChange([...field.value, id])}
                        onRemove={(idToRemove) =>
                          field.onChange([...field.value.filter((collectionId) => collectionId !== idToRemove)])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1"/>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="colors"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Colors"
                      value={field.value}
                      onChange={(color) => field.onChange([...field.value, color])}
                      onRemove={(colorToRemove) =>
                        field.onChange([...field.value.filter((color) => color !== colorToRemove)])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Sizes"
                      value={field.value}
                      onChange={(size) => field.onChange([...field.value, size])}
                      onRemove={(sizeToRemove) =>
                        field.onChange([...field.value.filter((size) => size !== sizeToRemove)])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1"/>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white" disabled={loading}>
              Submit
            </Button>
            <Button type="button" className="bg-blue-1 text-white" onClick={() => router.push("/dashboard/products")}>
              DisCard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
