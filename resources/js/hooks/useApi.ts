import { ApisEnum } from '@/configs/apisEnum';
import { IAxiosPostProps, IAxiosProps, IUseDELETEProps, IUseGetProps, IUsePOSTProps, IUsePUTProps } from '@/interfaces/IAxiosProps';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useAxios } from './useAxios';

const host = ApisEnum.BaseUrl;
const headersImage = { 'content-type': 'multipart/form-data' };

export const axiosGET = async <Params>(
  axios: AxiosInstance,
  { url, params, headers = {}, responseType = 'json', customHost = host }: IAxiosProps<Params>,
) => {
  const response = await axios.get(`${customHost}${url}`, {
    params,
    headers,
    responseType,
  });
  return response.data;
};

export const axiosPOST = <Data, Paras>(
  axios: AxiosInstance,
  { url, data, params, headers = {}, customHost = host }: IAxiosPostProps<Data, Paras>,
) => {
  return axios.post(`${customHost}${url}`, data, {
    params,
    headers,
  });
};

export const axiosPUT = <Data, Paras>(axios: AxiosInstance, { url, data, params, headers = {} }: IAxiosPostProps<Data, Paras>) => {
  return axios.put(`${host}${url}`, data, {
    params,
    headers,
  });
};

export const axiosDELETE = <Params>(axios: AxiosInstance, { url }: IAxiosProps<Params>) => {
  return axios.delete(`${host}${url}`);
};

export function useGET<Response>({
  filters = {},
  url,
  nameQuery = url,
  headers = {},
  enable = true,
  responseType = 'json',
  customHost,
}: IUseGetProps): UseQueryResult<Response> {
  const { axiosApi } = useAxios();
  return useQuery({
    queryKey: [nameQuery, filters],
    queryFn: async () => await axiosGET(axiosApi, { url, params: filters, headers, responseType, customHost }),
    retry: false,
    enabled: enable,
    refetchOnWindowFocus: false,
  });
}

export function usePUT<Response>({
  url,
  isFile = false,
  onSuccess = () => {},
  onError = () => {},
}: IUsePUTProps): UseMutationResult<AxiosResponse<Response>> {
  let headers = {};
  if (isFile) headers = headersImage;
  const { axiosApi } = useAxios();
  return useMutation({
    mutationFn: (data) => axiosPUT(axiosApi, { url, data, headers }),
    onSuccess,
    onError,
  });
}

export function usePOST<Request>({
  url,
  onSuccess = () => {},
  onError = () => {},
  isFile = false,
  customHost,
}: IUsePOSTProps): UseMutationResult<AxiosResponse<Request>> {
  let headers = {};

  if (isFile) headers = headersImage;
  const { axiosApi } = useAxios();
  return useMutation({
    mutationFn: (data) => axiosPOST(axiosApi, { url, data, headers, customHost }),
    onSuccess,
    onError,
  });
}

export function useDELETE<Request>({ url, onSuccess = () => {}, onError = () => {} }: IUseDELETEProps): UseMutationResult<AxiosResponse<Request>> {
  const { axiosApi } = useAxios();
  return useMutation({
    mutationFn: () => axiosDELETE(axiosApi, { url }),
    onSuccess,
    onError,
  });
}
