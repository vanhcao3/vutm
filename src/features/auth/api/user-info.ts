import { AUTH_URL } from "@/config";
import { UserInfo } from "@/types";
import axios from "axios";

export async function GetUserInfo(): Promise<UserInfo> {
     const response = await axios.get(`${AUTH_URL}/oauth2/userinfo`, { withCredentials: true });
     return response.data;
}
