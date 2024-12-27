import axios from 'axios';

export const importFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const res = await axios.post('http://127.0.0.1:8000/processing-predict', formData, {
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
