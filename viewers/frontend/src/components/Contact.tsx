import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Get In Touch</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:hello@example.com"
            className="px-8 py-3 bg-[#0DB5E5] text-white font-bold rounded-lg hover:opacity-90 transition-colors"
          >
            Say Hello
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gray-100 text-[#0DB5E5] font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
