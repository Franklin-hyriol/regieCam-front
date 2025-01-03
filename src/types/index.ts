export type Signal = 'red' | 'orange' | 'green';

export interface Cameraman {
  id: string;
  name: string;
  signal: Signal;
}

export interface Camera {
  id: number;
  name: string;
  status: string;
  used: boolean;
}