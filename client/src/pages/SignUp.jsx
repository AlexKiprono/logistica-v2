import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { signUp } = useContext(AuthContext);
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signUp(first_name, last_name, email, phone_number, password);

            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');

            navigate('auth/login');
        } catch (error) {
            console.error("Sign-up failed: ", error);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    {/* Container with 80% viewport height */}
                    <div className="lg:w-1/2 xl:w-5/12 p-6 my-8 sm:p-12 h-[80vh]">
                        <div className="flex justify-center items-center">
                            <a href="/" className="text-4xl font-semibold text-blue-600">
                                LOGISTICA
                            </a>
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Sign Up
                            </h1>

                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="text"
                                            value={first_name}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="First Name"
                                            aria-label="First Name"
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="text"
                                            value={last_name}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Last Name"
                                            aria-label="Last Name"
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email Address"
                                            aria-label="Email Address"
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="tel"
                                            value={phone_number}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Phone Number"
                                            aria-label="Phone Number"
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            aria-label="Password"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-5 border border-indigo-500 tracking-wide font-semibold bg-indigo-500 text-indigo-400 w-full py-4 rounded-lg hover:bg-indigo-700 hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        >
                                            <svg
                                                className="w-6 h-6 -ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">Sign Up</span>
                                        </button>

                                    </form>

                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by Logistica
                                        <a className="border-b border-gray-500 border-dotted" href="/terms">
                                            Terms of Service
                                        </a>
                                        and its
                                        <a className="border-b border-gray-500 border-dotted" href="/privacy">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex-1 bg-indigo-100 text-center hidden lg:flex"
                        style={{
                            backgroundImage: 'url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
