import React from "react";
import {
  CheckCircle,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";


const LandingPage = () => {
  const { openSignIn } = useClerk();
  const openLogin = () => {
    openSignIn({});
  };
  return (
    <>
      <div className="font-sans text-gray-800 antialiased overflow-x-hidden">
        {/* ================= Hero Section ================= */}
        <section className="relative pt-32 pb-20 lg:pt-24 lg:pb-32 bg-blue-500 overflow-hidden">
          {/* Abstract shapes for visual interest */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-blue-900 blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-sm">
              Effortless Invoicing. <br />
              <span className="text-blue-100">Professional Results.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop wrestling with spreadsheets. InvoX helps you create and send
              beautiful invoices in minutes, so you get paid faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openLogin}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-xl hover:shadow-yellow-400/20 transform hover:-translate-y-1">
                Generate Your First Invoice
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ================= How It Works Section ================= */}
        <section id="how-it-works" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Get Started in 4 Simple Steps
              </h2>
              <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <StepCard
                number="1"
                color="bg-blue-600"
                title="Enter Details"
                desc="Quickly fill in your clients information, item descriptions, quantities, and prices."
              />
              {/* Step 2 */}
              <StepCard
                number="2"
                color="bg-green-600"
                title="Choose Template"
                desc="Browse our gallery of professionally designed templates. Pick one that matches your brand."
              />
              {/* Step 3 */}
              <StepCard
                number="3"
                color="bg-yellow-500"
                title="Preview Invoice"
                desc="See exactly how your invoice will look before sending it. Make adjustments with ease."
              />
              {/* Step 4 */}
              <StepCard
                number="4"
                color="bg-cyan-500"
                title="Download & Save"
                desc="Download your invoice as a PDF, send it directly via email, or save it for future records."
              />
            </div>
          </div>
        </section>

        {/* ================= Features Section ================= */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-500 mb-4">
                Why Choose InvoX?
              </h2>
            </div>

            {/* Feature 1: Easy Details */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2 relative group">
                {/* Mockup Frame */}
                <div className="bg-gray-100 rounded-xl p-4 shadow-2xl border border-gray-200 transform group-hover:scale-[1.02] transition duration-500">
                  <div className="aspect-video bg-white rounded-lg overflow-hidden border border-gray-100 relative">
                    {/* Abstract Representation of UI */}
                    <div className="h-full w-full bg-gray-50 flex flex-col p-6 gap-4">
                      <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="h-10 bg-white border rounded"></div>
                        <div className="h-10 bg-white border rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Easy to fill invoice details
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul className="space-y-4">
                  <ListItem text="Curated list of templates from gallery" />
                  <ListItem text="Add your logo and invoice details" />
                  <ListItem text="Tailor fields to your needs" />
                </ul>
              </div>
            </div>

            {/* Feature 2: Dashboard */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2 relative group">
                <div className="bg-gray-100 rounded-xl p-4 shadow-2xl border border-gray-200 transform group-hover:scale-[1.02] transition duration-500">
                  <div className="aspect-video bg-white rounded-lg overflow-hidden border border-gray-100 grid grid-cols-3 gap-2 p-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded border h-full w-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold text-sm mb-2">
                  New Feature
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Beautiful Dashboard
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="space-y-4">
                  <ListItem text="View previous invoices" />
                  <ListItem text="Your saved invoices with thumbnail" />
                  <ListItem text="Track invoice status" />
                </ul>
              </div>
            </div>

            {/* Feature 3: Send Instantly */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2 relative group">
                <div className="bg-gray-100 rounded-xl p-4 shadow-2xl border border-gray-200 transform group-hover:scale-[1.02] transition duration-500">
                  <div className="aspect-video bg-white rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="bg-white p-6 rounded-lg shadow-xl w-2/3 z-10 border">
                      <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 bg-blue-50 border border-blue-200 rounded w-full mb-2"></div>
                      <div className="h-8 bg-blue-600 rounded w-1/3 ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Send invoices instantly
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="space-y-4">
                  <ListItem text="Send invoices without leaving the app" />
                  <ListItem text="One click to email clients" />
                  <ListItem text="Send unlimited invoices" />
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA Section ================= */}
        <section className="py-24 bg-blue-600 text-white text-center px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Ready to Streamline Your Invoicing?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands of freelancers and small businesses who trust
              InvoX. Start creating professional invoices today.
            </p>
            <button className="bg-yellow-400 text-blue-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-300 transition shadow-2xl hover:shadow-yellow-400/20 transform hover:-translate-y-1">
              Start Generating Invoices Now
            </button>
          </div>
        </section>

        {/* ================= Footer ================= */}
        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <img src="./logo.png" className="h-8 w-8 " />
                </div>
                <span className="text-2xl font-bold tracking-tight">InvoX</span>
              </div>
              <div className="flex space-x-6">
                <SocialIcon Icon={Twitter} />
                <SocialIcon Icon={Facebook} />
                <SocialIcon Icon={Linkedin} />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2025 InvoX. All Rights Reserved.</p>
              <p className="mt-2 md:mt-0">
                Crafted for freelancers and small businesses.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
const StepCard = ({ number, color, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group">
    <div
      className={`w-20 h-20 ${color} text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
    >
      {number}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const ListItem = ({ text }) => (
  <li className="flex items-center gap-3 text-gray-700">
    <CheckCircle className="h-5 w-5 text-blue-500 shrink-0" />
    <span>{text}</span>
  </li>
);

const SocialIcon = ({ Icon }) => (
  <a
    href="#"
    className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition duration-300 text-gray-300 hover:text-white"
  >
    <Icon className="h-5 w-5" />
  </a>
);
export default LandingPage;
