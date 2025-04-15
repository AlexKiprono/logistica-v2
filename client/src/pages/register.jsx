import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Register() {
    const { register_user } = useContext(AuthContext);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();

      register_user(first_name, last_name,email,phone_number, password);
      
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
    };

  return (
    <div>
    <div className="bg-white rounded-lg py-5">
    <div className="h-screen w-screen flex justify-center items-center">
    <div className="grid gap-8">
    <div
        id="back-div"
        class="bg-gradient border rounded-[5px] m-4"
      >
        <div
          class="border-[20px] border-transparent rounded-[6px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
        >
          <h1 class="pt-2 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
            Logistica
          </h1>
          <p class="pt-2 pb-3 text-xl text-center text-gray-400 cursor-default">
            Register as superadmin to continue
          </p>
            <form onSubmit={handleSubmit} method="post" className="space-y-4">

            <div>
              <label htmlFor="first_name" className="mb-2  dark:text-gray-400 text-lg">First Name</label>
              <input
                id="first_name"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Joseph"
                required
              />
            </div>

            <div>
              <label htmlFor="last_name" className="mb-2  dark:text-gray-400 text-lg">Last Name</label>
              <input
                id="last_name"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Langat"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2  dark:text-gray-400 text-lg">Email</label>
              <input
                id="email"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="josephlangat@mail.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="mb-2  dark:text-gray-400 text-lg">Phone Number</label>
              <input
                id="phone_number"
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="phone_number"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
              <input
                id="password"
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                required
              />
            </div>
            <button
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SUBMIT
            </button>
          </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
