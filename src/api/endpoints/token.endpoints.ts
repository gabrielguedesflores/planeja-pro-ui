import { AbstractEndpoints } from './abstract.endpoints';

export class TokenEndpoints extends AbstractEndpoints {
  service = 'token';
  version = 'v1';

  login() {
    return `${this.getURL()}/login`;
  }

}
