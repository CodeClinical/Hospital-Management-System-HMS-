import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">HMS</h1>
            <span className="ml-2 text-sm">Hospital Management System</span>
          </div>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-200">Home</a></li>
            <li><a href="/doctors" className="hover:text-blue-200">Doctors</a></li>
            <li><a href="/appointments" className="hover:text-blue-200">Appointments</a></li>
            <li><a href="/profile" className="hover:text-blue-200">Profile</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
