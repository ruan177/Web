import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../lib/axios";
import { useAuth } from "../../context/loginContext";

export function useAuthentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { changeLoggedIn } = useAuth();
  const axios = useAxios();

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh.id);
        localStorage.setItem("user", response.data.refresh.user_id);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;

        changeLoggedIn(true);
        navigate("/");
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}

