import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera } from '../types';
import axios from 'axios';
import { backendUrl, getallcam, updatecamUsed } from '../api/url';
import { getSignalColor } from '../helpers/getSignalColor';
import { io } from 'socket.io-client';
// import { Home as HomeIcon } from 'lucide-react';


const socket = io(backendUrl, {
  transports: ['websocket'],
});

export const Cameraman: React.FC = () => {

  const [cameramen, setCameramen] = useState<Camera[] | null>(null);
  const navigate = useNavigate();

  const handleUpdatecamUsed = (id: number) => {
    axios.patch(`${updatecamUsed}/${id}`, {
      used: true,
    })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("cameraId", id.toString());
          navigate(`/cameraman/${id}`);
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }


  const fetchCameramen = useCallback(async () => {
    axios.get(getallcam)
      .then(response => {
        setCameramen(response.data);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }, []);

  useEffect(() => {
    fetchCameramen();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    const handleSignal = () => {
      fetchCameramen();
    };

    socket.on('signal', handleSignal);
    return () => {
      socket.off('signal', handleSignal);
    };
  }, [fetchCameramen]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Select Your Camera</h1>
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            {/* <HomeIcon size={20} /> */}
            <span>Home</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cameramen && cameramen.map((cam) => (
            (!cam.used && <>
              <button
                key={cam.id}
                onClick={() => handleUpdatecamUsed(cam.id)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-medium mb-2">{cam.name}</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getSignalColor(
                      cam.status
                    )}`}
                  />
                  <span className="capitalize">{cam.status}</span>
                </div>
              </button>
            </>)
          ))}
        </div>
      </div>
    </div>
  );
};