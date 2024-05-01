import { user } from "./User";

export type blog = {
  id: string;
  authorId: number;
  title: string;
  content: string;
  published: boolean | false;
  publishedDate?: Date;
  author?: {
    name?: user["name"],
    id?: user["id"],
    description?: user["description"]
  }
};
