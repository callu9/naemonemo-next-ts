export const RESPONSE_MESSAGE = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
} as const;

export const HTTP_METHOD = {
  CONNECT: "CONNECT",
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
  TRACE: "TRACE",
} as const;

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_METHOD_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  PAYLOAD_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const RESPONSE_BAD_REQUEST = {
  message: RESPONSE_MESSAGE.FAILURE,
  code: null,
  data: null,
  errors: { code: HTTP_STATUS_CODE.BAD_REQUEST, message: "허용된 요청문이 아닙니다." },
} as const;

export const RESPONSE_NOT_METHOD_ALLOWED = {
  message: RESPONSE_MESSAGE.FAILURE,
  code: null,
  data: null,
  errors: { code: HTTP_STATUS_CODE.NOT_METHOD_ALLOWED, message: "유효한 요청 메서드가 아닙니다." },
} as const;

export const RESPONSE_NOT_FOUND = {
  message: RESPONSE_MESSAGE.FAILURE,
  code: null,
  data: null,
  errors: { code: HTTP_STATUS_CODE.NOT_FOUND, message: "유효한 요청 URL이 아닙니다." },
} as const;

export const RESPONSE_REQUEST_TIMEOUT = {
  message: RESPONSE_MESSAGE.FAILURE,
  code: null,
  data: null,
  errors: {
    code: HTTP_STATUS_CODE.REQUEST_TIMEOUT,
    message: "서버 응답이 지연되어 요청이 실패했습니다",
  },
} as const;
