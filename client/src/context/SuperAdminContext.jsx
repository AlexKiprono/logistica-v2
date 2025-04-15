import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";

export const SuperAdminContext = createContext();
export const useUser = () => {
  const context = useContext(SuperAdminContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
};

export const SuperAdminProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [auth_token, setAuth_token] = useState(() => localStorage.getItem("access_token") || null);
  
  const [companies, setCompanies] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const server_url = "http://127.0.0.1:5000";

//   add company
const add_company = async (email, name, phone_number, address, first_name, last_name, password) => {
  try {
    const response = await fetch(`${server_url}/superadmin/company/create`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        phone_number,
        address,
        first_name,
        last_name,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
    });

    const res = await response.json();
    
    if (!response.ok) {
      throw new Error(res.message || 'An error occurred');
    }

    toast.success(res.message || 'Company registered successfully');
 // Adjust route as necessary
  } catch (error) {
    toast.error(error.message || 'An error occurred. Please try again.');
    console.error('Error during registration:', error);
  }
};

const all_companies = async () => {
  setLoading(true);
  try {
    const access_token = localStorage.getItem("access_token")
    const response = await fetch(`${server_url}/superadmin/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
    });
    const res = await response.json();
    if (response.ok) {
      setCompanies(res.companies || []); 
    } else {
      setError(res.message || 'An error occurred');
    }
  } catch (err) {
    setError(err.message || 'An error occurred');
  } finally {
    setLoading(false);
  }
};

// delete
const delete_company = async (id) => {
  try {
    const updatedCompanies = companies.filter(company => company.id !== id);
    setCompanies(updatedCompanies); 

    const response = await fetch(`${server_url}/superadmin/company/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`,
      },
    });
    
    const res = await response.json();
    
    if (!response.ok) {
      throw new Error(res.message || 'An error occurred');
    }
    toast.success(res.message || 'Company deleted successfully');
    all_companies();
  } catch (error) {
    toast.error(error.message || 'An error occurred. Please try again.');
    console.error('Error during deletion:', error);
  }
};

  const contextData = {
    auth_token,
    currentUser,
    setCurrentUser,
    add_company,
    all_companies,
    delete_company,
    companies,
    loading,
    error,
    
  };

  return (
    <SuperAdminContext.Provider value={contextData}>
      {children}
    </SuperAdminContext.Provider>
  );
};