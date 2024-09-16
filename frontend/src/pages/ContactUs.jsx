import React from 'react';
// import Header from '../Components/Header';  // Assuming you have a Header component
// import Footer from '../Components/footer';  // Assuming you have a Footer component
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUsPage = () => {
    const adminDetails = {
        address: 'Near Wahdat Road, Naqsha Stop, Lahore',
        phone: '+92 321 9792864',
        email: 'Irtazafoods1@gmail.com',
    };

    return (
        <>
            {/* Header */}
            

            <div className="min-h-screen bg-gray-100 py-12 mt-32">
                <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-yellow-600 mb-6 text-center">Contact Us</h1>
                    <p className="text-lg text-gray-700 mb-10 text-center">
                        We would love to hear from you! You can reach us via any of the methods below:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Address */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-yellow-600 text-white p-4 rounded-full">
                                <FaMapMarkerAlt size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Our Address</h2>
                                <p className="text-gray-700 mt-2">{adminDetails.address}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-yellow-600 text-white p-4 rounded-full">
                                <FaPhoneAlt size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Phone</h2>
                                <p className="text-gray-700 mt-2">{adminDetails.phone}</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-yellow-600 text-white p-4 rounded-full">
                                <FaEnvelope size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Email</h2>
                                <p className="text-gray-700 mt-2">{adminDetails.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Have any queries?</h2>
                        <p className="text-lg text-gray-700 mt-4">
                            Feel free to send us an email or give us a call. We're here to help!
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            {/* <Footer /> */}
        </>
    );
};

export default ContactUsPage;
