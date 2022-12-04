export default class {
  static get PORT(): number {
    return +process.env.PORT || 3000;
  }

  static get PATH_ORDER(): string {
    return process.env.PATH_ORDER || "http://localhost:3001";
  }

  static get PATH_AUTH(): string {
    return process.env.PATH_AUTH || "http://localhost:3002";
  }
}
