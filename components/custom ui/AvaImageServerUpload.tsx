"use client"
import React, {useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Image, Upload} from 'antd';
import type {GetProp, UploadFile, UploadProps} from 'antd';
import axios from "axios";
import {Button} from "@/components/ui/button";
import {UploadIcon} from "lucide-react";
import toast from "react-hot-toast";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

type SavedUrl = {
    imageSaveUrl: string | null
    imageUrl: string | null
}

const AvaImageServerUpload = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [showUpload, setShowUpload] = useState(false)
    const [savedUrl, setSavedUrl] = useState<SavedUrl>(null)
    const handleClickOk = async () => {
        setShowUpload(false)
        // console.log(savedUrl)
        // console.log(fileList)
        const newData = fileList.map((item) => ({
            ...item,
            savedUrl,
        }))
        console.log(newData)
        try {
            const res = await axios.post("/api/images", newData)
            if (res.status === 200) {
                toast.success("Image saved success!")
            }
        } catch (err) {
            console.log("[handleClickOk]", err)
        }
    }
    const handleClickCancel = () => {
        setShowUpload(false)
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );

    const uploadImage = options => {
        const {onSuccess, onError, file, onProgress} = options;
        const fmData = new FormData();
        const config = {
            headers: {"content-type": "multipart/form-data"},
            onUploadProgress: event => {
                // console.log((event.loaded / event.total) * 100);
                onProgress({percent: (event.loaded / event.total) * 100}, file);
            }
        };
        fmData.append("image", file);
        axios
            .post(process.env.NEXT_PUBLIC_AVA_IMAGE_SERVER!, fmData, config)
            .then(res => {
                onSuccess(file);
                console.log(res);
                setSavedUrl({
                    imageSaveUrl: res.data.data.image_save_url,
                    imageUrl: res.data.data.image_url,
                })
            })
            .catch(err => {
                const error = new Error('Some error');
                onError({event: error});
            });
    }
    return (
        <div>
            {showUpload && (
                <div className="relative top-20 border rounded-xl shadow-lg">
                    <div className="flex flex-col h-80 p-4 justify-between">
                        <div className="flex flex-col gap-9">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                customRequest={uploadImage}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <div className="flex flex-wrap">
                                {previewImage && (
                                    <Image
                                        width={200}
                                        height={200}
                                        wrapperStyle={{display: 'none'}}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button className="outline hover:bg-black hover:text-white" onClick={handleClickCancel}>
                                Cancel
                            </Button>
                            <Button className="outline hover:bg-black hover:text-white" onClick={handleClickOk}>
                                Ok
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {!showUpload && (
                <button
                    onClick={() => setShowUpload(true)}
                    className="px-6 py-6 border rounded-xl hover:bg-grey-1 hover:text-white"><UploadIcon/>
                </button>
            )}
        </div>
    );
};

export default AvaImageServerUpload;