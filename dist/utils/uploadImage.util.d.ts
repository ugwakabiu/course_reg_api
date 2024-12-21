import { UploadedFile } from 'express-fileupload';
export type UploadFileUtilProps = {
    dir: string;
    fileName: string;
    file: UploadedFile;
};
export type UploadFileUtilReturnProps = {
    error: any;
    errorMessage: string | null;
    filePath: string | null;
    fileName?: string;
    uploaded: boolean;
};
export declare const uploadedImageExt: string;
declare const uploadImageUtil: ({ dir, file, fileName, }: UploadFileUtilProps) => Promise<UploadFileUtilReturnProps>;
export default uploadImageUtil;
