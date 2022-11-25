import { defineStore } from "pinia";
import axios from "axios";
import { API_URL } from "../config/config";

export const useImagesStore = defineStore("useImagesStore", {
  state: () => ({
    images: [],
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
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    },
    async postImages(payload) {
      try {
        const data = await axios.post(`${API_URL}/uploads`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.images.push(data.data.file);
        alert("File uploaded successfully");
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    },
  },
});
