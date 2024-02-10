import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { Header } from '../../components/headers/headerForm';
import { useResetPassword } from '../../hooks/user/useResetPassword';

const ResetPasswordForm = () => {
  const {
    email,
    setEmail,
    inputCode,
    setInputCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    setStep,
    step,
    isResendButtonDisabled,
    isCodeSent,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    handleCancelOption,
    timeLeft, 
    isLoading,
    setMessage
  } = useResetPassword();

 

  return (
    <>
      <Header textColor={"text-white"} />
      <div className="  bg-[url('/src/assets/login_logo.jpg')] bg-no-repeat bg-cover flex items-center justify-center h-screen">
        <div className="w-2/6  p-8 bg-white shadow-lg rounded-lg">
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
                    disabled={isCodeSent || isResendButtonDisabled || isLoading} // Adiciona a condição isLoading
                  >
                    {isLoading ? (
                      <span className="animate-spin">⚙️</span> // Substitua por um ícone de carregamento real se preferir
                    ) : (
                      <FiMail />
                    )}
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
                    onChange={(e) => setInputCode(e.target.value)}
                    disabled={timeLeft === 0}
                  />

                  <button
                    className="px-4 py-2 bg-blue-500 text-white"
                    onClick={handleVerifyCode}
                  >
                    <FiCheckCircle />
                  </button>
                </div>
                <p className="text-green-600">{timeLeft > 0 ? `Tempo restante: ${timeLeft}s` : `${setStep(1)} 'O tempo acabou!`}</p>
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
