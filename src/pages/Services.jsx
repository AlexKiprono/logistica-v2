import React from 'react'

function Services() {
  return (
    <div id="services" >
      <h2 class="flex flex-row flex-nowrap items-center mt-24">
        <span class="flex-grow block border-t border-black"></span>
        <span class="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
          Services
        </span>
        <span class="flex-grow block border-t border-black"></span>
      </h2>

      <main class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <p class="mx-auto font-display text-2xl font-bold tracking-normal text-slate-900 ">
          Travel Made Easy just for you{" "}
        </p>
        <p class="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          Dicover more with us. We take care of every detail to ensure a smooth
          and memorable journey.
        </p>
      </main>

      {/* fourth section */}
      <section class="px-6 py-12">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
    
    {/* <!-- Card 1 --> */}
    <a
      class="relative h-[84mm] w-full overflow-hidden rounded-2xl shadow-lg"
      href="https://unsplash.com/photos/green-trees-covered-island-cB4Uqoc9D9k"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        src="https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Spain"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
        <h1 class="text-white text-2xl font-bold">Flight Booking</h1>
        <h2 class="text-white text-xs font-semibold opacity-75 mt-1">
          Our flight booking service ensures a seamless and stress-free travel experience from the moment you decide to fly. We offer competitive rates on both domestic and international flights, with access to a wide range of airlines and flexible travel options to suit your schedule and budget.
        </h2>
        <button class="bg-indigo-600 text-white mt-3 py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition duration-300">
          <i class="fas fa-rocket mr-2"></i>
          See more
        </button>
      </div>
    </a>

    {/* <!-- Card 2 --> */}
    <a class="relative h-[84mm] w-full overflow-hidden rounded-2xl shadow-lg" href="#">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Iceland"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
        <h1 class="text-white text-2xl font-bold">Visa Assistance</h1>
        <h2 class="text-white text-xs font-semibold opacity-75 mt-1">
          Our visa assistance service is designed to make the application process smooth and hassle-free.
        </h2>
        <button class="bg-indigo-600 text-white mt-3 py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition duration-300">
          <i class="fas fa-rocket mr-2"></i>
          See more
        </button>
      </div>
    </a>

    {/* <!-- Card 3 --> */}
    <a class="relative h-[84mm] w-full overflow-hidden rounded-2xl shadow-lg" href="#">
      <img
        src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Japan"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
        <h1 class="text-white text-2xl font-bold">Customized Tour Packages</h1>
        <h2 class="text-white text-xs font-semibold opacity-75 mt-1">
          Tailored trips based on traveler preferences, budget, and interests.
        </h2>
        <button class="bg-indigo-600 text-white mt-3 py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition duration-300">
          <i class="fas fa-rocket mr-2"></i>
          See more
        </button>
      </div>
    </a>

  </div>
</section>



      {/* fifth section */}
      <section class="text-gray-600 body-font ">
        <div class="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
          <div class="lg:flex-grow mt-5 md:mt-0   md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-startleading md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-gray-900 sm:text-4xl sm:-10 md:text-5xl md:leading-normal">
              Guided Tours and Excursions
            </h1>
            <p class="mb-8 md:pl-0  pl-2 pr-2 leading-relaxed">
              With carefully planned itineraries, comfortable transport, and
              insider access to local attractions, we take care of all the
              details so you can focus on enjoying every moment.
            </p>
            <button class="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition duration-300">
              <i class="fas fa-rocket mr-2"></i>
              see more
            </button>
          </div>
          <div class="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
            <img
              class="object-cover object-center rounded-2xl"
              alt="hero"
              src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services
