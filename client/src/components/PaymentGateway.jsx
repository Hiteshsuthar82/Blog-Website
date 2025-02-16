import axios from 'axios';
import React, { useState } from 'react';

const PaymentGateway = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const apiurl = import.meta.env.VITE_API_URL


  // Prefilled payment details
  const paymentDetails = {
    amount: 499.99,
    company: "XYZ Solutions",
    orderId: "ORD-2025-0215",
    customerName: "John Doe",
    email: "johndoe@gmail.com"
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Log payment details
    console.log('Payment initiated:', {
      timestamp: new Date().toISOString(),
      ...paymentDetails,
      paymentMethod: 'Credit Card'
    });
    
    const response = await axios.patch(
        `${apiurl}/user/upgrade-to-premium`,
        {},
        { withCredentials: true }
      );
      if (response?.data.success) {
          // Simulate payment processing
        //   setTimeout(() => {
            setIsProcessing(false);
            setShowToast(true);
            console.log('Payment completed successfully');
            
            // Hide toast and redirect after 3 seconds
            setTimeout(() => {
              setShowToast(false);
              window.location.href = '/'; // Redirect to home
            }, 2000);
        //   }, 2000);
      }

  };

  return (
    <>
      {/* Success Toast - Now positioned fixed relative to viewport */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}>
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium text-lg">Payment Successful!</span>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="text-2xl font-bold text-center mb-8 text-gray-800">Secure Payment</div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center gap-5">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold">${paymentDetails.amount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center gap-5">
                      <span className="text-gray-600">Company</span>
                      <span className="font-semibold">{paymentDetails.company}</span>
                    </div>
                    
                    <div className="flex justify-between items-center gap-5">
                      <span className="text-gray-600">Order ID</span>
                      <span className="font-semibold">{paymentDetails.orderId}</span>
                    </div>
                    
                    <div className="flex justify-between items-center gap-5">
                      <span className="text-gray-600">Customer</span>
                      <span className="font-semibold">{paymentDetails.customerName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center gap-5">
                      <span className="text-gray-600">Email</span>
                      <span className="font-semibold">{paymentDetails.email}</span>
                    </div>
                  </div>

                  <div className="mt-10">
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        'Pay Now'
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex justify-center space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;