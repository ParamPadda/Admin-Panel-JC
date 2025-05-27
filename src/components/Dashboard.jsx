import React from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faLightbulb, faHeart } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="text-center mb-10">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Junior Creator Admin Panel</h1> */}
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-wide mb-1">
          Welcome, <span className="text-pink-600">Junior Creator Admin</span>
        </h1>
        <p className="text-lg text-gray-600">
          <FontAwesomeIcon icon={faUserShield} className="text-blue-600 mr-2" />
          You have the power to inspire the next generation of young writers and creators.
        </p>
        
      </div>

      {/* Motivational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-xl bg-white text-center hover:scale-105 transition-transform duration-300">
          <img
            src="https://images.pexels.com/photos/7869231/pexels-photo-7869231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Empower"
            className="h-48 w-full object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold mt-4 text-blue-700">Empower Young Minds</h2>
          <p className="text-gray-600 mt-2">
            Your guidance helps shape curious learners into confident creators.
          </p>
        </Card>

        <Card className="shadow-xl bg-white text-center hover:scale-105 transition-transform duration-300">
          <img
            src="https://images.pexels.com/photos/4161916/pexels-photo-4161916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Creativity"
            className="h-48 w-full object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold mt-4 text-purple-700">Spark Creativity</h2>
          <p className="text-gray-600 mt-2">
            Every blog, task, or quiz you manage fuels a student's imagination.
          </p>
        </Card>

        <Card className="shadow-xl bg-white text-center hover:scale-105 transition-transform duration-300">
          <img
            src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Inspire"
            className="h-48 w-full object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold mt-4 text-pink-700">Lead with Passion</h2>
          <p className="text-gray-600 mt-2">
            A passionate admin lights the path for future innovators.
          </p>
        </Card>
      </div>

      {/* Motivational Lines */}
      <footer className="text-center max-w-2xl  mt-7 mx-auto text-gray-700 italic text-base">
        <p>"Great admins don’t just manage; they inspire, nurture, and create opportunities."</p>
        <p className="mt-2">Thank you for your dedication and the positive change you bring every day.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
