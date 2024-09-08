import axios from 'axios';
import { OEIData, AEIData } from '../peiRequests/types/peiType';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const processText = async (text: string) => {
  try {
    const response = await api.post('/process_text', { text });
    return response.data;
  } catch (error) {
    console.error('Error processing text:', error);
    throw error;
  }
};

export const processOEI = async (data: OEIData) => {
  try {
    const response = await api.post('/process_oei', data);
    return response.data;
  } catch (error) {
    console.error('Error processing OEI:', error);
    throw error;
  }
};

export const processAEI = async (data: AEIData) => {
  try {
    const response = await api.post('/process_aei', data);
    return response.data;
  } catch (error) {
    console.error('Error processing AEI:', error);
    throw error;
  }
};

export default api;