import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left navigation (desktop) */}
            <div className="hidden md:flex space-x-4">
              <a
                href="#home"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
              >
                About
              </a>
              <a
                href="#services"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
              >
                Services
              </a>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-black font-bold text-2xl">
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1500 500"
                  width="400"
                  height="500"
                >
                  <path
                    stroke="#000"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    fill="black"
                    d="M519.8 235.1l2.3-8.3h-11.6l-3.8 14.4h23.9l9.2 11.6-6.9 33.1-14.6 11.5h-36.2l-9.2-11.5 4.6-20.8h23.9l-1.6 8.4h11.5l3.9-14.6h-24.6l-8.5-11.5 7-33.1 14.6-11.4h35.3l10 11.4-5.4 20.8zm50.5 26.9l-7.9 35.4h-23.7l20.8-94.5h23.8l-7.7 35.3h12.2l7.7-35.3h23.8l-7.5 35.3-14.8 12.3 9.4 11.5-8.6 35.4h-23.7l8.3-35.4zm61.2-59.1h23.8l-3.8 16 3.8 9.4 7.9-9.4 3.6-16h23.8l-5.3 23.7-23.8 26.1-10 44.7h-24l10.1-44.7-11.5-26.1zm68.1 0h23.9l-11.6 51.6 3.9 9.9 8.4-9.9 11.6-51.6h23.7l-11.5 51.6 3.9 9.9 7.6-9.9 11.6-51.6h23.9l-13.1 59.2-32.3 35.4h-11.6l-7.6-17.7-16 17.7h-11.7l-16.2-35.4zm126.5 0l-21.6 94.6h-23.8l21.5-94.6zm39.7 23.9h-11.5l-16.1 70.7h-23.7l18.3-83.1 14.6-11.5h36.2l9.2 11.5-19.2 83.1h-23.7zm18.1 59.2l16-71.8 14.6-11.3h35.4l9.3 11.3-5.5 23.9h-23.6l2.9-11.3h-12.3l-10 46.9h11.7l2.3-11.5h-5.6l2.6-11.8h29.8l-7.5 35.6-14.6 11.4h-36.4zm113.4-50.8l2.3-8.3h-11.6l-3.8 14.4h23.9l9.2 11.6-6.9 33.1-14.6 11.5h-36.2l-9.2-11.5 4.6-20.8h23.9l-1.6 8.4h11.5l3.9-14.6h-24.6l-8.5-11.5 7-33.1 14.6-11.4h35.3l10 11.4-5.4 20.8z"
                  />
                </svg>
              </a>
            </div>

            {/* Right navigation (desktop) */}
            <div className="hidden md:flex space-x-4">
              <a
                href="#testimonials"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
              >
                Testimonials
              </a>
              <a
                href="#resources"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
              >
                Resources
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md transition duration-300"
              >
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                <span className="sr-only">Toggle menu</span>
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-3 space-y-1 bg-white shadow-sm">
            <a
              href="#"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </a>
            <a
              href="#"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Testimonials
            </a>
            <a
              href="#"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
            </a>
            <a
              href="#"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
