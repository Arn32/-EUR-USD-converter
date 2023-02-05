import React from 'react';

const Header = () => {
  return (
    <header class="z-40 items-center w-full h-16 bg-lime-50 shadow-lg rounded-2xl">
      <div class="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="flex justify-center">
          <h1 className="text-4xl font-semibold text-teal-600 font-heading my-4">
            Currency Converter
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
