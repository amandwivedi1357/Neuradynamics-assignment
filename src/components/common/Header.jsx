import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ShoppingBag } from 'lucide-react';
import { selectAllFavorites } from '../../features/favorites/favoritesSlice';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const favorites = useSelector(selectAllFavorites);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const headerClass = `fixed w-full  z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-transparent backdrop-blur-sm shadow-sm py-3 ring-1 ring-yellow-400 ring-opacity-50' 
      : 'bg-black py-5'
  }`;

  const navLinkClass = (path) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path 
        ? 'text-blue-600' 
        : 'text-gray-700 hover:text-blue-600'
    }`;

  return (
    <header className={headerClass}>
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <ShoppingBag 
              className={`h-8 w-8 transition-colors ${
                isScrolled ? 'text-yellow-400' : 'text-yellow-400 group-hover:text-yellow-300'
              }`} 
            />
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-yellow-400' : 'text-yellow-400 group-hover:text-yellow-300'
            }`}>
              AD STORE
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/favorites" 
              className="relative px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
            >
              <Heart 
                className={`h-5 w-5 ${
                  location.pathname === '/favorites' ? 'text-red-500 fill-current' : 'text-gray-700'
                }`} 
              />
              <span className="text-yellow-400">
                Favorites
              </span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="block h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block w-full px-3 py-2 rounded-md text-base font-medium bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black transition-colors duration-200`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/favorites"
            className={`block w-full px-3 py-2 rounded-md text-base font-medium bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black transition-colors duration-200 flex items-center`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart 
              className={`h-5 w-5 mr-2 text-black`} 
            />
            <span >Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;