import { blog } from "./Blog";
import { user } from "./User";

export interface ApiResponse {
    success: boolean;
    message?: string;
    blogs?: blog[];
    user?: user;
}