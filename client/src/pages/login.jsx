import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Login() {
  const server_url = 'http://localhost:5000';
  const { login_user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [resetLoading, setResetLoading] = useState(false);  
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
  
    login_user(email, password)
      .then((res) => {
        if (res?.role) {
          if (res.role === "superadmin") {
            navigate("/superadmin/dashboard");
          } else if (res.role === "companyadmin") {
            navigate("/companyadmin/dashboard");
          } else if (res.role === "stationadmin") {
            navigate("/stationadmin/dashboard");
          } else if (res.role === "driver") {
            navigate("/driver/dashboard");
          } else {
            navigate("/dashboard");
          }
        }
        setEmail("");
        setPassword("");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function handleForgotPasswordSubmit(e) {
    e.preventDefault();
    setResetLoading(true); 

    fetch(`${server_url}/request-reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: forgotPasswordEmail }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(text => {
            try {
              const data = JSON.parse(text);
              throw new Error(data.error || 'Failed to send reset email');
            } catch {
              throw new Error('Failed to send reset email');
            }
          });
        }
      })
      .then(data => {
        setForgotPasswordSuccess(true);
        setResetLoading(false); 
      })
      .catch(error => {
        setForgotPasswordError(error.message);
        setResetLoading(false); 
      })
      .finally(() => {
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      });
  }

    React.useEffect(() => {
      const redirectUrl = localStorage.getItem('redirect_after_login') || '/'; 
      if (redirectUrl !== '/') {
        localStorage.removeItem('redirect_after_login');
      }
    }, [navigate]);
    
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">

      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 max-w-md">
      <h1>
        <a href="/" className="flex items-center font-medium text-gray-900">
          <span className="mx-auto text-3xl font-green leading-none text-green-500 select-none">
            LOGISTICA<span className="text-green-500">.</span>
          </span>
        </a>
      </h1>
      <br />
        <h1 className="text-2xl font-bold text-black text-center mb-6">Log in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-700 text-sm">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <FiMail className="text-gray-400 ml-3" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-gray-900 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-700 text-sm">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <FiLock className="text-gray-400 ml-3" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-gray-900 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <a
              href="#"
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg- to-gray-600 text-blue font-medium py-2 rounded-lg flex justify-center items-center space-x-2"
          >
            <span>LOG IN</span>
            <AiOutlineArrowRight />
          </button>
        </form>

        {/* Modal for Forgot Password */}
        {showForgotPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Reset Password</h2>
              <form onSubmit={handleForgotPasswordSubmit}>
                <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your email
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                  placeholder="your@email.com"
                  required
                />
                <div className="flex space-x-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-saffron-500 text-white py-2 rounded-lg"
                  >
                    Send Reset Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {forgotPasswordSuccess && (
          <p className="text-green-500 mt-2 text-sm">Password reset email sent successfully!</p>
        )}
        {forgotPasswordError && (
          <p className="text-red-600 mt-2 text-sm">{forgotPasswordError}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
