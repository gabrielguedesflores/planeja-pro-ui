import { AbstractEndpoints } from './abstract.endpoints';

export class UploadEndpoints extends AbstractEndpoints {
  service = 'upload';
  version = 'v1';

  post(id: string) {
    return `${this.getURL()}/user/${id}`;
  }

}
