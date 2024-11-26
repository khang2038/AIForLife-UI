import apiRequest from '../api/apiRequests';

export const getDetails = async () => {
  try {
    const res = await apiRequest.get(`admin/call-details/${id}`, {});

    return res.data;
  } catch (err) {
    console.log(err);
  }
};