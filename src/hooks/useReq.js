import { useAuth } from "./useAuth";

export const useReq = () => {
  const { getItem } = useAuth();
  const token = getItem("user");

  const getReq = async (url) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "GET",
      headers: {
        'Authorization': token,
      },
    });
    return response;
  };

  const postReq = async (url, body) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
        method: "POST",
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      return response;
  }

  const postFormData = async (url, body) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
        method: "POST",
        headers: {
          'Authorization': token,
        },
        body
      });
      return response;
  }

  const putReq = async (url, body) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
        method: "PUT",
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      return response;
  }

  const putFormData = async (url, body) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
        method: "PUT",
        headers: {
          'Authorization': token,
        },
        body
      });
      return response;
  }

  const deleteReq = async (url) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "DELETE",
      headers: {
        'Authorization': token,
      },
    });
    return response;
  };

  return { getReq, postReq, putReq, deleteReq, postFormData, putFormData };
};
