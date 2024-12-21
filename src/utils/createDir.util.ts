import { existsSync, mkdirSync } from 'fs';

export type CreateDirUtilReturnProps = {
  created: boolean;
  error: any;
  alreadyExist?: boolean;
  path: string;
};

const createDirUtil = (dir: string) =>
  new Promise<CreateDirUtilReturnProps>(async (resolve) => {
    try {
      if (!dir) {
        resolve({ created: false, error: true, path: dir });
      }

      const dirExist = await existsSync(dir);

      if (dirExist) {
        resolve({
          created: false,
          error: false,
          alreadyExist: true,
          path: dir,
        });
      }

      await mkdirSync(dir, { recursive: true });
      resolve({ created: true, error: false, alreadyExist: false, path: dir });
    } catch (error) {
      resolve({ created: false, error: error, path: dir });
    }
  });

export default createDirUtil;
