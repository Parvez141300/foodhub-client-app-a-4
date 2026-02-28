"use client";

import { Camera } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUpload, FileUploadTrigger } from "@/components/ui/file-upload";
import { Button } from "./ui/button";

export const title = "Avatar Upload";

type FileUploadInputFieldType = {
  onImageChage?: (files: File[]) => void;
  existingImage?: string | null;
  disabled?: boolean;
};

const FileUploadInputField = ({
  onImageChage,
  existingImage = "https://github.com/shadcn.png",
  disabled = false,
}: FileUploadInputFieldType) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const avatarPreview =
    files.length > 0 ? URL.createObjectURL(files[0]) : existingImage;

  const handleFileChange = (newFile: File[]) => {
    setFiles(newFile);
    if (onImageChage) {
      onImageChage(newFile);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <FileUpload
        value={files}
        onValueChange={handleFileChange}
        accept="image/*"
        maxFiles={1}
        maxSize={2 * 1024 * 1024}
        disabled={!disabled}
      >
        <FileUploadTrigger asChild>
          <button
            className="group relative cursor-pointer rounded-full"
            disabled={!disabled}
          >
            <Avatar className="size-24">
              <AvatarImage src={avatarPreview!} alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="size-6 text-white" />
            </div>
          </button>
        </FileUploadTrigger>
      </FileUpload>
      <Button type="reset" onClick={() => setFiles([])}>Reset</Button>
      {!disabled && (
        <p className="text-sm text-muted-foreground text-center">
          Click to change avatar By <br /> clicking the Edit button
        </p>
      )}
    </div>
  );
};

export default FileUploadInputField;
