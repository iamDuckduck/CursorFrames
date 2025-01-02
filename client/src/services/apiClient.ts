import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV !== "production"
      ? "http://localhost:3000/api/"
      : import.meta.env.VITE_BACK_END,
  headers: { "Content-Type": "multipart/form-data" }, //send
  responseType: "blob",
});

class APIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: File) => {
    const formData = new FormData(); //wrap the file with FormData
    formData.append("file", data);
    return axiosInstance.post(this.endpoint, formData).then((res) => res.data); // return the blob data here
  };
}

export default APIClient;
