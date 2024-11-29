import apiRequest from '../api/apiRequests';

export const getDetails = async (id) => {
  try {
    const res = await apiRequest.get(`admin/review-call-detail-by-id?callHistoryId=${id}`, {});

    return res.data;
  } catch (err) {
    console.log(err);
  }
}