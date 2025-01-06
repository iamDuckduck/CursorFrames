import axios from "axios";
import { acceptedFile } from "../entities/acceptedFile";
import { aniPostObject } from "../entities/aniPostObject";

const baseURL =
  import.meta.env.VITE_ENV !== "production"
    ? "http://localhost:3000/api/"
    : import.meta.env.VITE_BACK_END;

const axiosInstance = axios.create({
  baseURL: baseURL,
  responseType: "blob",
});

class APIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  gifToFramesPost = (data: acceptedFile) => {
    const formData = new FormData(); //wrap the file with FormData
    formData.append("file", data);
    return axiosInstance
      .post(this.endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data); // return the blob data here
  };

  aniToFramesPost = (aniObject: aniPostObject) => {
    return axiosInstance
      .post(this.endpoint, aniObject, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
  };
}

export default APIClient;
