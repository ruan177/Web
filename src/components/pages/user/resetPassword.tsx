// ResetPasswordForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { FiMail, FiCheckCircle } from 'react-icons/fi';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    try {
      const response = await axios.post('/send-code', { email });
      setMessage(response.data.message);
      setStep(2); // Avança para a etapa de digitar o código
    } catch (error) {
      setMessage('Ocorreu um erro ao enviar o código de redefinição de senha.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('/verify-code', { email, code });
      if (response.data.valid) {
        setMessage('Código válido! Digite a nova senha:');
        setStep(3); // Avança para a etapa de redefinir a senha
      } else {
        setMessage('Código inválido. Tente novamente.');
      }
    } catch (error) {
      setMessage('Ocorreu um erro ao verificar o código.');
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

  return (
    <div className="flex items-center justify-center h-screen">
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
                />
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
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
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
                onChange={(e) => setNewPassword(e.target.value)}
              />
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
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
  );
};

export default ResetPasswordForm;
