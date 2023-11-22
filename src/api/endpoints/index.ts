import { ExpenseEndpoints } from "./expense.endpoints";
import { TokenEndpoints } from "./token.endpoints";
import { UploadEndpoints } from "./upload.endpoints";
import { UserEndpoints } from "./user.endpoints";

export class Endpoints {
  static token = new TokenEndpoints();
  static user = new UserEndpoints();
  static expense = new ExpenseEndpoints();
  static upload = new UploadEndpoints();
};