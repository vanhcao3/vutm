import { AUTH_URL } from "@/config";
import axios from "axios";

export async function CheckAuth() {
     const response = await axios.get(`${AUTH_URL}/oauth2/auth`, { withCredentials: true });
     return response.status;
}
