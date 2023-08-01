// ResetPasswordForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { Header } from '../../headers/headerForm';

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

  const navigate = useNavigate();

  const sendCodeQuery = useQuery('sendCode', async () => {
    const response = await axios.post('/send-code', { email });
    return response.data.code;
  });

  const handleSendCode = async () => {
    try {
      const {data} = await sendCodeQuery.refetch();
      setCode(data); // Salvamos o código retornado pelo backend
      setStep(2); // Avança para a etapa de digitar o código
      setAttempts(1); // Inicia a contagem de tentativas de envio
      setIsInputDisabled(false); // Habilita o input para digitar o código
      setIsResendButtonDisabled(true); // Desabilita o botão de reenvio por 1 minuto
      setTimeout(() => {
        setIsResendButtonDisabled(false); // Habilita o botão de reenvio após 1 minuto
      }, 60000); // 1 minuto em milissegundos
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
      setStep(3); // Avança para a etapa de redefinir a senha
      setIsInputDisabled(false); // Habilita o input para digitar a nova senha
    } else {
      setMessage('Código inválido. Tente novamente.');
      setAttempts(attempts + 1); // Incrementa o número de tentativas
      if (attempts >= 5) {
        // Redireciona para a página de login após 5 tentativas inválidas
        setIsInputDisabled(true);
        setIsResendButtonDisabled(true);
        setMessage('Número máximo de tentativas excedido. Você será redirecionado para a página de login.');
        setTimeout(() => {
          navigate('/login');
        }, 4000); // Redireciona após 5 segundos
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      // Adicione a lógica para redefinir a senha aqui
      setMessage('Senha redefinida com sucesso! Redirecionando para a página de login...');
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

  useEffect(() => {
    if (attempts <= 4) {
      setIsInputDisabled(true);
      setIsResendButtonDisabled(true);
      setMessage('Número máximo de tentativas excedido. Aguarde 1 minuto para tentar novamente.');
      setTimeout(() => {
        setIsInputDisabled(false);
        setIsResendButtonDisabled(false);
        setMessage('');
        setAttempts(0);
      }, 60000); // 1 minuto em milissegundos
    }
  }, [attempts]);
  
  return (
    <><Header /><div className="flex items-center justify-center h-screen">
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
                  onChange={(e) => setEmail(e.target.value)} />
                <button
                  className="px-4 py-2 bg-blue-500 text-white"
                  onClick={handleSendCode}
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
    </div></>
  );
};

export default ResetPasswordForm;
