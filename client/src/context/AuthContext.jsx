import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [auth_token, setAuth_token] = useState(() => localStorage.getItem("access_token") || null);

  const server_url = "http://127.0.0.1:5000";

    // LOGIN USER
  

  
  // LOGIN USER
  const login_user = async (email, password) => {
    try {
      const response = await fetch(`${server_url}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const res = await response.json();
  
      if (response.ok && res.access_token) {
        setAuth_token(res.access_token);
        localStorage.setItem("access_token", res.access_token);
        toast.success("Logged in Successfully!");
  
        return res; 
      } else {
        toast.error(res.message || "Invalid credentials.");
        throw new Error(res.message || "Invalid credentials.");
      }
    } catch (error) {
      // toast.error("Please try again.");
      console.error("Login Error:", error);
      throw error; 
    }
  };


  const register_user = async (first_name, last_name, email, phone_number, password) => {
    const server_url = "http://127.0.0.1:5000"; 
  
    try {
      const response = await fetch(`${server_url}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone_number,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const res = await response.json();
  
      if (response.ok) {
        toast.success(res.message || 'Registeration successful');
      } else {
        toast.error(res.message || 'An error occurred');
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error('Error during registration:', error);
    }
  };

  const signUp = async (first_name, last_name, email, phone_number, password) => {
    const server_url = "http://127.0.0.1:5000"; 
  
    try {
      const response = await fetch(`${server_url}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone_number,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const res = await response.json();
  
      if (response.ok) {
        toast.success(res.message || 'Registeration successful');
      } else {
        toast.error(res.message || 'An error occurred');
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error('Error during registration:', error);
    }
  };
  

  // GET USER BY ID
  const get_user_by_id = async (user_id) => {
    try {
      const response = await fetch(`${server_url}/users/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${auth_token}`
        },
      });
      const res = await response.json();
      if (response.ok) {
        setCurrentUser(res.user);
      } else {
        toast.error(res.error || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // DELETE USER
  const delete_user = async (user_id) => {
    try {
      const response = await fetch(`${server_url}/users/${user_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        },
      });
      const res = await response.json();
      if (response.ok) {
        toast.success(res.success || "Deleted successfully");
        setCurrentUser(null);
      } else {
        toast.error(res.error || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // GET ALL USERS
  const get_all_users = async () => {
    try {
      const response = await fetch(`${server_url}/users`, {
        headers: {
          'Authorization': `Bearer ${auth_token}`
        },
      });
      const res = await response.json();
      if (response.ok) {
        setCurrentUser(res.users);
      } else {
        toast.error(res.error || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // SEARCH USERS
  const search_users = async (searchTerm) => {
    try {
      const response = await fetch(`${server_url}/users/search?search=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${auth_token}`
        },
      });
      const res = await response.json();
      if (response.ok) {
        setCurrentUser(res.users);
      } else {
        toast.error(res.error || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  

  // UPDATE USER
  const update_user = async (user_id, firstname, lastname, email, password) => {
    try {
      const response = await fetch(`${server_url}/users/${user_id}`, {
        method: 'PUT',
        body: JSON.stringify({ firstname, lastname, email, password}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.success);
      } else {
        toast.error(res.error || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("access_token");
    setAuth_token(null);
    toast.success("Logged out successfully");
  };

    // FORGOT PASSWORD
    const forgotPassword = async (email) => {
      try {
          const response = await fetch(`${server_url}/forgot_password`, {
              method: 'POST',
              body: JSON.stringify({ email }),
              headers: { 'Content-Type': 'application/json' },
          });
          const res = await response.json();
          if (res.success) {
              toast.success(res.success);
          } else {
              toast.error(res.error || "An error occurred");
          }
      } catch (error) {
          toast.error("An error occurred");
      }
  };

  // RESET PASSWORD
const resetPassword = async (token, new_password) => {
  try {
    const response = await fetch(`${server_url}/reset_password/${token}`, {
      method: 'POST' ,
      body: JSON.stringify({ new_password: new_password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.status) {
      toast.success("Password reset successfully");
    } else {
      
      toast.error("An error occurred");
    }
  } catch (error) {
    console.log(error);
    
    toast.error("An error occurred");
  }
};

// current User
const fetchCurrentUser = async () => {
  if (auth_token && !currentUser) {
  try {
    const response = await fetch(`${server_url}/auth/current_user`, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      },
    });
    const res = await response.json();
    if (response.ok) {
      setCurrentUser(res.user);
      // toast.success("User fetched successfully");
      // console.log("Current User:", res.user);
    } else {
      setCurrentUser(null);
      toast.info("login to continue...");
    }
  } catch (error) {
    // toast.error("An error occurred");
  }

  }
};

// useEffect(() => {
//   if (auth_token && !currentUser) {
//     fetchCurrentUser();
//   }
// }, [auth_token, currentUser]);

  const contextData = {
    auth_token,
    setAuth_token,
    currentUser,
    setCurrentUser,
    register_user,
    login_user,
    update_user,
    forgotPassword,
    resetPassword,
    delete_user,
    get_all_users,
    search_users,
    logout,
    get_user_by_id,
    fetchCurrentUser,
    signUp,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};