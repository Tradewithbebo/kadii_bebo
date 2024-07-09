import axios from "axios";

const baseUrl = 'https://beboapi.onrender.com/' || 'http://localhost:3000/';

interface Auth {
  authToken: string;
}

const getAuthToken = (): string | null => {
  const auth = localStorage.getItem("stk-apk");
  if (auth) {
    const parsedAuth: Auth = JSON.parse(auth);
    return parsedAuth.authToken;
  }
  return null;
};

const getAuthConfig = () => {
  const token = getAuthToken();
  if (token) {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export async function AxiosPost(url: string, dataObject: any) {
  try {
    console.log(`Making POST request to: ${baseUrl}${url}`);
    const res = await axios.post(`${baseUrl}${url}`, dataObject, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function AxiosAuthPost(url: string, dataObject: any) {
  const authConfig = getAuthConfig();

  try {
    const res = await axios.post(`${baseUrl}${url}`, dataObject, authConfig);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function AxiosAuthPut(url: string, dataObject: any) {
  const authConfig = getAuthConfig();

  try {
    const res = await axios.put(`${baseUrl}${url}`, dataObject, authConfig);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function AxiosDelete(url: string, dataObject?: any) {
  const authConfig = getAuthConfig();

  if (dataObject) {
    try {
      const res = await axios.delete(`${baseUrl}${url}`, {
        data: dataObject,
        ...authConfig,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  } else {
    try {
      const res = await axios.delete(`${baseUrl}${url}`, authConfig);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

export async function AxiosMultiDelete(url: string, dataObject: any) {
  const authConfig = getAuthConfig();

  try {
    const res = await axios.delete(`${baseUrl}${url}`, {
      data: dataObject,
      ...authConfig,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function AxiosFormData(url: string, dataObject: any) {
  const token = getAuthToken();
  const formConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.post(`${baseUrl}${url}`, dataObject, formConfig);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function AxiosFormDataPut(url: string, dataObject: any) {
  const token = getAuthToken();
  const formConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.put(`${baseUrl}${url}`, dataObject, formConfig);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function AxiosGet(url: string) {
  const authConfig = getAuthConfig();

  try {
    const res = await axios.get(`${baseUrl}${url}`, authConfig);
    return res.data;
  } catch (err) {
    throw err;
  }
}
