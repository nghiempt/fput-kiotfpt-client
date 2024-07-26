import Cookie from "js-cookie";

export const checkSignIn = () => {
  const auth = Cookie.get("auth");
  if (auth) {
    return true;
  }
  return false;
}

export const limitString = (str: string, limit: any) => {
  return str.length > limit ? str.slice(0, limit) + "..." : str;
};