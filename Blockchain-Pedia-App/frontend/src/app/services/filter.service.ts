import {Injectable} from '@angular/core';
import {BlockchainDTO} from "../dto/BlockchainDTO";
import axios, {AxiosRequestConfig} from "axios";
import {Routes} from "../dto/routes";
import {BlockchainCategory} from "../dto/enum/BlockchainCategory";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _isFiltered: boolean = false
  private readonly _maxFilterValue = 99999999999
  private readonly _minFilterValue = 0

  constructor() {
    this._requestError = false
    this._config = {
      headers: {},
      params: {}
    }
    this.getAllBlockchains()
    // this.getBlockchainsRecommendation()
    this._showCategories = false
    this._showCategoriesSorter = false;
    this._showTrCount = false
    this._showTrSorter = false
    this._showPowerConsumption = false
    this._showPowerSorter = false
    this._showPricePerTr = false
    this._showPriceSorter = false
    this._showMarketCap = false
    this._showMarketSorter = false
    this._selectedCategory = this._categories[0]
    this._selectedCategorySorter = this._sorterCategory[0]
    this._selectedTrCount = this._transactionCounts[0]
    this._selectedTrSorter = this._sorterCategory[0]
    this._selectedPowerConsumption = this._powerConsumptions[0]
    this._selectedPowerConsumptionSorter = this._sorterCategory[0]
    this._selectedPricePerTr = this._pricePerTrs[0]
    this._selectedPriceSorter = this._sorterCategory[0]
    this._selectedMarketCap = this._marketCaps[0]
    this._selectedMarketSorter = this._sorterCategory[0]
    this._selectedFilter = this._filterCategory[0]
    this._selectedOrder = 'asc'
    this._selectedSorterField = this._sorterCategoryField[0]
    this._minimumValue = ''
    this._maximumValue = ''
  }

  private _selectedFilter: string;

  get selectedFilter(): string {
    return this._selectedFilter;
  }

  set selectedFilter(value: string) {
    this._selectedFilter = value;
  }

  private _selectedSorterField: string;

  get selectedSorterField(): string {
    return this._selectedSorterField;
  }

  set selectedSorterField(value: string) {
    this._selectedSorterField = value;
  }

  private _selectedOrder: string;

  get selectedOrder(): string {
    return this._selectedOrder;
  }

  set selectedOrder(value: string) {
    this._selectedOrder = value;
  }

  private _minimumValue: string;

  get minimumValue(): string {
    return this._minimumValue;
  }

  set minimumValue(value: string) {
    this._minimumValue = value;
  }

  private _maximumValue: string;

  get maximumValue(): string {
    return this._maximumValue;
  }

  set maximumValue(value: string) {
    this._maximumValue = value;
  }

  private _filterCategory = ['category', 'marketCap', 'powerConsumption', 'pricePerTransaction', 'transactionCount'];

  get filterCategory(): string[] {
    return this._filterCategory;
  }

  set filterCategory(value: string[]) {
    this._filterCategory = value;
  }

  private _sorterCategoryField = ['marketCap', 'powerConsumption', 'pricePerTransaction', 'transactionCount'];

  get sorterCategoryField(): string[] {
    return this._sorterCategoryField;
  }

  set sorterCategoryField(value: string[]) {
    this._sorterCategoryField = value;
  }

  private _config: AxiosRequestConfig

  get config(): AxiosRequestConfig {
    return this._config;
  }

  set config(value: AxiosRequestConfig) {
    this._config = value;
  }

  private _requestError: boolean

  get requestError(): boolean {
    return this._requestError;
  }

  set requestError(value: boolean) {
    this._requestError = value;
  }

  private _error: String = ''

  get error(): String {
    return this._error;
  }

  set error(value: String) {
    this._error = value;
  }

  private _blockchainList: BlockchainDTO[] = []

  get blockchainList(): BlockchainDTO[] {
    return this._blockchainList;
  }

  set blockchainList(value: BlockchainDTO[]) {
    this._blockchainList = value;
  }

  private _blockchainRecommendationList: BlockchainDTO[] = []

  get blockchainRecommendationList(): BlockchainDTO[] {
    return this._blockchainRecommendationList;
  }

  set blockchainRecommendationList(value: BlockchainDTO[]) {
    this._blockchainRecommendationList = value;
  }

  private _showCategories: boolean;

  get showCategories(): boolean {
    return this._showCategories;
  }

  set showCategories(value: boolean) {
    this._showCategories = value;
  }

  private _showCategoriesSorter: boolean;

  get showCategoriesSorter(): boolean {
    return this._showCategoriesSorter;
  }

  set showCategoriesSorter(value: boolean) {
    this._showCategoriesSorter = value;
  }

  private _showTrCount: boolean;

  get showTrCount(): boolean {
    return this._showTrCount;
  }

  set showTrCount(value: boolean) {
    this._showTrCount = value;
  }

  private _showPowerConsumption: boolean;

  get showPowerConsumption(): boolean {
    return this._showPowerConsumption;
  }

  set showPowerConsumption(value: boolean) {
    this._showPowerConsumption = value;
  }

  private _showTrSorter: boolean;

  get showTrSorter(): boolean {
    return this._showTrSorter;
  }

  set showTrSorter(value: boolean) {
    this._showTrSorter = value;
  }

  private _showPriceSorter: boolean;

  get showPriceSorter(): boolean {
    return this._showPriceSorter;
  }

  set showPriceSorter(value: boolean) {
    this._showPriceSorter = value;
  }

  private _showPowerSorter: boolean;

  get showPowerSorter(): boolean {
    return this._showPowerSorter;
  }

  set showPowerSorter(value: boolean) {
    this._showPowerSorter = value;
  }

  private _showPricePerTr: boolean;

  get showPricePerTr(): boolean {
    return this._showPricePerTr;
  }

  set showPricePerTr(value: boolean) {
    this._showPricePerTr = value;
  }

  private _showMarketCap: boolean;

  get showMarketCap(): boolean {
    return this._showMarketCap;
  }

  set showMarketCap(value: boolean) {
    this._showMarketCap = value;
  }

  private _showMarketSorter: boolean;

  get showMarketSorter(): boolean {
    return this._showMarketSorter;
  }

  set showMarketSorter(value: boolean) {
    this._showMarketSorter = value;
  }

  private _sorterCategory = ['', 'Ascending', 'Descending']

  get sorterCategory(): string[] {
    return this._sorterCategory;
  }

  set sorterCategory(value: string[]) {
    this._sorterCategory = value;
  }

  private _categories = ['Any', 'Public', 'Hybrid', 'Private']

  get categories(): string[] {
    return this._categories;
  }

  set categories(value: string[]) {
    this._categories = value;
  }

  private _transactionCounts = ['Any', '0 - 100 mil.', '100 mil. - 200 mil.', '200 mil. - 300 mil.', '300 mil. - 500 mil.', '500 mil. - 1 bil.', '> 1 bil.']

  get transactionCounts(): string[] {
    return this._transactionCounts;
  }

  set transactionCounts(value: string[]) {
    this._transactionCounts = value;
  }

  private _powerConsumptions = ['Any', '0 - 0.005', '0.005 - 0.01', '0.01 - 0.05', '0.05 - 0.1', '0.1 - 1', '> 1']

  get powerConsumptions(): string[] {
    return this._powerConsumptions;
  }

  set powerConsumptions(value: string[]) {
    this._powerConsumptions = value;
  }

  private _pricePerTrs = ['Any', '0 - 1', '1 - 100', '100 - 500', '500 - 1000', '> 1000']

  get pricePerTrs(): string[] {
    return this._pricePerTrs;
  }

  set pricePerTrs(value: string[]) {
    this._pricePerTrs = value;
  }

  private _marketCaps = ['Any', '0 - 5 bil.', '5 bil. - 15 bil.', '15 bil. - 100 bil.', '> 100 bil.']

  get marketCaps(): string[] {
    return this._marketCaps;
  }

  set marketCaps(value: string[]) {
    this._marketCaps = value;
  }

  private _selectedCategory: string;

  get selectedCategory(): string {
    return this._selectedCategory;
  }

  set selectedCategory(value: string) {
    this._selectedCategory = value;
  }

  private _selectedCategorySorter: string;

  get selectedCategorySorter(): string {
    return this._selectedCategorySorter;
  }

  set selectedCategorySorter(value: string) {
    this._selectedCategorySorter = value;
  }

  private _selectedTrCount: string;

  get selectedTrCount(): string {
    return this._selectedTrCount;
  }

  set selectedTrCount(value: string) {
    this._selectedTrCount = value;
  }

  private _selectedTrSorter: string;

  get selectedTrSorter(): string {
    return this._selectedTrSorter;
  }

  set selectedTrSorter(value: string) {
    this._selectedTrSorter = value;
  }

  private _selectedPowerConsumption: string;

  get selectedPowerConsumption(): string {
    return this._selectedPowerConsumption;
  }

  set selectedPowerConsumption(value: string) {
    this._selectedPowerConsumption = value;
  }

  private _selectedPowerConsumptionSorter: string;

  get selectedPowerConsumptionSorter(): string {
    return this._selectedPowerConsumptionSorter;
  }

  set selectedPowerConsumptionSorter(value: string) {
    this._selectedPowerConsumptionSorter = value;
  }

  private _selectedPricePerTr: string;

  get selectedPricePerTr(): string {
    return this._selectedPricePerTr;
  }

  set selectedPricePerTr(value: string) {
    this._selectedPricePerTr = value;
  }

  private _selectedPriceSorter: string;

  get selectedPriceSorter(): string {
    return this._selectedPriceSorter;
  }

  set selectedPriceSorter(value: string) {
    this._selectedPriceSorter = value;
  }

  private _selectedMarketCap: string;

  get selectedMarketCap(): string {
    return this._selectedMarketCap;
  }

  set selectedMarketCap(value: string) {
    this._selectedMarketCap = value;
  }

  private _selectedMarketSorter: string;

  get selectedMarketSorter(): string {
    return this._selectedMarketSorter;
  }

  set selectedMarketSorter(value: string) {
    this._selectedMarketSorter = value;
  }

  public formatCategory(category: BlockchainCategory) {
    switch (category) {
      case BlockchainCategory.HYBRID:
        return "Hybrid"
      case BlockchainCategory.PRIVATE:
        return "Private"
      case BlockchainCategory.PUBLIC:
        return "Public"
    }
  }

  toggleCategory() {
    let temp = this.showCategories
    this.closeAllFilters()
    this.closeAllSorters()
    this.showCategories = !temp
  }

  closeAllFilters() {
    this.showCategories = false
    this.showMarketCap = false
    this.showTrCount = false
    this.showPowerConsumption = false
    this.showPricePerTr = false
  }

  closeAllSorters() {
    this.showCategoriesSorter = false
    this.showMarketSorter = false
    this.showTrSorter = false
    this.showPowerSorter = false
    this.showPriceSorter = false
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.toggleCategory();
  }

  toggleCategorySorter() {
    let temp = this.showCategoriesSorter
    this.closeAllFilters()
    this.closeAllSorters()
    this.showCategoriesSorter = !temp
  }

  selectCategorySorter(type: string) {
    this.selectedCategorySorter = type
    this.toggleCategorySorter();
  }

  toggleTrCount() {
    let temp = this.showTrCount
    this.closeAllFilters()
    this.closeAllSorters()
    this.showTrCount = !temp
  }

  selectTrCount(trCount: string) {
    this.selectedTrCount = trCount
    this.toggleTrCount()
  }

  toggleTrSorter() {
    let temp = this.showTrSorter
    this.closeAllFilters()
    this.closeAllSorters()
    this.showTrSorter = !temp
  }

  selectTrSorter(type: string) {
    this.selectedTrSorter = type
    this.toggleTrSorter()
  }

  togglePowerConsumption() {
    let temp = this.showPowerConsumption
    this.closeAllFilters()
    this.closeAllSorters()
    this.showPowerConsumption = !temp
  }

  selectPowerConsumption(powerConsumption: string) {
    this.selectedPowerConsumption = powerConsumption
    this.togglePowerConsumption()
  }

  togglePowerSorter() {
    let temp = this.showPowerSorter
    this.closeAllFilters()
    this.closeAllSorters()
    this.showPowerSorter = !temp
  }

  selectPowerSorter(type: string) {
    this.selectedPowerConsumptionSorter = type
    this.togglePowerSorter()
  }

  togglePricePerTr() {
    let temp = this.showPricePerTr
    this.closeAllFilters()
    this.closeAllSorters()
    this.showPricePerTr = !temp
  }

  selectPricePerTr(pricePerTr: string) {
    this.selectedPricePerTr = pricePerTr
    this.togglePricePerTr()
  }

  togglePriceSorter() {
    let temp = this.showPriceSorter
    this.closeAllFilters()
    this.closeAllSorters()
    this.showPriceSorter = !temp
  }

  selectPriceSorter(type: string) {
    this.selectedPriceSorter = type
    this.togglePriceSorter()
  }

  toggleMarketCap() {
    let temp = this.showMarketCap
    this.closeAllFilters()
    this.closeAllSorters()
    this.showMarketCap = !temp
  }

  selectMarketCap(marketCap: string) {
    this.selectedMarketCap = marketCap
    this.toggleMarketCap()
  }

  toggleMarketSorter() {
    let temp = this.showMarketSorter
    this.closeAllFilters()
    this.closeAllSorters()
    this.showMarketSorter = !temp
  }

  selectMarketSorter(type: string) {
    this.selectedMarketSorter = type
    this.toggleMarketSorter()
  }

  extractMinAndMax(str: string, field: string) {
    if (field == "category") {
      if (str == "Public") this._minimumValue = String(-3)
      else if (str == "Private") this._minimumValue = String(-2)
      else this._minimumValue = String(-1)
      this._maximumValue = '9999999999999'
    } else {
      if (str[0] != '>') {
        //first part
        let minimum = Number(str.substring(0, str.indexOf(' ')));
        //if contains mil in first part we multiply by 1000000
        if (str[str.indexOf(' ') + 1] == 'm') this._minimumValue += String(minimum * 1000000)
        else if (str[str.indexOf(' ') + 1] == 'b') this._minimumValue += String(minimum * 1000000000)
        else this._minimumValue += minimum

        //for second part
        let next = str.substring(str.indexOf('-') + 2, str.length)
        if (next.indexOf('m') != -1) {
          this._maximumValue += String(Number(next.substring(0, next.indexOf('m'))) * 1000000);
        } else if (next.indexOf('b') != -1) {
          let number = Number(next.substring(0, next.indexOf(' ')))
          this._maximumValue += String(number * 1000000000)
        } else this._maximumValue += next
      } else if (field == 'price') {
        this._minimumValue += String(1000)
        this._maximumValue += '999999999999'
      } else if (field == 'power') {
        this._minimumValue += String(5000)
        this._maximumValue += '999999999999'
      } else {
        let extract = Number(str.substring(2, str.indexOf('b')))
        this._minimumValue += String(extract * 1000000000)
        this._maximumValue += '999999999999'
      }
    }
  }

  selectedSorting(str: string) {
    if (str == 'Ascending') this._selectedOrder = 'asc';
    else this._selectedOrder = 'desc';
  }

  updateBlockchainList(category: string, trCount: string, power: string, price: string, marketCap: string, categorySorter: string, trCountSorter: string, powerSorter: string, priceSorter: string, marketCapSorter: string) {
    this._isFiltered = true;
    this.getBlockchainsRecommendation()
    let numberSelectedFilter = 0
    if (category != 'Any') {
      this.extractMinAndMax(category, 'category');
      this._selectedFilter = this._filterCategory[0];
      numberSelectedFilter++
    }
    if (trCount != 'Any') {
      if (numberSelectedFilter != 0) {
        this._minimumValue += ','
        this._maximumValue += ','
        this.extractMinAndMax(trCount, '');
        this._selectedFilter += ','
        this._selectedFilter += this._filterCategory[4];
      } else {
        this._selectedFilter = this._filterCategory[4];
        this.extractMinAndMax(trCount, '');
      }
      numberSelectedFilter++
    }
    if (power != 'Any') {
      if (numberSelectedFilter != 0) {
        this._minimumValue += ','
        this._maximumValue += ','
        this.extractMinAndMax(power, 'power');
        this._selectedFilter += ','
        this._selectedFilter += this._filterCategory[2];
      } else {
        this._selectedFilter = this._filterCategory[2];
        this.extractMinAndMax(power, 'power');
      }
      numberSelectedFilter++
    }
    if (price != 'Any') {
      if (numberSelectedFilter != 0) {
        this._minimumValue += ','
        this._maximumValue += ','
        this.extractMinAndMax(price, 'price');
        this._selectedFilter += ','
        this._selectedFilter += this._filterCategory[3];
      } else {
        this._selectedFilter = this._filterCategory[3];
        this.extractMinAndMax(price, 'price');
      }
      numberSelectedFilter++
    }
    if (marketCap != 'Any') {
      if (numberSelectedFilter != 0) {
        this._minimumValue += ','
        this._maximumValue += ','
        this.extractMinAndMax(marketCap, '');
        this._selectedFilter += ','
        this._selectedFilter += this._filterCategory[1];
      } else {
        this._selectedFilter = this._filterCategory[1];
        this.extractMinAndMax(marketCap, '');

      }
      numberSelectedFilter++
    }

    if (categorySorter != '') {
      this._selectedSorterField = this._filterCategory[0];
      this.selectedSorting(category);
    } else if (trCountSorter != 'Any') {
      this._selectedSorterField = this._filterCategory[4];
      this.selectedSorting(trCountSorter);
    } else if (powerSorter != 'Any') {
      this._selectedSorterField = this._filterCategory[2];
      this.selectedSorting(powerSorter)
    } else if (priceSorter != 'Any') {
      this._selectedSorterField = this._filterCategory[3];
      this.selectedSorting(priceSorter)
    } else if (marketCapSorter != 'Any') {
      this._selectedSorterField = this._filterCategory[1];
      this.selectedSorting(marketCapSorter)
    }
    if (numberSelectedFilter != 0) {
      this._config.params = {
        sortBy: this._selectedSorterField,
        order: this._selectedOrder,
        min: this._minimumValue,
        max: this._maximumValue,
        filterBy: this._selectedFilter
      }
      this.axiosGetBlockchainsRequest(Routes.makePath(Routes.BLOCKCHAINS_ENDPOINT), this._config)
      this._maximumValue = ''
      this._minimumValue = ''
      this._selectedFilter = this._filterCategory[0]
      this._selectedOrder = ''

    } else {
      this._config.params = {}
      this.axiosGetBlockchainsRequest(Routes.makePath(Routes.BLOCKCHAINS_ENDPOINT), this._config)
    }
  }

  private getAllBlockchains() {
    this.axiosGetBlockchainsRequest(Routes.makePath(Routes.BLOCKCHAINS_ENDPOINT), this._config)
  }

  private axiosGetBlockchainsRequest(endpointPath: string, config: AxiosRequestConfig) {
    axios.get(endpointPath, config)
      .then(response => {
        console.dir(response)
        this._blockchainList = response.data;
      })
      .catch((e) => {
        this._requestError = true
        this._error = e.response.statusText
        console.log(e)
      });
  }

  private getBlockchainsRecommendation() {
    let _trCountFilterValues = this.parseFilter(this.selectedTrCount)
    let _powerConsumptionFilterValues = this.parseFilter(this.selectedPowerConsumption)
    let _pricePerTrFilterValues = this.parseFilter(this.selectedPricePerTr)
    let _marketCapFilterValues = this.parseFilter(this.selectedMarketCap)
    let localConfig = {
      params: {
        type: this.selectedCategory,
        maxPricePerTransaction: _pricePerTrFilterValues.max,
        minPricePerTransaction: _pricePerTrFilterValues.min,
        maxTransactionCount: _trCountFilterValues.max,
        minTransactionCount: _trCountFilterValues.min,
        maxMarketCap: _marketCapFilterValues.max,
        minMarketCap: _marketCapFilterValues.min,
        maxPowerConsumption: _powerConsumptionFilterValues.max,
        minPowerConsumption: _powerConsumptionFilterValues.min,
      }
    }
    axios.get(Routes.makePath(Routes.BLOCKCHAIN_RECOMMENDATIONS_ENDPOINT), localConfig)
      .then(response => {
        console.dir(response)
        this._blockchainRecommendationList = response.data;
      })
      .catch((e) => {
        this._requestError = true
        this._error = e.response.statusText
        console.log(e)
      });
  }

  get isFiltered(): boolean {
    return this._isFiltered;
  }

  set isFiltered(value: boolean) {
    this._isFiltered = value;
  }

  private parseFilter(filter: string) {
    if (filter == 'Any') {
      return {min: this._minFilterValue, max: this._maxFilterValue}
    } else if (filter.includes('>')) {
      filter = filter.replace('>', '')
      return {min: this.parseValue(filter), max: this._maxFilterValue}
    } else {
      let values = filter.split('-')
      return {min: this.parseValue(values[0]), max: this.parseValue(values[1])}
    }
  }

  private parseValue(filter: string) {
    filter = filter.replace(' ', '')
    if (filter.includes('bil.')) {
      filter = filter.replace('bil.', '')
      return parseInt(filter) * 1000000000
    }
    if (filter.includes('mil.')) {
      filter = filter.replace('mil.', '')
      return parseInt(filter) * 1000000
    }
    let filterNumber = parseInt(filter)
    return filterNumber
  }
}
