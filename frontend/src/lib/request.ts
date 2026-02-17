import axios from 'axios';

const request = async <T = any>(url: string, options?: any): Promise<T> => {
  const { method = 'GET', params, data, headers, ...rest } = options || {};
  const response = await axios({
    url,
    method,
    params,
    data,
    headers,
    ...rest,
  });

  const res = response.data;
  if (res.code !== 200) {
    throw new Error(res.message || '请求失败');
  }
  return res.data;
};

export default request;
