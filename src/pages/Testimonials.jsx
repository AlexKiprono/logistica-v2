import React, { useState } from "react";
import Partners from "./Partners";

const testimonials = [
  {
    name: "Anna R., 32",
    text: "I am immensely proud of Qatar Airways and it is an honour on behalf of my workforce and my country to collect this prestigious award and for Qatar Airways to be named Airline of the Year. It is extremely gratifying to be honoured with these achievements, which recognise the outstanding efforts of our employees in the air and on the ground.",
    bg: "bg-orange-100",
  },
  {
    name: "Mark S., 41",
    text: "The Skytrax best low-cost airline award marks a major milestone for AirAsia as the award is acknowledged the world over, and the only award to be conferred based on independent judgments of our very own guests. The fact that the winner is not selected by the industry or any self-interested committee, but by actual passengers who flew the respective airlines makes this award even more meaningful.",
    bg: "bg-green-900 text-white",
  },
  {
    name: "Emily T., 27",
    text: "These awards are widely regarded as the industry's benchmark for Excellence. For us, the awards clearly reflect a vote of confidence from global travellers, who acknowledge and appreciate our continuous drive to deliver high-quality service. To be voted 'World's Best Airline' by millions of discerning travellers really is something for our 60,000 strong workforce to be proud of.",
    bg: "bg-yellow-600",
  },
  {
    name: "Annick Guérard",
    text: "To be recognized again with this award is incredibly gratifying. It reflects our commitment to providing our passengers with an outstanding travel experience and it speaks to the amazing enhancements we have recently made to our inflight product and service levels. Our team's tireless efforts to make customer satisfaction a priority ensure that we consistently meet and exceed the expectations of those who choose to fly with us.",
    bg: "bg-blue-500",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at second testimonial

  const moveSlide = (direction) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 1) return testimonials.length - 1;
      if (newIndex >= testimonials.length) return 1;
      return newIndex;
    });
  };

  return (
    <>
      <section className="py-20 sm:py-32" id="testimonials">
        <h2 class="flex flex-row flex-nowrap my-4 items-center mt-24">
          <span class="flex-grow block border-t border-black"></span>
          <span class="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
            Testimonials
          </span>
          <span class="flex-grow block border-t border-black"></span>
        </h2>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Static First Testimonial */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 uppercase">
                Testimonials
              </h3>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
                What Our Clients Are Saying
              </h2>
              <p className="text-gray-600 max-w-md mb-6">
                Positive experiences from users who have benefited from therapy
                or wellness programs.
              </p>

              {/* Navigation */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => moveSlide(-1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200 border hover:bg-gray-200"
                >
                  ←
                </button>
                <button
                  onClick={() => moveSlide(1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800"
                >
                  →
                </button>
              </div>
            </div>

            {/* Slider Area */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentIndex - 1) * 100}%)`,
                }}
              >
                {testimonials.slice(1).map((testimonial, index) => (
                  <div
                    key={index}
                    className={`min-w-full p-6 rounded-3xl ${testimonial.bg} transition-all duration-500`}
                  >
                    <p className="text-lg mb-4">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="font-medium">— {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Partners />
    </>
  );
};

export default Testimonials;
