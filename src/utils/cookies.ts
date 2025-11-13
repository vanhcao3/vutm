import Cookies from "universal-cookie";

const cookies = new Cookies();
const cookie = {
     getToken: () => {
          return cookies.get("access_token");
     },
     setToken: (token: string) => {
          const expires = new Date();
          expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
          cookies.set("access_token", token, {
               expires: expires,
               path: "/",
               secure: false,
          });
     },
     clearToken: () => {
          const expires = new Date();
          expires.setTime(expires.getTime() - 1000);
          cookies.set("access_token", "", {
               expires: expires,
               path: "/",
               secure: false,
          });
     },
};

export default cookie;
