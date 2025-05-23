import React, { useState } from 'react';
import Sidenav from './sidenav';
import Navbar from './navbar';
import appleIcon from '../assets/img/apple-icon.png';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';
import '../assets/css/argon-dashboard-tailwind.css?v=1.0.1';
import Viewall from './viewall';
import Driver from './Drivers';
import Vehicles from './Vehicles';
import Routes from './Routes';

function CompanyDashboard() {
    // State to manage active tab
    const [activeTab, setActiveTab] = useState(0);

    // Tab names
    const tabNames = ['Stations', 'Drivers', 'Vehicles', 'Routes'];
  
    // Tab components
    const tabComponents = [
      <Viewall key="viewall" />,
      <Driver key="drivers" />,
      <Vehicles key="vehicles" />,
      <Routes key="routes" />,
    ];

  return (
    <>
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="apple-touch-icon" sizes="76x76" href={appleIcon} />
          <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
            rel="stylesheet"
          />
          <script
            src="https://kit.fontawesome.com/42d5adcbca.js"
            crossOrigin="anonymous"
          ></script>
          {/* Popper */}
          <script src="https://unpkg.com/@popperjs/core@2"></script>
        </head>
        <body className="m-0 font-sans text-base antialiased bg-white font-normal bg-slate-900 leading-default h-screen text-slate-500">
          {/* <!-- sidenav  --> */}

          <Sidenav />

          {/* <!-- end sidenav --> */}

          <main class="relative h-full max-h-screen transition-all  duration-200 ease-in-out xl:ml-68 rounded-xl">
            {/* <!-- Navbar --> */}

            <Navbar />

            {/* <!-- end Navbar --> */}

            {/* <!-- cards --> */}
            <div class="w-full px-6 py-6 mx-auto">
              {/* <!-- row 1 --> */}
              <div class="flex-1 p-6 space-y-6">
                {/* <!-- card1 --> */}
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded shadow">
                    <p className="text-sm text-gray-500">Today's Money</p>
                    <h3 className="text-xl font-bold">$53,000</h3>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <p className="text-sm text-gray-500">Today's Users</p>
                    <h3 className="text-xl font-bold">2,300</h3>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <p className="text-sm text-gray-500">New Clients</p>
                    <h3 className="text-xl font-bold">+3,462</h3>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <p className="text-sm text-gray-500">Vehicles Count</p>
                    <h3 className="text-xl font-bold">$103,430</h3>
                  </div>
                </div>
              </div>

              {/* <!-- cards row 2 --> */}
              <div class="flex flex-wrap mt-6 -mx-3">
                <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
                  <div
                    slider
                    class="relative w-full h-full overflow-hidden rounded-2xl"
                  >
                    {/* <!-- slide 1 --> */}
                    <div
                      slide
                      class="absolute w-full h-full transition-all duration-500"
                    >
                      <img
                        class="object-cover h-full"
                        src="../assets/img/carousel-1.jpg"
                        alt="carousel image"
                      />
                      <div class="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
                        <div class="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
                          <i class="top-0.75 text-xxs relative text-slate-700 ni ni-camera-compact"></i>
                        </div>
                        <h5 class="mb-1 text-white">Get started with Argon</h5>
                        <p class="opacity-80">
                          There’s nothing I really wanted to do in life that I
                          wasn’t able to get good at.
                        </p>
                      </div>
                    </div>

                    {/* <!-- slide 2 --> */}
                    <div
                      slide
                      class="absolute w-full h-full transition-all duration-500"
                    >
                      <img
                        class="object-cover h-full"
                        src="../assets/img/carousel-2.jpg"
                        alt="carousel image"
                      />
                      <div class="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
                        <div class="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
                          <i class="top-0.75 text-xxs relative text-slate-700 ni ni-bulb-61"></i>
                        </div>
                        <h5 class="mb-1 text-white">
                          Faster way to create web pages
                        </h5>
                        <p class="opacity-80">
                          That’s my skill. I’m not really specifically talented
                          at anything except for the ability to learn.
                        </p>
                      </div>
                    </div>

                    {/* <!-- slide 3 --> */}
                    <div
                      slide
                      class="absolute w-full h-full transition-all duration-500"
                    >
                      <img
                        class="object-cover h-full"
                        src="../assets/img/carousel-3.jpg"
                        alt="carousel image"
                      />
                      <div class="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
                        <div class="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
                          <i class="top-0.75 text-xxs relative text-slate-700 ni ni-trophy"></i>
                        </div>
                        <h5 class="mb-1 text-white">
                          Share with us your design tips!
                        </h5>
                        <p class="opacity-80">
                          Don’t be afraid to be wrong because you can’t learn
                          anything from a compliment.
                        </p>
                      </div>
                    </div>

                    {/* <!-- Control buttons --> */}
                    <button
                      btn-next
                      class="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-right active:scale-110 top-6 right-4"
                    ></button>
                    <button
                      btn-prev
                      class="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-left active:scale-110 top-6 right-16"
                    ></button>
                  </div>
                </div>
              </div>

              {/* <!-- cards row 3 --> */}

              <div className="w-full px-6 py-6 mx-auto">
                {/* Tab buttons for switching between components */}
                <div className="flex space-x-4 border-b">
                  {tabNames.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)} // Set active tab on click
                      className={`py-2 px-4 text-gray-600 hover:text-blue-600 ${
                        activeTab === index
                          ? "py-2 px-4 text-gray-600"
                          : "py-2 px-4 text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Render the component corresponding to the active tab */}
                <div className="w-full px-3">{tabComponents[activeTab]}</div>
              </div>
            </div>
            {/* <!-- end cards --> */}
          </main>
        </body>
        {/* <!-- plugin for charts  --> */}
        <script src="../assets/js/plugins/chartjs.min.js" async></script>
        {/* <!-- plugin for scrollbar  --> */}
        <script
          src="../assets/js/plugins/perfect-scrollbar.min.js"
          async
        ></script>
        {/* <!-- main script file  --> */}
        <script
          src="../assets/js/argon-dashboard-tailwind.js?v=1.0.1"
          async
        ></script>
      </html>
    </>
  );
}

export default CompanyDashboard
