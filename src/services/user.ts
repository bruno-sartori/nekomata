import Request from '@utils/request';

export async function getUserInfo(authToken: string) {
  const url = `/user`;
  const response = await Request.get(url, undefined, authToken) as IUserInfoResult;

  return response.data;
}
