import axios from "axios";

import {
  API_Notification_MESSAGES,
  SERVICE_URLS,
} from "../constants/config.js";

import { getAccessToken, getType } from "../components/utils/common-utils.js";

const API_URL = "https://blogappnewbackend.onrender.com";


const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Check if the request data is an instance of FormData
    if (config.data instanceof FormData) {
      // Let the browser set the Content-Type with the correct boundary
      delete config.headers["Content-Type"];
    }
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + '/' + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response.status === 200) {
    return { isSucess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.statusText || "Unknown error",
      code: response?.status,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    return {
      isError: true,
      msg: API_Notification_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    return {
      isError: true,
      msg: API_Notification_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    return {
      isError: true,
      msg: API_Notification_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    return axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method ==='DELETE'? {}:body,
      responseType: value.responseType,
      headers: {
        authorization:getAccessToken()
      },
      TYPE:getType(value,body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
  };
}

export { API };
