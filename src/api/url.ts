const baseUrl = `${import.meta.env.VITE_URL}/api/v1/`
export const backendUrl = `${import.meta.env.VITE_URL}`;

// admin
export const updateAdmin = baseUrl + "updateadmi";
export const disconnectAdmin = baseUrl + "disconnect";


// Camera
export const createcam = baseUrl + "createcam";
export const getallcam = baseUrl + "getallcam";
export const updateCam = baseUrl + "updatecamName";
export const updatecamUsed = baseUrl + "updatecamUsed";
export const deleteCam = baseUrl + "deletecam";
export const getCamById = baseUrl + "getcam";
