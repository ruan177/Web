import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const useResetPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);


  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/send-code', { email });
      setCode(response.data.code);
      setIsCodeSent(true);
      setStep(2);
      setAttempts(1);
      setIsInputDisabled(false);
      setIsResendButtonDisabled(true);
      setTimeout(() => {
        setIsInputDisabled(true);
        setIsResendButtonDisabled(false);
        setIsCodeSent(false);
        setEmail('');
        setMessage('');
      }, 60000);
    } catch (error) {
      setMessage('Ocorreu um erro ao enviar o código de redefinição de senha.');
    }
  };

  const handleVerifyCode = () => {
    if (code === '') {
      setMessage('Você precisa enviar o código primeiro.');
      return;
    }

    if (code === inputCode) {
      setMessage('Código válido! Digite a nova senha:');
      setStep(3);
      setIsInputDisabled(false);
    } else {
      setMessage('Código inválido. Tente novamente.');
      setAttempts(attempts + 1);
      if (attempts >= 5) {
        setIsInputDisabled(true);
        setIsResendButtonDisabled(true);
        setMessage('Número máximo de tentativas excedido. Você será redirecionado para a página de login.');
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      } else {
        setIsInputDisabled(true);
        setTimeout(() => {
          setIsInputDisabled(false);
        }, 60000);
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/reset', { email, inputCode, newPassword });
      if (response.status === 200) {
        setMessage('Senha redefinida com sucesso! Redirecionando para a página de login...');
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      }
    } catch (error) {
      setMessage('Ocorreu um erro ao redefinir a senha.');
    }
  };

  const handleCancelOption = () => {
    setMessage('');
    if (step === 3) {
      setNewPassword('');
      setConfirmPassword('');
    }
    setStep(step - 1);
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    inputCode,
    setInputCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    setMessage,
    step,
    setStep,
    isInputDisabled,
    isResendButtonDisabled,
    isCodeSent,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    handleCancelOption,
  };
};
