import axios from 'axios';
import { services, debug } from '@public/config.json';

const EMAS_CONFIG = window._CONFIG_ || {
  mnaas: 'emas_config_undefined',
  dock: 'emas_config_undefined',
};
/**
 * 基于axios封装的请求通讯道
 * 暂时没有接入
 */
// 请求示例：
//  export async function queryPubSubTaskDetail(scope, api, v, taskId, page, pageSize) {
//   return new Promise(((resolve, reject) => {
//     request({
//       url: API.QUERY_API_PUBLISH_TASK_SUBTASKHOST,
//       type: 'json',
//       method: 'GET',
//       env: 'mtop',
//       data: {
//         scope,
//         api,
//         v,
//         taskId,
//         page,
//         pageSize,
//       },
//     }, (json) => {
//       if (!json.success) {
//         reject(`${json.message}(${json.errorCode})`);
//         return;
//       }
//       const data = json.model || {};
//       resolve(data);
//     }, () => {
//       reject(getResource('message.network_error'));
//     });
//   })).then((data) => {
//     return { error: false, data };
//   }).catch((error) => {
//     return { error: true, data: error };
//   });
// }
export default function request(options, suc, err) {
  if (!options.method) {
    options.method = 'GET';
  }

  if (!options.env) {
    options.env = 'local';
  }

  let base = null;
  // 如果本地调试开关被打开, 则域名按照 services
  if (debug) {
    base = services[options.env];
  }

  if (options.url.indexOf('mock/') === 0) {
    options.method = 'GET';
    base = '';
  }

  options.url = `${base || ''}${options.url}`;

  if (options.method.toUpperCase() === 'GET') {
    options.params = Object.assign({}, options.data, options.params);
  }

  return axios(options)
    .then((response) => {
      const res = response.data;
      if (res.errorCode === 100002) {
        const callbackUrl = encodeURIComponent(window.location.href);
        window.location = `${debug ? services.local : EMAS_CONFIG.dock}/login?callbackUrl=${callbackUrl}`;
        return res;
      }
      if (suc) {
        suc(res);
      } else {
        return res;
      }
    })
    .catch((error) => {
      const res = {
        errorCode: -1,
        msg: error ? error.message : 'unknow',
      };
      if (err) {
        err(res);
      } else {
        return res;
      }
    });
}
