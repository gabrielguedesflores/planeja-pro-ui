import { TokenEndpoints } from "./token.endpoints";
import { UserEndpoints } from "./user.endpoints";

export class Endpoints {
  static token = new TokenEndpoints();
  static user = new UserEndpoints();
};