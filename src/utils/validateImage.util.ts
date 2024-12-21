import { UploadedFile } from 'express-fileupload';

export type ValidateImageUtilProps = {
  file: UploadedFile;
  maxSize: string;
};

export const convertFileSizeToByte = (size: string): number => {
  const actualSize = +size.substring(0, size.length - 2);
  const format = size.substring(size.length - 2, size.length);

  if (format.toLowerCase() == 'kb') {
    return actualSize * 1024;
  }
  if (format.toLowerCase() == 'mb') {
    return actualSize * 1024 * 1024;
  }
  if (format.toLowerCase() == 'gb') {
    return actualSize * 1024 * 1024 * 1024;
  }

  return +size;
};

export type ValidateImageUtilReturnProps = {
  message: string;
  isValid: boolean;
};

export const validImageType = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];

const validateImageUtil = ({
  file,
  maxSize,
}: ValidateImageUtilProps): ValidateImageUtilReturnProps => {
  const maxSizeInByte = convertFileSizeToByte(maxSize);

  if (!validImageType.includes(file.mimetype.toLowerCase())) {
    return {
      isValid: false,
      message: `invalid image format`,
    };
  }

  if (file.size > maxSizeInByte) {
    return {
      isValid: false,
      message: `maximum image size should be [${maxSize}]`,
    };
  }

  return { isValid: true, message: 'success' };
};

export default validateImageUtil;
