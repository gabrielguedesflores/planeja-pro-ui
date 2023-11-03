import { AbstractEndpoints } from './abstract.endpoints';

export class ExpenseEndpoints extends AbstractEndpoints {
  service = 'expense';
  version = 'v1';

  get(id: any) {
    return `${this.getURL()}/user/${id}`;
  }

  post() {
    return `${this.getURL()}`;
  }

  update(expense: any) {
    return `${this.getURL()}/${expense}`;
  }

  delete(expense: any) {
    return `${this.getURL()}/${expense}`;
  }

}
