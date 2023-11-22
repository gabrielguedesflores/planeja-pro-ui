import { AbstractEndpoints } from './abstract.endpoints';

export class UserEndpoints extends AbstractEndpoints {
  service = 'users';
  version = 'v1';

  getUser(id: string) {
    return `${this.getURL()}/${id}`;
  }

  put(id: string) {
    return `${this.getURL()}/${id}`;
  }

}
