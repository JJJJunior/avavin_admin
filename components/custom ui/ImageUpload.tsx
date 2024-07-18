import {Button} from "@/components/ui/button";
import {Plus, Trash} from "lucide-react";
import Image from "next/image";
import AvaImageServerUpload from "@/components/custom ui/AvaImageServerUpload";
import React from "react";
import {CldUploadWidget} from "next-cloudinary";
import * as cluster from "cluster";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({value, onChange, onRemove}) => {

  //   切换使用云平台图片服务器 CldUploadWidget
  // const onUpload = (result: any) => {
  //     onChange(result.info.secure_url);
  // };

  const onUpload = (url: string) => {
    onChange(url);
  }

  const handleRemoveBtn = (evt: React.MouseEvent<HTMLButtonElement>, url: string) => {
    evt.preventDefault();
    onRemove(url);
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-4">
        {value.length > 0 &&
          value.map((url, index) => (
            <div className="relative w-[200px] h-[200px]" key={index}>
              <div className="absolute top-0 right-0 z-10">
                <Button onClick={(evt) => handleRemoveBtn(evt, url)} size="sm"
                        className="bg-red-1 text-white">
                  <Trash className="h-4 w-4"/>
                </Button>
              </div>
              <Image src={url} alt={"collection"} className="object-cover rounded-lg" width={200}
                     height={200}/>
            </div>
          ))}
      </div>
      {/*  使用自建图片服务器*/}
      <AvaImageServerUpload onUpload={onUpload}></AvaImageServerUpload>
      {/* 切换使用 云平台的图片  CldUploadWidget */}
      {/*<CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} onUpload={onUpload}>*/}
      {/*    {({open}) => {*/}
      {/*        return (*/}
      {/*            <Button type="button" className="bg-grey-1 text-white" onClick={() => open()}>*/}
      {/*                <Plus className="h-4 w-4 mr-2"/>*/}
      {/*                Upload Image*/}
      {/*            </Button>*/}
      {/*        );*/}
      {/*    }}*/}
      {/*</CldUploadWidget>*/}
    </div>
  );
};

export default ImageUpload;
