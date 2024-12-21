export type CreateDirUtilReturnProps = {
    created: boolean;
    error: any;
    alreadyExist?: boolean;
    path: string;
};
declare const createDirUtil: (dir: string) => Promise<CreateDirUtilReturnProps>;
export default createDirUtil;
