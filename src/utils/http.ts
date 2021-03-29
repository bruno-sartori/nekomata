import 'es6-promise';
import 'isomorphic-fetch';

// Utils
import logger from '@utils/logger';

export async function getJson(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);

    if (response.status > 400) {
      logger.error(`${options.method || 'GET'}`, `${response.status} - ${url}`);
      throw response;
    }

    logger.success(`${options.method || 'GET'}`, `${response.status} - ${url}`);
    return response.json();
  } catch (err) {
    throw err;
  }
}
