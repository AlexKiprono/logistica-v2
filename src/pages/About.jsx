import React from "react";
import about from "../assets/about.webp"

function About() {
  return (
    <div id="about">
      <h2 class="flex flex-row flex-nowrap items-center mt-24">
        <span class="flex-grow block border-t border-black"></span>
        <span class="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
          About
        </span>
        <span class="flex-grow block border-t border-black"></span>
      </h2>
      {/* About Section */}
      <div className="flex px-6 md:px-20 items-center justify-center bg-hero md:h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-8xl w-full">
          {/* Text Section */}
          <div className="w-full md:w-1/2 min-h-[500px] flex flex-col justify-center lg:pr-32 p-10">
            <h2 className="text-3xl lg:text-xl text-center md:text-left text-blue-900 leading-tight font-medium mb-4">
              About
            </h2>
            <h2 className="text-3xl lg:text-xl text-center md:text-left text-blue-900 leading-tight font-medium">
              There’s a better way to talk with your customers.
            </h2>
            <h3 className="mt-6  text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
              Help Scout is designed with your customers in mind. Provide email
              and live chat with a personal touch, and deliver help content
              right where your customers need it, all in one place, all for one
              low price.
            </h3>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
              <button className="inline-flex items-center justify-center border border-gray-500 text-gray-500 px-4 py-2 rounded-3xl hover:bg-grey-500 hover:text-grey transition transform hover:-translate-y-1 hover:shadow-md">
                <i className="fas fa-plus mr-2"></i> Success
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 min-h-[500px] rounded-3xl bg-white text-black flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={about}
              // src="../../../plane.png"
              alt="Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
