// export const api = {
//    auth: "todo/api/auth",
//    profile: "todo/api/profile",
//    baseUrl: "todo/api",
//    host: "/",
// };

export const api = {
   auth: process.env.REACT_APP_AUTHAPI,
   profile: process.env.REACT_APP_PROFILEAPI,
   baseUrl: process.env.REACT_APP_BASEURL,
};
