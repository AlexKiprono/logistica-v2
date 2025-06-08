import React from "react";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Contacts from "./Contacts";
import Resourses from "./Resourses";
import plane from "../assets/plane.png"; 

function Home() {
  return (
    <div>
      {/* Home*/}
      <div id="home" class="p-10 mt-15 sm:p-10 rounded-4xl text-black flex items-center justify-center overflow-hidden ">
        <div class="max-w-6xl px-4 sm:px-6">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* <!-- Left Section: Text Content --> */}
            <div class="flex flex-col justify-center text-center md:text-left z-10">
              <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                Unlock New Destinations &{" "}
                <span class="text-blue-500">More Flight Options!</span>
              </h1>
              <p class="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-400  text-gray-700 text-balance">
                Where your next adventure takes off!
              </p>
              <div class="mt-6 sm:mt-8 flex flex-wrap gap-4">
                <a
                  href="#get-started"
                  class="rounded-sm p-3 grow text-center bg-blue-500 text-black font-bold uppercase text-sm tracking-widest hover:bg-blue-600 transition"
                >
                  Get Started
                </a>
                <a
                  href="#learn-more"
                  class="rounded-sm p-3 grow border text-center border-blue-500 text-blue-500 font-bold uppercase text-sm tracking-widest hover:bg-blue-500 hover:text-black transition"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* <!-- Right Section: Visual Block --> */}
            <div class="relative flex items-center sm:m-10">
              <img
                class="w-full h-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
                src={plane}
                alt="Plane"
              />
            </div>
          </div>
        </div>
      </div>
      {/*about*/}
      <About />

      {/* services */}
      <Services />

      {/* testimonials */}
      <Testimonials />

      {/* Resources */}
      <Resourses />

      {/* contact us */}
      <Contacts />

      {/* footer */}
      <footer class=" py-12 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          {/* <!-- Left Column --> */}
          <div class="bg-white rounded-2xl p-6 w-full md:w-1/2">
            <h2 class="text-xl font-bold text-teal-900 mb-4 text-left">
              SKYWINGS
            </h2>
            <div class="text-left grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
              <a href="#" class="hover:text-teal-700">
                About
              </a>
              <a href="#" class="hover:text-teal-700">
                Instagram
              </a>
              <a href="#" class="hover:text-teal-700">
                Terms Of Use
              </a>

              <a href="#" class="hover:text-teal-700">
                Services
              </a>
              <a href="#" class="hover:text-teal-700">
                Facebook
              </a>
              <a href="#" class="hover:text-teal-700">
                Privacy Policy
              </a>

              <a href="#" class="hover:text-teal-700">
                Testimonials
              </a>
              <a href="#" class="hover:text-teal-700">
                Linked In
              </a>
              <a href="#" class="hover:text-teal-700">
               
              </a>

              <a href="#" class="hover:text-teal-700">
                Resources
              </a>

              <a href="#" class="hover:text-teal-700">
                Youtube
              </a>

              <a href="#" class="hover:text-teal-700">
               
              </a>
              <a href="#" class="hover:text-teal-700">
                Contact Us
              </a>
            </div>
            <p class="mt-6 text-xs text-gray-400">
              © [2025] Skywings. All Rights Reserved.
            </p>
          </div>

          {/* <!-- Right Column --> */}
          <div class="bg-teal-900 text-white rounded-2xl p-6 w-full md:w-1/2 flex flex-col justify-between relative overflow-hidden">
            {/* <!-- Decorative Elements --> */}

            {/* <!-- Text & CTA --> */}
            <div class="relative z-10 text-left">
              <h3 class="text-2xl sm:text-3xl font-bold leading-snug mb-6">
                Find
                <br />
                Support,
                <br />
                and Explore.
              </h3>
              <button class="bg-white w-full text-teal-900 font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition">
                Find Support Now
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
