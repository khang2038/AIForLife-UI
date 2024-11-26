import apiRequest from '../api/apiRequests';

export const getCustomers = async () => {
  try {
    const res = await apiRequest.get('admin/contact-customer', {});

    return res.data;
  } catch (err) {
    console.log(err);
  }
};