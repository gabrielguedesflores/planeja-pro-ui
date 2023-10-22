import { AbstractEndpoints } from './abstract.endpoints';

export class ExpenseEndpoints extends AbstractEndpoints {
  service = 'expense';
  version = 'v1';

  get(id: any) {
    return `${this.getURL()}/user/${id}`;
  }

  update(id: any) {
    return `${this.getURL()}/user/${id}`;
  }

  delete(id: any) {
    return `${this.getURL()}/user/${id}`;
  }

}
