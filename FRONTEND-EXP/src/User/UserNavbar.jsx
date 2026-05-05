import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Array of links for easy management
  const navLinks = [
    { name: 'Dashboard', path: '' },
    { name: 'Add-Category', path: 'add-category' },
    { name: 'my-categories', path: 'my-categories' },
    {name:'add-expense',path:'add-expense'},
    { name: 'Profile', path: 'profile' },
    { name: 'Settings', path: 'settings' },
    { name: 'My-expenses', path: 'my-expenses' },

  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <nav className="bg-white shadow-sm border-b border-stone-200 shrink-0 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <span className="text-2xl font-black tracking-tighter text-stone-800 flex items-center">
                <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                ExpTrack
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:space-x-8 h-full">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-bold transition-all duration-200 border-b-2 ${
                      isActive
                        ? 'border-stone-800 text-stone-800'
                        : 'border-transparent text-stone-400 hover:text-stone-600 hover:border-stone-200'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center">
             <button className="bg-stone-900 text-[#d4af37] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-stone-100 hover:bg-stone-800 transition-all active:scale-95">
                Logout
             </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-50 focus:outline-none transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="pt-2 pb-6 space-y-1 px-4">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? 'bg-stone-50 text-stone-800'
                      : 'text-stone-400 hover:bg-stone-50 hover:text-stone-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-stone-50 px-4">
               <button className="w-full bg-stone-900 text-[#d4af37] py-3 rounded-xl font-bold">Logout</button>
            </div>
          </div>
        </div>
      )}
      </nav>

      {/* Dashboard Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};