
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const OrderTrackingPage = () => {
  const [status, setStatus] = useState('Order Confirmed');
  const [deliveryAgent] = useState({
    name: 'John Doe',
    phone: '123-456-7890',
  });
  const [location, setLocation] = useState({ lat: 15.33238, lng: 74.76507 });
  const [orderDetails, setOrderDetails] = useState({});
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('orderDetails'));
    if (storedOrder) {
      setOrderDetails(storedOrder);
      setAddress(storedOrder.deliveryAddress || '');
    }

    const statusUpdates = ['Order Confirmed', 'Picked Up', 'Out for Delivery', 'Delivered'];
    let currentStatusIndex = 0;
    const statusInterval = setInterval(() => {
      if (currentStatusIndex < statusUpdates.length) {
        setStatus(statusUpdates[currentStatusIndex]);
        currentStatusIndex++;
      } else {
        clearInterval(statusInterval);
      }
    }, 5000);

    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    if (address) {
      fetchCoordinatesFromAddress(address);
    }
  }, [address]);

  const cleanAddress = (address) => {
    return address.replace(/[^a-zA-Z0-9\s,.-]/g, '').trim();
  };

  const fetchCoordinatesFromAddress = async (addr) => {
    try {
      const formatted = `${cleanAddress(addr)}, India`;
      const query = encodeURIComponent(formatted);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
      const data = await res.json();

      if (data.length > 0) {
        setLocation({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      } else {
        console.warn('No search results found for address:', addr);
      }
    } catch (err) {
      console.error('Error fetching coordinates:', err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Order Tracking</h1>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Tracking Order ID: {orderDetails.orderID || 'N/A'}
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold">Order Status:</h3>
            <p className="text-lg text-green-500">{status}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold">Delivery Location:</h3>
            <p className="mb-2 text-sm">Address: {address}</p>
            <div className="w-full h-72">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: '0' }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01}%2C${location.lat - 0.01}%2C${location.lng + 0.01}%2C${location.lat + 0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                allowFullScreen
                title="Delivery Location Map"
              ></iframe>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold">Delivery Agent</h3>
            <p><strong>Name:</strong> {deliveryAgent.name}</p>
            <p><strong>Phone:</strong> {deliveryAgent.phone}</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => alert('Contacting Support...')}
              className="px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400 active:bg-blue-600 transition duration-200"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;