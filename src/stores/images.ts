import { defineStore } from "pinia";
import axios from "axios";
import { API_URL } from "../config/config";

export const useImagesStore = defineStore("useImagesStore", {
  state: () => ({
    images: [] as any,
  }),

  getters: {
    getImages(state) {
      return state.images;
    },
  },

  actions: {
    async fetchImages() {
      try {
        const data = await axios.get(`${API_URL}/images`);
        this.images = data.data;
      } catch (error: unknown) {
        const err: any = error;
        console.error(err.response.data.message);
        alert(err.response.data.message);
      }
    },
    async postImages(payload: FormData) {
      interface apiCallInterface extends Response {
        data: {
          file: string;
        };
      }
      try {
        const apiCall: apiCallInterface = await axios.post(
          `${API_URL}/uploads`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imagePath: any = apiCall.data.file;
        this.images.push(imagePath);
        alert("File uploaded successfully");
      } catch (error) {
        const err: any = error;
        console.error(err.response.data.message);
        alert(err.response.data.message);
      }
    },
  },
});
