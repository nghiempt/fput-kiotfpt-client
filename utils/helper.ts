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

export const getTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export const getDate = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}