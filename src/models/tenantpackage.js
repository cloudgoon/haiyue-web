import { message } from 'antd';
import router from 'umi/router';
import { TENANTPACKAGE_NAMESPACE } from '../actions/tenantpackage';
import { list, submit, detail, remove, select } from '../services/tenantpackage';

export default {
  namespace: TENANTPACKAGE_NAMESPACE,
  state: {
    data: {
      list: [],
      pagination: false,
    },
    detail: {},
    packageList: [],
  },
  effects: {
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(select, payload);
      if (response.success) {
        yield put({
          type: 'saveSelect',
          payload: {
            packageList: response.data,
          },
        });
      }
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response.success) {
        yield put({
          type: 'saveList',
          payload: {
            list: response.data.records,
            pagination: {
              total: response.data.total,
              current: response.data.current,
              pageSize: response.data.size,
            },
          },
        });
      }
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'saveDetail',
          payload: {
            detail: response.data,
          },
        });
      }
    },
    *clearDetail({ payload }, { put }) {
      yield put({
        type: 'removeDetail',
        payload: { payload },
      });
    },
    *submit({ payload }, { call }) {
      const response = yield call(submit, payload);
      if (response.success) {
        message.success('提交成功');
        router.push('/system/tenantPackage');
      }
    },
    *remove({ payload }, { call }) {
      const {
        data: { keys },
        success,
      } = payload;
      const response = yield call(remove, { ids: keys });
      if (response.success) {
        success();
      }
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload.detail,
      };
    },
    saveSelect(state, action) {
      return {
        ...state,
        packageList: action.payload.packageList,
      };
    },
    removeDetail(state) {
      return {
        ...state,
        detail: {},
      };
    },
  },
};
