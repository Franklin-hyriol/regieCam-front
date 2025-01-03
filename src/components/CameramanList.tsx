import { SignalButton } from './SignalButton';
import { Camera, Signal } from '../types';

type CameramanListProps = {
  camera: Camera[];
  onSignalChange: (id: number, signal: Signal) => void; // Callback pour signaler un changement
  deleteCamById: (id: number) => void;
};

export const CameramanList: React.FC<CameramanListProps> = ({ camera, onSignalChange, deleteCamById }) => {

  return (
    <div className="space-y-4">

      {camera.map((cam) => (
        <div key={cam.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-4 h-4 rounded-full ${cam.status === 'red' ? 'bg-red-500' : cam.status === 'orange' ? 'bg-orange-500' : 'bg-green-500'}`}
            />
            <span className="font-medium">{cam.name}</span>
          </div>
          <div className="flex items-center space-x-2">

            <div>{cam.used ? "true" : "false"}</div>

            <SignalButton
              color="red"
              onClick={() => onSignalChange(cam.id, 'red')}
            />
            <SignalButton
              color="orange"
              onClick={() => onSignalChange(cam.id, 'orange')}
            />
            <SignalButton
              color="green"
              onClick={() => onSignalChange(cam.id, 'green')}
            />
            <button title='delete cam' className="bg-gray-500 text-white px-2 py-1 rounded" onClick={() => deleteCamById(cam.id)}>
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};