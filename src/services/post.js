import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

export async function list(params) {
  return request(`/api/blade-system/post/list?${stringify(params)}`);
}

export async function select(params) {
  return request(`/api/blade-system/post/select?${stringify(params)}`);
}

export async function submit(params) {
  return request('/api/blade-system/post/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/post/detail?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/post/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}
