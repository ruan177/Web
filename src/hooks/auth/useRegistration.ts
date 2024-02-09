import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../lib/axios";
import { toast } from "react-toastify";

export function useRegistration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post("/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Usuario criado com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 4000);
        
      }
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
    setLoading(false); // Finaliza o carregamento
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
    loading, // Adicione esta linha
    handleSubmit,
  };
}