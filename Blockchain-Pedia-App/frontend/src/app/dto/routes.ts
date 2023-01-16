export class Routes {
  static readonly BLOCKCHAINS_ENDPOINT = "blockchains/all"
  static readonly BLOCKCHAIN_RECOMMENDATIONS_ENDPOINT = "blockchains/recommendations"
  static readonly CHARTS_SORT_ENDPOINT = "charts/sort"
  static readonly CHARTS_FILTER_ENDPOINT = "charts/filter"
  static readonly CHARTS_ORDER_ENDPOINT = "charts/order"
  static readonly CHARTS_FILE_ENDPOINT = "charts"
  private static readonly HOST = "https://blockchainpediabe.onrender.com/";

  static makePath(endpointPath: string) {
    return this.HOST + endpointPath;
  }

  static makeStaticPath(image: string) {
    return this.HOST + 'static/' + image
  }
}
