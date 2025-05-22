import axios, { AxiosInstance } from 'axios'
import { ApisEnum } from './apisEnum'

export const axiosApi: AxiosInstance = axios.create({
  baseURL: ApisEnum.BaseUrl.toString(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
