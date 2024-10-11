import axios from "axios";
import { toast } from "react-toastify";
import { ROUTE_LOGIN } from "@/data/routes";

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
      onError(status, error.response?.data?.detail);
    } else {
      onError(undefined, error);
    }
  }
};

export const handleError = (status: number | undefined, error: any) => {
  let message: string = "";

  console.log(error);
  // Check if the error is due to connection issues
  if (!error?.response) {
    // This indicates a connection error (like ERR_CONNECTION_REFUSED)
    message = "We will be back soon.";
    toast.info(message);
    return;
  }
  switch (status) {
    case 403:
      toast.error(error ? error : "Please login to continue!");
      window.location.replace(ROUTE_LOGIN);
      break;
    case 404:
      message = error ? error : "Provided data was not found";
      toast.error(message);
      break;
    case 409:
      message = error ? error : "Provided data already exists";
      toast.error(message);
      break;
    case 500:
      toast.error(error ? error : "Internal server error");
      break;
    default:
      toast.error(error ? error : "Something goes wrong!");
      window.location.replace(ROUTE_LOGIN);
      break;
  }
};
