import React from 'react';
import { ArrowRight, Building2, Shield, Clock, UserPlus, Activity, Phone } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-blue-800">CureHub</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Services</a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Doctors</a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">About</a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Contact</a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <a href="/login" className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">Log In</a>
              <a href="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm">Sign Up</a>
            </div>
            <div className="flex items-center sm:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", backgroundBlendMode: "overlay", backgroundColor: "rgba(59, 130, 246, 0.2)" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center sm:text-left max-w-lg">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Healthcare Management</span>
              <span className="block text-blue-200">Simplified</span>
            </h1>
            <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
              CureHub provides an integrated platform for managing patient care, appointments, and hospital resources with efficiency and care.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Get Started
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-100 bg-blue-800/50 hover:bg-blue-800/70 md:py-4 md:text-lg md:px-10">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Pattern Background */}
      <div className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" 
             style={{ 
               backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" 
             }}>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to manage healthcare
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our comprehensive system streamlines hospital operations and enhances patient care.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <UserPlus className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Patient Management</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Streamlined patient registration, record-keeping, and medical history tracking.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Appointment Scheduling</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Efficient scheduling system for appointments with real-time availability.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Resource Management</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Optimize the allocation of beds, equipment, and staff resources.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Secure Data</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  HIPAA-compliant security measures to protect sensitive patient information.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Billing & Insurance</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Integrated billing system with insurance verification and claim processing.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Analytics & Reporting</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Comprehensive dashboards and reports for data-driven decision making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action with Background Image */}
      <div className="relative" style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}>
        <div className="absolute inset-0 bg-blue-900/80"></div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                Log In
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500">
                Sign Up <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials with Card Design */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by healthcare professionals
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/women/43.jpg" alt="Dr. Rebecca Chen" />
              </div>
              <p className="text-gray-600 italic text-center">
                "CureHub has transformed how we manage patient care. The intuitive interface has made our workflows much more efficient."
              </p>
              <div className="mt-4 text-center">
                <h4 className="font-medium text-gray-900">Dr. Rebecca Chen</h4>
                <p className="text-sm text-gray-500">Chief of Medicine, Central Hospital</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="James Thompson" />
              </div>
              <p className="text-gray-600 italic text-center">
                "The scheduling system alone has saved our staff countless hours. CureHub is an essential tool for modern healthcare facilities."
              </p>
              <div className="mt-4 text-center">
                <h4 className="font-medium text-gray-900">James Thompson</h4>
                <p className="text-sm text-gray-500">Hospital Administrator</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/women/65.jpg" alt="Dr. Sarah Lin" />
              </div>
              <p className="text-gray-600 italic text-center">
                "Patient satisfaction has improved dramatically since implementing CureHub. The streamlined processes have reduced wait times significantly."
              </p>
              <div className="mt-4 text-center">
                <h4 className="font-medium text-gray-900">Dr. Sarah Lin</h4>
                <p className="text-sm text-gray-500">Director of Patient Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by hospitals worldwide
            </h2>
            <p className="mt-3 text-xl text-blue-200 sm:mt-4">
              Our platform helps healthcare providers deliver better patient care
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Hospitals
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                500+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Patient Records
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                10M+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Countries
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                30+
              </dd>
            </div>
          </dl>
        </div>
      </div>

     
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Patient Management</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Scheduling</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Billing</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">API Status</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" /> 
                  <span className="text-base text-gray-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-base text-gray-300">info@curehub.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-base text-gray-300">123 Healthcare Ave, Medical District</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 CureHub Healthcare Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;