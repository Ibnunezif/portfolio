import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 bg-white overflow-hidden">
      {/* Subtle Background Blobs (matching reference) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#1B9FE5] shadow-sm border border-[#1B9FE5]/20 uppercase tracking-wider">
              GET IN TOUCH
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] bg-clip-text text-transparent">
                Contact Me
              </span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-2xl">
            Have a project in mind or just want to say hi? Feel free to reach out. I'll get back to you as soon as possible!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form 
            action="https://formspree.io/f/xpqkybqk" 
            method="POST"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B9FE5]/20 focus:border-[#1B9FE5] transition-all placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B9FE5]/20 focus:border-[#1B9FE5] transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-bold text-gray-700 ml-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B9FE5]/20 focus:border-[#1B9FE5] transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-gray-700 ml-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Your message"
                required
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B9FE5]/20 focus:border-[#1B9FE5] transition-all placeholder:text-gray-300 resize-none"
              ></textarea>
            </div>

            <div className="flex justify-center md:justify-start pt-4">
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] text-white font-bold rounded-2xl shadow-lg shadow-[#1B9FE5]/25 hover:scale-105 transition-all duration-300 uppercase tracking-wider text-sm"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
