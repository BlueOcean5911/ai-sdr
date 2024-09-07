import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTE_LOGIN } from "@/data/routes";

const router = useRouter();

export const runService = async (
  data: any,
  service: (data: any) => Promise<any>,
  onSuccess: (data: any) => void,
  onError: (statusCode: number | undefined, error: any) => void
) => {
  try {
    const response = await service(data);
    onSuccess(response.data);
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      onError(status, error);
    } else {
      onError(undefined, error);
    }
  }
};

export const handleError = (status: number | undefined, error: any) => {
  console.log(error);
  switch (status) {
    case 401:
      toast.error("Please login to continue!");
      router.push(ROUTE_LOGIN);
      break;
    case 404:
      toast.error("Provided data was not found");
      break;
    case 409:
      toast.error("Provided data already exists");
      break;
    case 500:
      toast.error("Internal server error");
      break;
    default:
      toast.error("An error occurred");
      break;
  }
};
