import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import { initialInvoiceData } from "../constants";

const Menubar = () => {
  const { openSignIn } = useClerk();
  const openLogin = () => {
    openSignIn({});
  };

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  const
    { setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
    useContext(AppContext);

  const handleGenerateClick = () => {
    setInvoiceData(initialInvoiceData);
    setSelectedTemplate("template1");
    setInvoiceTitle("New Invoice");
    navigate("/generate");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Added md:flex, md:items-center, md:justify-between here to align Logo and Menu side-by-side on desktop */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:flex md:items-center md:justify-between">
        {/* Top Section: Brand + Mobile Toggle */}
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center" onClick={scrollToTop}>
            {/* Added fallback in case logo isn't found/loaded */}
            <img
              src="/logo.png"
              alt="InvoX Logo"
              className="h-8 w-8 mr-1 object-contain"
            />
            <span
              className="text-xl font-bold tracking-tight text-[#2a4a79]"
              style={{ letterSpacing: "-0.5px" }}
            >
              InvoX
            </span>
          </Link>

          {/* Toggle Button (Mobile Only) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Toggle navigation"
          >
            {/* Swapping icons based on open state is a nice UX touch */}
            {open ? (
              // X Icon
              <svg
                className="h-6 w-6 text-gray-700"
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
              // Hamburger Icon
              <svg
                className="h-6 w-6 text-gray-700"
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

        {/* Collapsible Menu */}
        {/* On mobile: checks 'open' state. On desktop: always block. */}
        <div className={`${open ? "block" : "hidden"} md:block mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <SignedIn>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              {/* Buttons */}
              <li>
                <button
                  className="w-full md:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  onClick={handleGenerateClick}
                >
                  Generate
                </button>
              </li>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <li>
                <button
                  onClick={openLogin}
                  className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  Login/SignUp
                </button>
              </li>
            </SignedOut>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
