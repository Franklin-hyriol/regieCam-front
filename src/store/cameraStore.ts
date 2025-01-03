import { create } from 'zustand';
import { Signal, Cameraman } from '../types';

interface CameraStore {
  cameramen: Cameraman[];
  addCameraman: (name: string) => void;
  setSignal: (id: string, signal: Signal) => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
  cameramen: [],
  addCameraman: (name: string) => {
    set((state) => ({
      cameramen: [
        ...state.cameramen,
        {
          id: crypto.randomUUID(),
          name,
          signal: 'green',
        },
      ],
    }));
  },
  setSignal: (id: string, signal: Signal) => {
    set((state) => ({
      cameramen: state.cameramen.map((cam) => {
        if (cam.id === id) {
          return { ...cam, signal };
        }
        // If setting red signal, set all others to green
        if (signal === 'red') {
          return { ...cam, signal: 'green' };
        }
        return cam;
      }),
    }));
  },
}));