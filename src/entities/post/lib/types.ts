export type TDtoAddPost = {
  body: number;
  title: Blob;
  password?: string
  confirm: boolean
};
export interface IPostItem {
  id: number;
  title: string;
  description: string;
}
