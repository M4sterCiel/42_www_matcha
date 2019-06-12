import decode from "jwt-decode";

export default class AuthService {
  getToken() {
    return localStorage.getItem("Token");
  }

  setToken(idToken) {
    localStorage.setItem("Token", idToken);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("Token");
  }

  getProfile() {
    return decode(this.getToken());
  }
}
