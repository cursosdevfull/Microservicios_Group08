export default class {
  static get PORT(): number {
    return +process.env.PORT || 3000;
  }

  static get PATH_ORDER(): string {
    return process.env.PATH_ORDER || "http://localhost:3001";
  }
}
