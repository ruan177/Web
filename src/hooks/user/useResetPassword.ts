import useAxios from "../../lib/axios";
import { useEffect, useState } from "react";
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
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();


  const navigate = useNavigate();

  const handleSendCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/send-code', { email });
      setCode(response.data.code);
      setIsCodeSent(true);
      setStep(2);
      setAttempts(1);
      setIsInputDisabled(false);
      setIsResendButtonDisabled(true);
      setTimeLeft(60);
      setTimeout(() => {

      }, 60000);
      setIsLoading(false);
    } catch (error: any) {
      setMessage('Ocorreu um erro, ou o numero de tentativas foi exedido tente novamente mais tarde');
      setIsLoading(false);
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

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsInputDisabled(true);
      setIsResendButtonDisabled(false);
      setIsCodeSent(false);
      setEmail('');
      setMessage('');
    }

  }, [timeLeft]);

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
    timeLeft,
    isLoading,
    
};
}