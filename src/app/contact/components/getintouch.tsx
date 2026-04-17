'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Map } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [searchLocation, setSearchLocation] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = () => {
    // Placeholder for future functionality
    console.log('Form submitted:', formData);
  };

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 text-sm md:text-lg">
                Whether you&apos;re an institute, scientist, or innovator, we&apos;re here to support your journey in the African science ecosystem.
              </p>
            </div>

            {/* Our Location */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-100">
                  <MapPin className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Our Location</h3>
                <p className="text-gray-600 text-sm lg:text-[16px]">AfriScience Hub Headquarters</p>
                <p className="text-gray-600 text-sm lg:text-[16px]">123 Innovation Drive, Tech District</p>
                <p className="text-gray-600 text-sm lg:text-[16px]">Lagos, Nigeria</p>
              </div>
            </div>

            {/* Phone Support */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-100">
                  <Phone className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm lg:text-[16px]">Main: +234 916 000 3305</p>
                <p className="text-gray-600 text-sm lg:text-[16px]">Alt: +234 916 000 3306</p>
                <p className="text-gray-600 text-sm lg:text-[16px]">Mon-Fri 8am-6pm WAT</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-100">
                  <Mail className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm lg:text-[16px]">contact@afrisciencehub.com</p>
                <p className="text-gray-600 text-sm lg:text-[16px]">support@afrisciencehub.com</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-100 rounded-lg p-8 border border-gray-400">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <textarea
                  name="message"
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />

                <button
                  onClick={handleSendMessage}
                  className="w-full cursor-pointer bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Map Section */}
          <div className="space-y-4">
            {/* Get Directions Header */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-bold text-gray-900">Get Directions</h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Map className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 011 1v2h4a1 1 0 011 1v3h-1v10a1 1 0 01-1 1H4a1 1 0 01-1-1v-10H2V8a1 1 0 011-1h4V5zm4 1h4V5H7v1zm0 6h4v-1H7v1zm4 0v4h-1v-4h1zm3-4v4h-1V8h1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col lg:flex-row gap-2 text-black">
                  <input
                    type="text"
                    placeholder="Enter your location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors">
                    Go
                  </button>
                </div>

                <button className="w-full text-gray-600 text-sm bg-red-100 cursor-pointer hover:text-gray-900 transition-colors flex items-center justify-center gap-2 py-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Use My Current Location
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 h-150">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8465521815336!2d3.4267!3d6.4969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b6a9d4d4d4d%3A0x1234567890!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social Media Icons */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 flex justify-center gap-6">
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </button>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <FaFacebook className="h-6 w-6" />
              </button>
              <button className="text-blue-400 hover:text-blue-500 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </button>
              <button className="text-pink-600 hover:text-pink-700 transition-colors">
                <FaInstagram className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
