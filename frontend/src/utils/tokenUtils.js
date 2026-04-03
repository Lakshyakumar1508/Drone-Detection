// Decode JWT token without verification (safe for client-side)
export const decodeToken = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const decoded = JSON.parse(atob(parts[1]));
    return decoded;
  } catch (err) {
    return null;
  }
};

export const isUserAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded = decodeToken(token);
  return decoded?.role === "admin";
};

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.role;
};
