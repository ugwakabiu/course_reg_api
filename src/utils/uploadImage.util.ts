import { UploadedFile } from 'express-fileupload';
import { join as pathJoin } from 'path';
import createDirUtil from './createDir.util';

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

export const uploadedImageExt = process.env.IMAGE_EXT || 'jpg';

const uploadImageUtil = ({
  dir,
  file,
  fileName,
}: UploadFileUtilProps): Promise<UploadFileUtilReturnProps> =>
  new Promise<UploadFileUtilReturnProps>(async (resolve) => {
    try {
      if (!dir) {
        resolve({
          error: null,
          errorMessage: 'upload dir is required',
          uploaded: false,
          filePath: null,
        });
      }

      if (!fileName) {
        resolve({
          error: null,
          errorMessage: 'file name is required',
          uploaded: false,
          filePath: null,
        });
      }

      const name = `${fileName}.${uploadedImageExt}`;

      const filePath = pathJoin(dir, `${name}`);

      const dirCheck = await createDirUtil(dir);

      if (dirCheck.error) {
        resolve({
          error: null,
          errorMessage: null,
          uploaded: false,
          filePath: null,
        });
      }

      await file.mv(filePath, (err) =>
        resolve({
          error: err,
          errorMessage: null,
          uploaded: false,
          filePath: null,
        }),
      );

      resolve({
        error: null,
        errorMessage: null,
        uploaded: true,
        filePath,
        fileName: name,
      });
    } catch (error) {
      resolve({
        error,
        errorMessage: null,
        uploaded: false,
        filePath: null,
      });
    }
  });

export default uploadImageUtil;
