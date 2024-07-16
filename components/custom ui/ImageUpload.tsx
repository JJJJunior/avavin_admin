import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, onRemove }) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  const handleRemoveBtn = (evt: React.MouseEvent<HTMLButtonElement>, url: string) => {
    evt.preventDefault();
    onRemove(url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.length > 0 &&
          value.map((url, index) => (
            <div className="relative w-[200px] h-[200px]" key={index}>
              <div className="absolute top-0 right-0 z-10">
                <Button onClick={(evt) => handleRemoveBtn(evt, url)} size="sm" className="bg-red-1 text-white">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image src={url} alt={"collection"} className="object-cover rounded-lg" width={200} height={200} />
            </div>
          ))}
      </div>
      <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" className="bg-grey-1 text-white" onClick={() => open()}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
