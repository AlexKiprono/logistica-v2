import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

function Contacts() {
  return (
    <div id="contact" >
      <h2 className="flex flex-row flex-nowrap items-center mt-24">
        <span className="flex-grow block border-t border-black"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
          Contact Us
        </span>
        <span className="flex-grow block border-t border-black"></span>
      </h2>
      <div class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
          <p class="text-sm text-gray-600 uppercase">Get in touch</p>
          <h2 class="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            We’re Here to <br class="sm:hidden" />
            Support You
          </h2>
          <p class="mt-4 text-gray-600 text-base max-w-xl mx-auto">
            Whether you have questions, need help getting started, or want to
            learn more — reach out anytime.
          </p>
        </div>

        <div class="mt-12 bg-white text-black rounded-2xl shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-10">
          {/* <!-- Contact Details --> */}
          <div class="lg:w-1/2 text-left">
            <h3 class="text-xl font-semibold  mb-6">Contact Details:</h3>
            <p class="mb-2">
              <span class="font-semibold">Email:</span>{" "}
              <a href="mailto:info@skywingstravels.com" class="text-blue-600">
                info@skywingstravels.com
              </a>
            </p>
            <p class="mb-2">
              <span class="font-semibold">Phone:+1 (312)349-5967</span>
            </p>
            <p class="mb-4">
              <span class="font-semibold">Address:</span> 123 Wellness Way, Calm
              City, CA 90210
            </p>

            <div class="flex space-x-4 mt-4 mb-6 text-gray-600">
              <a href="#" class="hover:text-blue-600">
                <FaLinkedin />
              </a>
              <a href="#" class="hover:text-blue-600">
                <ImFacebook2 />
              </a>
              <a href="#" class="hover:text-blue-600">
                <FaSquareInstagram />
              </a>
              <a href="#" class="hover:text-green-600">
                <FaWhatsapp />
              </a>
            </div>
            <p class="text-sm text-gray-500">
              We typically respond within 12 hours.
            </p>
          </div>

          {/* <!-- Contact Form --> */}
          <div class="lg:w-1/2 bg-emerald-50 rounded-xl p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h3>
            <form class="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  class="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-600"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows="4"
                  class="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-600"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full bg-teal-900 text-white py-2 rounded-full hover:bg-teal-800 transition duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
