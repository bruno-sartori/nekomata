import Request from '@utils/request';

export async function getPatients(authToken: string) {
  const url = `/patients`;
  const response = await Request.get(url, undefined, authToken) as IPatientsResult;

  return response.data;
}
