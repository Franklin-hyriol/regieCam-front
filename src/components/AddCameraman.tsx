import React, { useState } from 'react';
import axios from 'axios';
import { createcam } from '../api/url';
import { Socket } from 'socket.io-client';
// import { UserPlus } from 'lucide-react';

interface AddCameramanProps {
  updateCamList: () => void;
  socket: Socket;
}

export const AddCameraman: React.FC<AddCameramanProps> = ({ updateCamList, socket }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // addCameraman(name.trim());
      axios.post(createcam, {
        name: name
      })
        .then(response => {
          if (response.status == 201) {
            setMessage("Cameraman ajouter avec success");
            updateCamList()
            socket.emit('signal', { message: 'change' });
          }
        })
        .catch(error => {
          if (error.status == 409) {
            setMessage("Ce nom d'utilisateur est deja utilisé");
          }
          console.error('Erreur :', error);
        });

      setName('');

    }
  };


  return (
    <>
      <span className='block mb-4 text-red-500'>{message}</span>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter cameraman name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          {/* <UserPlus size={20} /> */}
          <span>Add Cameraman</span>
        </button>
      </form>
    </>
  );
};