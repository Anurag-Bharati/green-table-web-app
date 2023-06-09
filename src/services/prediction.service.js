import axios from "axios";
const api = process.env.NEXT_PUBLIC_PREDICTION_API || "http://localhost:8080";

export const predict = async (data) => {
  const response = await axios.post(`${api}/predict`, { data: data });
  return response.data;
};

// check if the prediction service is running
export const healthCheck = async () => {
  try {
    const response = await axios.get(api);
    return { state: "loaded", health: response.data };
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
