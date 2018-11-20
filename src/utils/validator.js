import { getResource } from '@constants/resource';

export function numberRangeValidator(min, max) {
  return (rule, value, callback) => {
    if (isNaN(value)) {
      callback();
      return;
    }
    const num = parseFloat(value, 10);
    if (num < min || num > max) {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}

export function managerSizeValidator(max) {
  return (rule, value, callback) => {
    if (!(value instanceof Array)) {
      callback();
      return;
    }
    if (value.length > max) {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}

export function ownersSizeValidator(max) {
  return (rule, value, callback) => {
    if (!(value instanceof Array)) {
      callback();
      return;
    }
    if (value.length < max) {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}
export function ownersSizeValidatorMinMax(min, max) {
  return (rule, value, callback) => {
    if (!(value instanceof Array)) {
      callback();
      return;
    }
    if (value.length < min || value.length > max) {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}

export function mtophostValidator() {
  return (rule, value, callback) => {
    if (value ==='mtophost') {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}

export function ipListSizeValidator(max) {
  return (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
    const ipList = value.split('\n');
    if (ipList.length > max) {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}

export function ipListRuleValidator() {
  return (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
    const ipList = value.split('\n');
    const hasError = ipList.find((item) => {
      const i = item.indexOf(':');
      if (i === -1) {
        return true;
      }
      const ip = item.slice(0, i);
      if (!IP_REGEXP.test(ip)) {
        return true;
      }
      const arr = item.split(':');
      if (arr.some(itm => itm === '')) {
        return true;
      }
      if (arr.length !== 2) {
        return true;
      }
      const port = arr[1];
      if (!PORT_REGEXP.test(port) || port === '') {
        return true;
      }
      return false;
    });
    if (hasError) {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}
export function isJsonString() {
  return (rule, value, callback) => {
    if (value) {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === 'object' && obj) {
          callback();
        } else {
          callback(getResource(rule.message));
        }
      } catch (err) {
        callback(getResource(rule.message));
      }
      return;
    }
    callback();
  };
}
export function simplyJsonString() {
  return (rule, value, callback) => {
    if (value) {
      try {
        JSON.parse(value);
      } catch (e) {
        callback(getResource(rule.message));
      }
    }
    callback();
  };
}
export function payloadDataSize() {
  return (rule, value, callback) => {
    if (value) {
      try {
        const str = encodeURI(value);
        if (typeof str === 'string' && str.length < 65535) {
          callback();
        } else {
          callback(getResource(rule.message));
        }
      } catch (err) {
        callback(getResource(rule.message));
      }
      return;
    }
    callback();
  };
}
export function bolValidator() {
  return (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
    if (value !== 'false' || value !== 'true') {
      callback(getResource(rule.message));
      return;
    }
    callback();
  };
}

export function IsURL() {
  return (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
    const strRegex =
      '^((https|http|ftp|rtsp|mms)?://)' +
      '?(([0-9a-z_!~*().&=+$%-]+: )?[0-9a-z_!~*().&=+$%-]+@)?' + // ftp的user@
      '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
      '|' + // 允许IP和DOMAIN（域名）
      '([0-9a-z_!~*()-]+.)*' + // 域名- www.
      '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
      '[a-z]{2,6})' + // first level domain- .com or .museum
      '(:[0-9]{1,4})?' + // 端口- :80
      '((/?)|' + // a slash isn't required if there is no file name
      '(/[0-9a-z_!~*().;?:@&=+$,%#-]+)+/?)$';
    const re = new RegExp(strRegex);
    if (re.test(value)) {
      callback();
    } else {
      callback(getResource(rule.message));
      return false;
    }
    callback();
  };
}

export function requestParamsValidator(value, record) {
  let error = '';
  switch (record.type) {
    case 'String':
      // 如果是必传参数, 可以允许为空, 任意字符, 长度必须小于 128
      error = getResource('page.advancedForm.editableGrid.validator.string.message');
      if (record.required && /^(|.{0,128})$/.test(value)) {
        error = '';
      } else if (!record.required && /^(.{1,128})$/.test(value)) {
        error = '';
      }
      break;
    case 'Boolean':
      error = getResource('page.advancedForm.editableGrid.validator.boolean.message');
      // 如果是必传参数, 可以允许为空, 必须是true/false
      if (record.required && /^(|true|false)$/.test(value)) {
        error = '';
      } else if (!record.required && /^(true|false)$/.test(value)) {
        error = '';
      }
      break;
    case 'Number':
      error = getResource('page.advancedForm.editableGrid.validator.number.message');
      value = value.replace(/\s/g, '');
      // 如果是必传参数, 可以允许为空, 必须是数字
      if (record.required && (value === '' || !isNaN(value))) {
        error = '';
      } else if (!record.required && value !== '' && !isNaN(value)) {
        error = '';
      }
      break;
    default:
      break;
  }
  return error;
}


export const IP_REGEXP = /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/;
export const HEALTH_CHECK_URL_REGEXP = /^\/[/a-zA-Z0-9_.-]*$/;
export const HEALTH_CHECK_PORT_REGEXP = /^[0-9]*$/;
export const CLUSTER_NAME_REGEXP = /^[a-zA-Z0-9.]*$/;
export const PROTECT_THRESHOLD_REGEXP = /^(0\.[0-9]{1,2}|1\.0|1|0)$/;
export const DOMAIN_NAME_REGEXP = /^[a-z0-9.]*$/;
export const PORT_REGEXP = /^[0-9]*$/;
export const WEIGHT_REGEXP = /^([0-9]|[1-9][0-9]|100)$/;
export const CASE_NAME_REGEXP = /^[A-Za-z0-9_]*$/;
// mtop > create API
export const CREATE_API_BASECONFIG_NAME_REGEXP = /^([a-zA-Z0-9]+\.){2,}[a-zA-Z0-9]+$/;
export const CREATE_API_BASECONFIG_VERSION_REGEXP = /^([a-zA-Z0-9]+.)*[a-zA-Z0-9]+$/;
export const CREATE_API_REQUESTCONFIG_TIMEOUT_REGEXP = /^([1-9]|10)$/;
// export const CREATE_API_SERVICES_HOST = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const CREATE_API_REQUESTPARAMS_NAME_REGEXP = /^[a-zA-Z_]{1}[a-zA-Z0-9_]{0,63}$/;
export const CREATE_API_REQUESTPARAMS_DESC_REGEXP = /^.{0,128}$/;
export const CREATE_API_SERVICES_REGEXP = /^([a-zA-Z0-9_]+\.)*[a-zA-Z0-9_]+$/;
export const CREATE_API_VIPSERVER_REGEXP = /^[a-zA-Z0-9-\.]*$/;
export const CREATE_API_SERVICES_PACH_REGEXP = /^\/([a-zA-Z0-9_\.\-\/])*[a-zA-Z0-9_]+$/; // 需要‘/’也能通过
export const CREATE_API_SERVICES_METHOD_REGEXP = /^([a-zA-Z_]+\.)*[a-zA-Z0-9_]+$/;
export const CREATE_API_SERVICESCONFIG_PARAMMAPPING_PARAMNAME_REGEXP = /^[a-zA-Z_]{1}[a-zA-Z0-9_]{0,63}$/;
export const CREATE_API_SERVICESCONFIG_PARAMMAPPING_PARAMTYPE_REGEXP = /^([a-zA-Z_]+.)*([a-zA-Z0-9_].)*([a-zA-Z0-9_]|([a-zA-Z0-9_]\[\]))$/;
export const CREATE_API_SERVICESCONFIG_PARAMMAPPING_MAPPINGFIELD_REGEXP = /^.+$/;
// API管理用于校验输入值
export const API_PATTERN_NUMBER_REGEXP = /^\d{1,}\.{0,1}\d{0,}$/;
export const API_PATTERN_BOOLEAN_REGEXP = /^(true)|(false)$/;
// API编辑规则校验
export const API_PATTERN_EDIT_NUMBER_REGEXP = /\d{1,}\.{0,1}\d{0,}/;
export const API_PATTERN_EDIT_STRING_REGEXP = /^\w$/;
// accs pattern
export const ADD_SERVICEID_REGEXP = /^[^|]{1,128}$/;
export const QUERY_CONTENT_REGEXP = /^[^|]{1,128}$/;
export const QUERY_SERVICEID_REGEXP = /^[^|]{1,128}$/;
export const QUERY_VALIDTIME_REGEXP = /^[0-9]*$/;
// api app
export const GROUPNAME_REGEXP = /^\S{4,64}$/;
export const GROUPCODE_REGEXP = /^[a-z][-a-z0-9]*([a-z]|[0-9])$/;
export const APPCODE_REGEXP = /^[a-z][-a-z]*[a-z]$/;
// orange configDialog
export const CONFIGDIALOG_NAME_REGEXP = /^[0-9A-Za-z_]{4,64}$/;