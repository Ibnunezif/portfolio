import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  linkedInUrl: string;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/testimonials`)
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
      })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  const next = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#1B9FE5] shadow-sm border border-[#1B9FE5]/20 uppercase tracking-wider">
              FEEDBACK
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-2xl">
            Here's what people are saying about my work. Find more reviews on <a href="https://linkedin.com" className="text-[#1B9FE5] font-bold hover:underline">LinkedIn</a>
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-16 relative overflow-hidden">
            {/* Huge background quote mark */}
            <div className="absolute top-10 left-10 text-[15rem] leading-none font-serif text-gray-100 select-none pointer-events-none opacity-50">
              “
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-10">
                <svg className="w-12 h-12 text-[#7A3CED] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H14.017C13.4647 8 13.017 8.44772 13.017 9V15C13.017 16.0523 12.1693 16.9 11.117 16.9H11.017V21H14.017ZM3.017 21H6.017V16.9H5.917C4.86472 16.9 4.017 16.0523 4.017 15V9C4.017 8.44772 4.46472 8 5.017 8H10.017C10.5693 8 11.017 8.44772 11.017 9V15C11.017 15.5523 10.5693 16 10.017 16H7.017C8.12157 16 9.017 16.8954 9.017 18V21H3.017Z" />
                </svg>
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-700 text-center font-medium leading-relaxed mb-10 max-w-3xl">
                "{testimonials[activeIndex]?.content}"
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-[#1B9FE5]/20 shadow-lg">
                  <img 
                    src={testimonials[activeIndex]?.avatar} 
                    alt={testimonials[activeIndex]?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{testimonials[activeIndex]?.name}</h4>
                <p className="text-sm font-medium text-gray-500 mb-2">{testimonials[activeIndex]?.role}</p>
                <a 
                  href={testimonials[activeIndex]?.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1B9FE5] flex items-center gap-1 hover:underline"
                >
                  View on LinkedIn
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#1B9FE5] hover:border-[#1B9FE5] transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-[#1B9FE5]' : 'w-2.5 bg-gray-200'}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#1B9FE5] hover:border-[#1B9FE5] transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
