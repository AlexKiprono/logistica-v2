import React, { useEffect, useContext, useState } from 'react';
import { SuperAdminContext } from '../context/SuperAdminContext';
import ConfirmDeleteModal from './confirmDelete'; 

function Viewall() {
  const { all_companies, delete_company, companies, loading, error } = useContext(SuperAdminContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  useEffect(() => {
    if (!companies.length) {
      all_companies(); 
    }
  }, [companies.length]);

  const handleDeleteCompany = (id) => {
    setCompanyToDelete(id);
    setModalOpen(true);  
  };

  const confirmDelete = async () => {
    await delete_company(companyToDelete);
    setModalOpen(false);
    setCompanyToDelete(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setCompanyToDelete(null);
  };

  if (loading) {
    return <p>Loading companies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!companies.length) {
    return <p>No companies found.</p>;
  }

  return (
    <>
        <header>
        <div className="px-4 py-3 border border-indigo-100 rounded-lg mb-3 sm:px-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-800">Registered Companies</h3>
          <p className="mt-1 text-sm text-gray-600">
            You are viewing all registered Companies.
          </p>
        </div>
      </header>

      {/* Companies Table */}
      <div className="overflow-x-auto border border-indigo-100 rounded-lg">
        <table className="min-w-full bg-white shadow-lg rounded-lg divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://i.pravatar.cc/150?img=${company.id}`}
                        alt="Avatar"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {company.admins && company.admins.length > 0 ? (
                    company.admins.map((admin) => (
                      <div key={admin.id} className="text-sm text-gray-900">
                        {admin.first_name} {admin.last_name}
                        <div className="text-sm text-gray-500">{admin.phone_number}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No Admins</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {company.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <button 
                    onClick={() => handleDeleteCompany(company.id)} 
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal 
        isOpen={isModalOpen} 
        onConfirm={confirmDelete} 
        onCancel={cancelDelete} 
      />
    </>
  );
}

export default Viewall;
