import axios, { AxiosError } from "axios";

import { Account } from "@/types";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const refreshToken = async (): Promise<void> => {
  await apiClient.get("/auth/refresh");
};

export const getSharedByUUID = async (uuid: string) => {
  try {
    const response = await apiClient.get(`/shared-images/${uuid}`);

    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      await refreshToken();
      try {
        const response = await apiClient.get(`/shared-images/${uuid}`);

        return response.data;
      } catch (retryError) {
        throw retryError;
      }
    } else {
      throw error;
    }
  }
};

export const deleteSharedImage = async (uuid: string) => {
  try {
    const response = await apiClient.delete(`/shared-images/${uuid}`);

    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      await refreshToken();
      try {
        const response = await apiClient.delete(`/shared-images/${uuid}`);

        return response.data;
      } catch (retryError) {
        throw retryError;
      }
    } else {
      throw error;
    }
  }
};

export const shareImage = async (data: any): Promise<Account | null> => {
  try {
    const response = await apiClient.post<Account>("/shared-images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      await refreshToken();
      try {
        const response = await apiClient.post<Account>("/shared-images", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } catch (retryError) {
        throw retryError;
      }
    } else {
      throw error;
    }
  }
};

export const updateUserAccount = async (data: any): Promise<Account | null> => {
  try {
    const response = await apiClient.patch<Account>("/user", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      await refreshToken();
      try {
        const response = await apiClient.patch<Account>("/user", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } catch (retryError) {
        throw retryError;
      }
    } else {
      throw error;
    }
  }
};

export const getUser = async (): Promise<Account | null> => {
  try {
    const response = await apiClient.get<Account>("/user");

    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      await refreshToken();
      try {
        const response = await apiClient.get<Account>("/user");

        return response.data;
      } catch (retryError) {
        return null;
      }
    }

    return null;
  }
};
