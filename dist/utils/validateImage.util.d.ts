import { UploadedFile } from 'express-fileupload';
export type ValidateImageUtilProps = {
    file: UploadedFile;
    maxSize: string;
};
export declare const convertFileSizeToByte: (size: string) => number;
export type ValidateImageUtilReturnProps = {
    message: string;
    isValid: boolean;
};
export declare const validImageType: string[];
declare const validateImageUtil: ({ file, maxSize, }: ValidateImageUtilProps) => ValidateImageUtilReturnProps;
export default validateImageUtil;
