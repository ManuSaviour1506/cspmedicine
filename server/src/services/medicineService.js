// client/src/services/medicineService.js
import API from './api';

const medicineService = {
  addMedicine: async (medicineData) => {
    const response = await API.post('/medicine/add', medicineData);
    return response.data;
  },
  getMedicines: async () => {
    const response = await API.get('/medicine');
    return response.data;
  },
  updateMedicine: async (id, medicineData) => {
    const response = await API.put(`/medicine/${id}`, medicineData);
    return response.data;
  },
  deleteMedicine: async (id) => {
    const response = await API.delete(`/medicine/${id}`);
    return response.data;
  },
};

export default medicineService;