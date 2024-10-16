import axios from "axios";

const baseUrl = 'https://api.tradewithbebo.com/';

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
  } catch (err:any) {
    if (err.response && err.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem("stk-apk");
      // console.error("Token expired. Please log in again.");
      
    }
    throw err;
  }
}

export async function AxiosAuthPost(url: string, dataObject: any) {
  const authConfig = getAuthConfig();
  console.log('authConfig:',authConfig)
  try {
    const res = await axios.post(`${baseUrl}${url}`, dataObject, authConfig);
    return res.data;
  } catch (err:any) {
    if (err.response && err.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem("stk-apk");
      // console.error("Token expired. Please log in again.");
      
    }
    throw err;
  }
}
export async function AxiosAuthPostfile(url: string, dataObject: any, p0: { headers: { 'Content-Type': string; }; }) {
  const token = getAuthToken(); // Ensure this function is defined and working
  const authConfig = {
    headers: {
      "Content-Type": "multipart/form-data", // Automatically handled by axios
      Authorization: `Bearer ${token}`,
    },
  };

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
    
  } catch (err:any) {
    if (err.response && err.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem("stk-apk");
      // console.error("Token expired. Please log in again.");
      
    }
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
    }catch (err:any) {
      if (err.response && err.response.status === 401) {
        // Token is expired or invalid
        localStorage.removeItem("stk-apk");
        // console.error("Token expired. Please log in again.");
        
      }
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
  } catch (err:any) {
    if (err.response && err.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem("stk-apk");
      // console.error("Token expired. Please log in again.");
      
    }
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
  } catch (err:any) {
    if (err.response && err.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem("stk-apk");
      // console.error("Token expired. Please log in again.");
      
    }
    throw err;
  }
}
export async function AxiosAuthPatchfile(url: string, dataObject: any, p0: { headers: { 'Content-Type': string; }; }) {
  const token = getAuthToken(); // Ensure this function is defined and working
  const authConfig = {
    headers: {
      "Content-Type": "multipart/form-data", // Automatically handled by axios
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.patch(`${baseUrl}${url}`, dataObject, authConfig);
    return res.data;
  } catch (err) {
    throw err;
  }
}
