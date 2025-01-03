
import axios from 'axios';
import { updateAdmin } from '../api/url';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Camera, Users } from 'lucide-react';

export const Home = () => {

  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleCameraman = () => {
    const role = localStorage.getItem('role');

    if (role) {
      navigate("/pilot")
      return;
    }

    axios.get(updateAdmin)
      .then(response => {
        if (response.data.free) {
          setShowMessage(true);
        } else {
          localStorage.setItem('role', 'pilot');
          navigate("/pilot")
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }

  const handleResolve = () => {
    const cameraId = localStorage.getItem('cameraId');
    if (cameraId) {
      navigate(`/cameraman/${cameraId}`);
    } else {
      navigate(`/cameraman`);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Camera Signal Management
          </h1>
          <span className='block mb-4 text-red-500'>{showMessage ? 'Un utilisateur est déjà connecté en tant que pilote' : ''}</span>
          <div className="space-y-4">
            <button
              onClick={handleCameraman}
              className="flex items-center justify-center space-x-3 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              {/* <Users size={24} /> */}
              <span>Enter as Pilot</span>
            </button>
            <button
              onClick={() => handleResolve()}
              className="flex items-center justify-center space-x-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors w-full"
            >
              {/* <Camera size={24} /> */}
              <span>Enter as Cameraman</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};