export class Routes {
  static readonly BLOCKCHAINS_ENDPOINT = "blockchains/all"
  static readonly BLOCKCHAIN_RECOMMENDATIONS_ENDPOINT = "blockchains/recommendations"
  static readonly CHARTS_SORT_ENDPOINT = "charts/sort"
  static readonly CHARTS_FILTER_ENDPOINT = "charts/filter"
  static readonly CHARTS_ORDER_ENDPOINT = "charts/order"
  static readonly CHARTS_FILE_ENDPOINT = "charts"
  private static readonly HOST = "http://127.0.0.1:8000/";

  static makePath(endpointPath: string) {
    return this.HOST + endpointPath;
  }

  static makeStaticPath(image: string) {
    return this.HOST + 'static/' + image
  }
}
