import React, { useState,useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SuperAdminContext } from '../context/SuperAdminContext';


const Sidenav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { add_company } = useContext(SuperAdminContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('')
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  
    add_company(email, name, phone_number, address, first_name, last_name, password);
 
    setEmail('');
    setName('');
    setPhoneNumber('');
    setAddress('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div>
      <aside
        className="fixed inset-y-0 flex-wrap items-center border border-indigo-100 justify-between block w-full p-0 my-4 overflow-y-auto transition-transform duration-200 bg-white shadow-xl max-w-64 xl:ml-6 rounded-2xl xl:left-0"
        role="navigation"
      >

        {/* Header with logo */}
        <div className="h-19">
          <NavLink to="/" className="block px-8 py-6">
            <span className="ml-1 font-semibold text-slate-700 dark:text-white">MATATU</span>
          </NavLink>
        </div>
        <hr className="my-2 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:via-white" />

        {/* Navigation Menu */}
        <div className="items-center block max-h-screen overflow-auto grow">
          <ul className="flex flex-col pl-0 mb-0">
            {/* Dashboard Menu with Dropdown */}
            <div className="dashboard">
            <div className="flex items-center font-semibold justify-center w-full">
                <MenuItem to="/superadmin/dashboard" iconClass="ni ni-tv-2" text="Dashboard" />

              </div>

                <div className="px-4 pb-4">
                  <ul className="flex flex-col cursor-pointer gap-4 pl-2 mt-4">
                    <li className="flex gap-2 hover:bg-indigo-200 p-3 border round-l">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"/>
                      </svg>
                      <a onClick={toggleModal}>Add Company</a>
                    </li>
                    <li className="flex gap-2 hover:bg-indigo-200 p-3 border round-l">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        ></path>
                      </svg>
                      <Link to="/auth/register">Add Superadmin</Link>
                    </li>
                    {/* Additional items can go here */}
                  </ul>
                </div>

            </div>
          </ul>
        </div>
      </aside>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">



          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleModal}></div>
          <div className="mx-auto w-full max-w-[550px] bg-white z-10 rounded-lg shadow-lg p-6">
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-600">
              &times;
            </button>
           
            <form onSubmit={handleSubmit}>
                <div class="flex items-center gap-2 mb-4">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"/>
                </svg>

                <span class="text-lg font-semibold text-gray-800 dark:text-white">Add Company</span>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                  Company Admin Email 
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="companyadmin@gmail.com"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                 Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Easy Coach"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="phone_number" className="mb-3 block text-base font-medium text-[#07074D]">
                  phone number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+254712345678"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="700 Kakamega"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="first_name" className="mb-3 block text-base font-medium text-[#07074D]">
                  Company Admin First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Joseph"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="last_name" className="mb-3 block text-base font-medium text-[#07074D]">
                  Company Admin Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Langat"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                  Company Admin Password
                </label>
                <span><small><i>user should changed password on login</i></small></span>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-8 text-center text-base font-semibold text-white rounded-md bg-gradient-to-r from-[#6A64F1] to-[#4C3CC3] hover:from-[#4C3CC3] hover:to-[#6A64F1] focus:outline-none shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ to, iconClass, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `py-2.7 text-sm flex items-center whitespace-nowrap px-4 transition-colors rounded-lg ${
        isActive ? 'bg-blue-500/13 text-blue-500' : 'text-slate-700 dark:text-white'
      }`
    }
  >
    <div className="mr-2 flex h-8 w-8 items-center justify-center bg-center rounded-lg">
      <i className={`${iconClass} text-blue-500`}></i>
    </div>
    <span>{text}</span>
  </NavLink>
);

export default Sidenav;
