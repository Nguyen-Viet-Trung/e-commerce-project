import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [username, setUsername] = useState("Username");
  const [loginState, setLoginState] = useState(false);
  const [accessToken, setAccessToken] = useState(null); // Lưu access token
  const [refreshToken, setRefreshToken] = useState(null); // Lưu refresh token
  const navigate = useNavigate();

  // Khởi tạo axios instance với interceptor
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
  });
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = accessToken || localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Định dạng JWT Bearer Token
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && refreshToken) {
        try {
          const { data } = await axios.post(
            "http://localhost:8080/api/users/refresh",
            { refreshToken: localStorage.getItem("refreshToken") }
          );
          setAccessToken(data.accessToken);
          localStorage.setItem("accessToken", data.accessToken);
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance.request(error.config); // Gửi lại request
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          logout(); // Đăng xuất nếu refresh token thất bại
        }
      }
      return Promise.reject(error);
    }
  );

  // Kiểm tra trạng thái đăng nhập khi component được mount

  // Khi login thành công, lưu thông tin vào localStorage
  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setUsername(username);
        setLoginState(true);
        console.log(accessToken, refreshToken);
        // Lưu thông tin vào localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("username", username);

        navigate("/");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data || error.message || error
      );
      alert("Login failed. Please check your username and password.");
    }
  };
  useEffect(() => {
    console.log("Access Token updated:", accessToken);
    console.log("Refresh Token updated:", refreshToken);
  }, [accessToken, refreshToken]);

  // Khi khởi tạo ứng dụng, khôi phục trạng thái từ localStorage
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUsername = localStorage.getItem("username");

    if (storedAccessToken && storedRefreshToken && storedUsername) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUsername(storedUsername);
      setLoginState(true);
    }
  }, []);

  // Khi logout, xóa thông tin trong localStorage
  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/logout", {
        refreshToken,
      });
      setAccessToken(null);
      setRefreshToken(null);
      setUsername("Username");
      setLoginState(false);

      // Xóa thông tin trong localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const LoginData = {
    username,
    loginState,
    login,
    logout,
    accessToken,
    refreshToken,
  };

  return (
    <LogInContext.Provider
      value={{ LoginData, setRefreshToken, setAccessToken, axiosInstance }}
    >
      {children}
    </LogInContext.Provider>
  );
}

export default LogInContext;
