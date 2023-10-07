import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useRegistration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/register", {
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