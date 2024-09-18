/*
  Uses `as const` instead of enum as suggested by 
  Matt Pocock on "Enums considered harmful" 
  video: https://www.youtube.com/watch?v=jjMbPt_H3RQ 

  Usage:

  function handleError(errorCode: ErrorCode) {
    console.log(ERROR_CODE[errorCode]);
  }

  handleError(ERROR_CODE.API_ERROR);
*/

export const ERROR_CODE = {
  NO_INTERNET_CONNECTION: 'ERR_NO_INTERET_CONNECTION',
} as const;

export type ErrorCode = keyof typeof ERROR_CODE;
