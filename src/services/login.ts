import { getJson } from '@utils/http';

export async function signIn(loginFormFields: ILoginFormFields) {
  const options: RequestInit = {
    body: JSON.stringify(loginFormFields),
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  };

  const signInUrl = `/api/login`;

  const response = await getJson(signInUrl, options) as ILoginResult;

  return response.data;
}
