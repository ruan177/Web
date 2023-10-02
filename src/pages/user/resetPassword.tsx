import React, { useEffect, useState, useMemo } from 'react';
import { useAxios } from "../../lib/axios";
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { Header } from '../../components/headers/headerForm';

const ResetPasswordForm = () => {
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
  const axios = useAxios();

  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const response = await axios.post('/send-code', { email });
      setCode(response.data.code);
      setIsCodeSent(true); // Indica que o código foi enviado com sucesso
      setStep(2);
      setAttempts(1);
      setIsInputDisabled(false);
      setIsResendButtonDisabled(true);
      setTimeout(() => {
        setIsInputDisabled(true);
        setIsResendButtonDisabled(false);
        setIsCodeSent(false); // Reseta o estado para permitir um novo envio
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
        setIsInputDisabled(true); // Desabilita o input de código temporariamente
        setTimeout(() => {
          setIsInputDisabled(false); // Habilita o input de código após 1 minuto
        }, 60000);
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/reset', 
        {email, inputCode, newPassword}
      )
      if(response.status === 200){
        setMessage('Senha redefinida com sucesso! Redirecionando para a página de login...');
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      }
  
      // Adicione o redirecionamento para a página de login aqui
    } catch (error) {
      setMessage('Ocorreu um erro ao redefinir a senha.');
    }
  };

  const handleCancelOption = () => {
    setMessage(''); // Limpa a mensagem de erro
    if (step === 3) {
      setNewPassword('');
      setConfirmPassword('');
    }
    setStep(step - 1); // Volta para a etapa anterior
  };




  return (
    <>
      <Header textColor={"text-white"} />
      <div className="  bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500 flex items-center justify-center h-screen">
        <div className="p-8 bg-white shadow-lg rounded-lg">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold mb-4">Esqueceu sua senha?</h2>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  E-mail:
                </label>
                <div className="flex border rounded">
                  <input
                    type="email"
                    id="email"
                    className="flex-grow px-4 py-2 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isCodeSent} // Desabilita o input quando o código já foi enviado
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white"
                    onClick={handleSendCode}
                    disabled={isCodeSent || isResendButtonDisabled} // Desabilita o botão de envio quando o código já foi enviado ou após 1 minuto
                  >
                    <FiMail />
                  </button>
                </div>
              </div>
              <p className="text-green-600">{message}</p>
            </>
          ) : step === 2 ? (
            <>
              <h2 className="text-xl font-bold mb-4">Digite o código de redefinição:</h2>
              <div className="mb-4">
                <label htmlFor="code" className="block mb-2">
                  Código:
                </label>
                <div className="flex border rounded">
                  <input
                    type="text"
                    id="code"
                    className="flex-grow px-4 py-2 focus:outline-none"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)} />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white"
                    onClick={handleVerifyCode}
                  >
                    <FiCheckCircle />
                  </button>
                </div>
              </div>
              <p className="text-green-600">{message}</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Redefina sua senha:</h2>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block mb-2">
                  Nova Senha:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="border rounded px-4 py-2 focus:outline-none w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2">
                  Confirmação de Senha:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="border rounded px-4 py-2 focus:outline-none w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white mr-2"
                  onClick={handleCancelOption}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white"
                  onClick={handleResetPassword}
                >
                  Redefinir Senha
                </button>
              </div>
              <p className="text-green-600">{message}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
