import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center h-full p-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B9FE5]"></div>
  </div>
);

export default Spinner;
