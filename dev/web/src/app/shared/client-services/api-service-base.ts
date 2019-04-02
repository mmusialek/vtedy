import { Consts } from '../consts/consts';

export abstract class ApiServiceBase {
  protected readonly baseApiUrl = Consts.apiUrl;
}
