import { ExpenseEndpoints } from "./expense.endpoints";
import { TokenEndpoints } from "./token.endpoints";
import { UserEndpoints } from "./user.endpoints";

export class Endpoints {
  static token = new TokenEndpoints();
  static user = new UserEndpoints();
  static expense = new ExpenseEndpoints();
};