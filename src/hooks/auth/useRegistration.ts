import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../lib/axios";

export function useRegistration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const axios = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post("/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}