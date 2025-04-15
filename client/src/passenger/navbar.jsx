import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

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

  return (
    <div className="w-full p-3 bg-white border rounded-xl shadow-sm">
      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : currentUser ? (
        <div className="flex items-center justify-between group relative">
          {/* Left: Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
              {currentUser.first_name?.[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {currentUser.first_name}
              </span>
              <span className="text-xs text-muted-foreground text-gray-500">
                {currentUser.email}
              </span>
            </div>
          </div>

          {/* Right: Logout (hover only) */}
          <button
            onClick={handleLogout}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-1 text-sm text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-3"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      ) : (
        <Link
          to="/auth/login"
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all"
        >
          <i className="fa fa-user"></i>
          Sign In
        </Link>
      )}
    </div>
  );
}

export default Navbar;
