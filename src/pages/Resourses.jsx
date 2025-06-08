import React, { useState } from "react";
import Faq from "./Faq";

function FAQItem({ question, answer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="flex-1 text-base-content">{question}</span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transform transition duration-200 ${
            expanded ? "rotate-45" : ""
          }`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="7" width="16" height="2" rx="1" />
          <rect y="7" width="16" height="2" rx="1" className="rotate-90" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pb-5 leading-relaxed">
          <div className="space-y-2 leading-relaxed">{answer}</div>
        </div>
      </div>
    </li>
  );
}

function Resources() {
  return (
    <div id="resources" className="px-4 py-8 mx-auto max-w-screen-xl">
      <h2 className="flex flex-row flex-nowrap items-center mt-24">
        <span className="flex-grow block border-t border-black"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
          Resources
        </span>
        <span className="flex-grow block border-t border-black"></span>
      </h2>

      <div class="section-header text-black">
        Explore & Travel
        <h1>Resources for our travels and tours</h1>
        <p class="subtitle">
          Explore expert insights, self-care guides, and tools to support your
          mental health.
        </p>
      </div>
      {/* Services Section */}
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="h-auto min-h-auto w-full pt-12 p-4">
          <div class="grid gap-14 md:grid-cols-3 md:gap-5">
            <div class="rounded-xl bg-white p-6 text-center shadow-xl">
              <h1 class="text-darken mb-3 text-xl text-black text-2xl font-medium lg:px-14">
                Articles & Guides
              </h1>
              <p class="px-4 text-gray-500">
                Our pickup and drop-off services to and from airport
              </p>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Explore
              </button>
            </div>

            <div
              data-aos-delay="150"
              class="rounded-xl bg-white p-6 text-center shadow-xl"
            >
              <h1 class="text-darken mb-3 text-xl text-black text-2xl font-medium lg:px-14 ">
                Online Bookings & Tour Packages
              </h1>
              <p class="px-4 text-gray-500">
                We offering online tickets reservations and pocket friendly
                packages customised with your preferences.
              </p>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Explore
              </button>
            </div>

            <div
              data-aos-delay="300"
              class="rounded-xl bg-white p-6 text-center shadow-xl"
            >
              <h1 class="text-darken mb-3 pt-3 text-xl text-black text-2xl font-medium lg:h-14 lg:px-14">
                Webinars & Workshops
              </h1>
              <p class="px-4 text-gray-500">
                Assist in business travels and group events.
              </p>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
              Community
            </h1>
            <p className="mb-8 leading-relaxed">
              You're Not Alone on This Journey.Connect with others, craft
              memorable adventures and relaxing getaways
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="inline-flex text-white bg-emerald-600 border-0 py-2 px-6 hover:bg-emerald-600 rounded text-lg"
              >
                Join The Community
              </a>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://images.unsplash.com/photo-1542560453-88e10bdc429f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VzdGFpbmFibGUlMjB0b3VyaXNtfGVufDB8fDB8fHww"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
    <Faq/>
    </div>
  );
}

export default Resources;
