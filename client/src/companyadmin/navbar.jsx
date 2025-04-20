import React, { useContext, useEffect, useCallback, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { currentUser, fetchCurrentUser, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      await fetchCurrentUser();
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <circle cx="4" cy="12" r="3" fill="#056fdd">
              <animate
                id="svgSpinners3DotsFade0"
                fill="freeze"
                attributeName="opacity"
                begin="0;svgSpinners3DotsFade1.end-0.25s"
                dur="0.75s"
                values="1;0.2"
              />
            </circle>
            <circle cx="12" cy="12" r="3" fill="#056fdd" opacity="0.4">
              <animate
                fill="freeze"
                attributeName="opacity"
                begin="svgSpinners3DotsFade0.begin+0.15s"
                dur="0.75s"
                values="1;0.2"
              />
            </circle>
            <circle cx="20" cy="12" r="3" fill="#056fdd" opacity="0.3">
              <animate
                id="svgSpinners3DotsFade1"
                fill="freeze"
                attributeName="opacity"
                begin="svgSpinners3DotsFade0.begin+0.3s"
                dur="0.75s"
                values="1;0.2"
              />
            </circle>
          </svg>
        </span>
      </div>
    );
  }

  return (
    <nav className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <h6 className="text-2xl font-semibold">Company Admin Dashboard</h6>
        </nav>

        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg">
              <span className="absolute z-50 flex h-full items-center rounded-lg rounded-tr-none rounded-br-none border border-r-0 bg-transparent py-2 px-2.5 text-slate-500">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="pl-9 text-sm w-full leading-5 block rounded-lg border border-gray-300 bg-white py-2 pr-3 text-gray-700 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Type here..."
              />
            </div>
          </div>
          <ul className="flex flex-row justify-end pl-0 mb-0 list-none">
            {currentUser ? (
              <>
                <li className="flex items-center text-gray-700 pr-4">
                  <span>
                    Hello, {currentUser.first_name} |{" "}
                    <span className="ml-1 text-sm font-normal text-gray-500">
                      {currentUser.role}
                    </span>
                  </span>
                </li>
                <li className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="flex items-center">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg font-semibold hover:text-blue-700 hover:border-blue-300 transition-all"
                >
                  <i className="fa fa-user mr-1"></i>
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
