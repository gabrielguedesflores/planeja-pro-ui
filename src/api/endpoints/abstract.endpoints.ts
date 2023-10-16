export abstract class AbstractEndpoints {
  protected abstract version: string;
  protected abstract service: string;

  setService(service: string) {
    this.service = service;
    return this;
  }

  setVersion(version: string) {
    this.version = version;
    return this;
  }

  getURL(): string {
    return `${this.service}/${this.version}`;
  }
}
