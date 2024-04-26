import { blog } from "./Blog";
import { user } from "./User";

export interface ApiResponse {
  success: boolean;
  message?: string;
  blog?: blog;
  blogs?: blog[];
  user?: user;
  userData?: {
    id: number;
    username: string;
    name: string | null;
    token: string;
  };
  userId?: number;
  blogId?: string;
}
