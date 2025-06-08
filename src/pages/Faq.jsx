import React from "react";

function Faq() {
  return (
    <div>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div>
            <small className="text-sm text-blue-600 uppercase font-semibold">
              Need Help?
            </small>
            <h1 className="text-4xl font-bold mt-2 leading-tight">
              Frequently <span className="text-blue-600">Asked Questions</span>
            </h1>
            <p className="text-gray-600 mt-4 max-w-md">
              Find answers to common questions about our services, packages, and
              consultancy.
            </p>
            <div className="mt-8">
              <img
                src="https://media.istockphoto.com/id/2213068147/photo/full-zine-trendy-photo-collage-of-happy-girl-guy-stand-world-map-choose-relocation-continent.jpg?s=1024x1024&w=is&k=20&c=zsUjEUmBSTAhiwvvcDwNMCtx9UXXbPmfPJVu67MHlS4="
                alt="illustration"
                className="rounded-lg shadow-md w-full max-w-sm"
              />
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq1" className="peer hidden" />
              <label
                htmlFor="faq1"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  How can I book a trip?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  You can book a trip online through our website, by calling our
                  office, or by visiting us in person. Our travel agents are
                  happy to assist with planning and booking.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq2" className="peer hidden" />
              <label
                htmlFor="faq2"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  Do I need to pay in full at the time of booking?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  Payment policies vary depending on the type of trip and
                  service provider. Some bookings may require a deposit, while
                  others need full payment upfront.
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq3" className="peer hidden" />
              <label
                htmlFor="faq3"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  What documents do I need for international travel?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  A valid passport is required. Many countries also require a
                  visa. We’ll guide you on the specific entry requirements based
                  on your destination.
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq3" className="peer hidden" />
              <label
                htmlFor="faq3"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  What documents do I need for international travel?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  A valid passport is required. Many countries also require a
                  visa. We’ll guide you on the specific entry requirements based
                  on your destination.
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq3" className="peer hidden" />
              <label
                htmlFor="faq3"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  What documents do I need for international travel?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  A valid passport is required. Many countries also require a
                  visa. We’ll guide you on the specific entry requirements based
                  on your destination.
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq3" className="peer hidden" />
              <label
                htmlFor="faq3"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  What documents do I need for international travel?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  A valid passport is required. Many countries also require a
                  visa. We’ll guide you on the specific entry requirements based
                  on your destination.
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq3" className="peer hidden" />
              <label
                htmlFor="faq3"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  What documents do I need for international travel?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  A valid passport is required. Many countries also require a
                  visa. We’ll guide you on the specific entry requirements based
                  on your destination.
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <input type="checkbox" id="faq3" className="peer hidden" />
              <label
                htmlFor="faq3"
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 peer-checked:bg-blue-100"
              >
                <span className="font-medium text-gray-800">
                  What documents do I need for international travel?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 peer-checked:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <div className="px-4 text-gray-600 max-h-0 opacity-0 peer-checked:max-h-screen peer-checked:opacity-100 transition-all duration-500 overflow-hidden">
                <p className="py-4">
                  A valid passport is required. Many countries also require a
                  visa. We’ll guide you on the specific entry requirements based
                  on your destination.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Faq;
