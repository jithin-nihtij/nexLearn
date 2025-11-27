import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("auth_token");
  Cookies.remove("refresh_token");
  localStorage.clear();
  return;
};
