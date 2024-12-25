import axios from 'axios';

export const importFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const res = await axios.post('https://fastapiser.onrender.com/predict-emotion/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json'
      }
    });

    return res.data;
  } catch (err) {
    console.error('Error while uploading file:', err);
    throw err;
  }
};
