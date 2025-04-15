import React, { useState } from 'react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Start collapsed by default

  // List of sidebar items
  const menuItems = [
    {
      name: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
        </svg>
      ),
      link: '#',
    },
    // Add more menu items as needed
  ];

  return (
    <div>
      <aside
        className={`bg-dark border border-indigo-200 fixed inset-0 z-50 my-4 xl:my-0 xl:ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0`}
      >
        <div className="relative border-b border-dark/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <h6 className="text-dark text-base font-semibold">Material Tailwind Dashboard</h6>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-0 right-0 grid xl:hidden w-8 h-8 rounded-lg bg-red-500 text-white"
            aria-label="Toggle Sidebar"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            </button>

        </div>

        <div className="m-4">
          <ul className="mb-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.link}>
                  <button className="text-xs py-3 rounded-lg text-dark w-full flex items-center gap-4 px-4 capitalize">
                    {item.icon}
                    <p className="text-inherit font-medium">{item.name}</p>
                  </button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
