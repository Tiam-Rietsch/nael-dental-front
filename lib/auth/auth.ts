import { User } from "./type";


export async function getAccessToken() {
  // Retrieve the access token from local storage
  const accessToken = localStorage.getItem("access_token");

  // If no token is found, return null
  if (!accessToken) {
    return null;
  }

  // Return the access token
  return accessToken;
}

export async function getUser() {
    // Retrieve the user data from local storage
    const userJson = localStorage.getItem("user");
    
    // If no user data is found, return null
    if (!userJson) {
        return null;
    }
    
    // Parse and return the user data
    const user: User = JSON.parse(userJson);
    return user;    
}

export async function  getRefreshToken() {
  // Retrieve the refresh token from local storage
  const refreshToken = localStorage.getItem("refresh_token");

  // If no token is found, return null
  if (!refreshToken) {
    return null;
  }

  // Return the refresh token
  return refreshToken;
}

export async function setAuthData(accessToken: string, refreshToken: string) {
  // Store the access token, refresh token, and user data in local storage
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export async function setUserData(user: User) {
  // Store the user data in local storage
  localStorage.setItem("user", JSON.stringify(user));
}

export async function clearAuthData() {
  // Clear all authentication-related data from local storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
}