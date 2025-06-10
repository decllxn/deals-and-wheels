// components/CustomUploadAdapter.js
import axios from 'axios';

export default class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(file => {
      const formData = new FormData();
      formData.append('upload', file);

      return axios.post('/api/upload-image/', formData)
        .then(response => ({ default: response.data.url }))
        .catch(error => {
          console.error('Image upload failed:', error);
          throw error;
        });
    });
  }

  abort() {
    // Implement abort functionality if needed
  }
}