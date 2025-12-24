import { useState, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import { initialInvoiceData } from "../constants";

const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
    useContext(AppContext);

  const handleGenerateClick = () => {
    setInvoiceData(initialInvoiceData);
    setSelectedTemplate("template1");
    setInvoiceTitle("New Invoice");
    setIsOpen(false); // Close mobile menu
    navigate("/generate");
  };

  const closeMenu = () => setIsOpen(false);

  // Helper for smooth scrolling to sections if on home page
  const handleScroll = (id) => {
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinkStyles = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* --- LOGO SECTION --- */}
          <div className="flex shrink-0 items-center">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src="/logo.png"
                alt="InvoX Logo"
                className="h-9 w-9 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight text-[#2a4a79]">
                InvoX
              </span>
            </Link>
          </div>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <SignedOut>
                <NavLink to="/" end className={navLinkStyles}>
                  Home
                </NavLink>
                <button
                  onClick={() => handleScroll("features")}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Features
                </button>
                <button
                  onClick={() => handleScroll("why-us")}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Why Us?
                </button>
                <button
                  onClick={() => openSignIn()}
                  className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
                >
                  Login/SignUp
                </button>
              </SignedOut>

              <SignedIn>
                <NavLink to="/dashboard" className={navLinkStyles}>
                  Dashboard
                </NavLink>
                <button
                  onClick={handleGenerateClick}
                  className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-all"
                >
                  Generate
                </button>
                <div className="flex items-center border-l pl-6 ml-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>

          {/* --- MOBILE TOGGLE BUTTON --- */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* 1. Backdrop Overlay (The "Click Outside" area) */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* 2. Menu Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <span className="text-2xl font-bold tracking-tight text-[#2a4a79]">
                InvoX
              </span>
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-6">
              <SignedOut>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <button
                  onClick={() => {
                    handleScroll("features");
                    closeMenu();
                  }}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    handleScroll("why-us");
                    closeMenu();
                  }}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Why Us?
                </button>

                <button
                  onClick={() => {
                    closeMenu();
                    openSignIn();
                  }}
                  className="mt-4 w-full rounded-xl bg-[#2a4a79] py-3 text-center font-semibold text-white shadow-lg active:scale-95 transition-all"
                >
                  Login / SignUp
                </button>
              </SignedOut>

              <SignedIn>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleGenerateClick();
                    closeMenu();
                  }}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600"
                >
                  Generate Invoice
                </button>

                {/* User Profile Section */}
                <div className="pt-8 mt-auto border-t border-gray-100 flex items-center gap-4">
                  <div className="scale-110">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      My Account
                    </span>
                    <span className="text-xs text-gray-500">
                      Manage settings
                    </span>
                  </div>
                </div>
              </SignedIn>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
