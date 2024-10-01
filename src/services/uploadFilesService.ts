import { api } from "@/utils/api";

class UploadFilesService {
  uploadTestimonials(files: any, onUploadProgress: any) {
    let formData = new FormData();

    formData.append("files", files);

    return api.post("/analysis/stu-perf-analysis", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
  uploadCaseStudies(files: any, onUploadProgress: any) {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    return api.post("api/training-data/upload-case-studies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
