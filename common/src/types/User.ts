import { blog } from "./Blog";

export type user = {
  id: number;
  username: string;
  password: string;
  // description: string;
  name: string | null;
  blogs?: blog[];
};
