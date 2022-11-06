export class Routes {
  static readonly BLOCKCHAINS_ENDPOINT = "blockchains"
  private static readonly HOST = "http://127.0.0.1:8000/";

  static makePath(endpointPath: string) {
    return this.HOST + endpointPath;
  }

  static makeStaticPath(image: string) {
    this.HOST + 'static/' + image
  }
}
