import { env } from "@/env";

export const imageUploadToCloudinary = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        return data.secure_url || null;
    } catch (error: any) {
        console.log('error from cloudinary upload', error?.message);
        return null;
    }
}