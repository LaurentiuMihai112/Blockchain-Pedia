import {Injectable} from '@angular/core';
import {BlockchainDTO} from "../dto/BlockchainDTO";
import axios, {AxiosRequestConfig} from "axios";
import {Routes} from "../dto/routes";
import {BlockchainCategory} from "../dto/enum/BlockchainCategory";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {
    this._requestError = false
    this._config = {
      headers: {},
      params: {}
    }
    this.getAllBlockchains()
    this.getBlockchainsRecommendation()
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
    this.selectedFilter = this.filterCategory[0]
    this.selectedOrder = 'asc'
    this.selectedSorterField = this.sorterCategoryField[0]
    this.minimumValue = ''
    this.maximumValue = ''
  }

  private selectedFilter: string;
  private selectedSorterField: string;
  private selectedOrder: string;
  private minimumValue: string;
  private maximumValue: string;

  private _config: AxiosRequestConfig
  private _requestError: boolean
  private _error: String = ''
  private _blockchainList: BlockchainDTO[] = []
  private _blockchainRecommendationList: BlockchainDTO[] = []
  private _showCategories: boolean;
  private _showCategoriesSorter: boolean;
  private _showTrCount: boolean;
  private _showPowerConsumption: boolean;
  private _showTrSorter: boolean;
  private _showPriceSorter: boolean;
  private _showPowerSorter: boolean;
  private _showPricePerTr: boolean;
  private _showMarketCap: boolean;
  private _showMarketSorter: boolean;
  private filterCategory = ['category', 'marketCap', 'powerConsumption', 'pricePerTransaction', 'transactionCount'];
  private sorterCategoryField = ['marketCap', 'powerConsumption', 'pricePerTransaction', 'transactionCount'];
  private _sorterCategory = ['', 'Ascending', 'Descending']
  private _categories = ['Any', 'Public', 'Hybrid', 'Private']
  private _transactionCounts = ['Any', '0 - 100 mil.', '100 mil. - 200 mil.', '200 mil. - 300 mil.', '300 mil. - 500 mil.', '500 mil. - 1 bil.', '> 1 bil.']
  private _powerConsumptions = ['Any', '0 - 1000', '1000 - 2000', '2000 - 3000', '3000 - 5000', '>5000']
  private _pricePerTrs = ['Any', '0 - 100 mil.', '100 mil. - 200 mil.', '200 mil. - 300 mil.', '300 mil. - 400 mil.', '500 mil. - 1 bil.', '> 1 bil.']
  private _marketCaps = ['Any', '0 - 100.', '100 - 300', '300 - 500', '500 - 1000', '> 1000']


  get config(): AxiosRequestConfig {
    return this._config;
  }

  set config(value: AxiosRequestConfig) {
    this._config = value;
  }

  get requestError(): boolean {
    return this._requestError;
  }

  set requestError(value: boolean) {
    this._requestError = value;
  }

  get error(): String {
    return this._error;
  }

  set error(value: String) {
    this._error = value;
  }

  get blockchainList(): BlockchainDTO[] {
    return this._blockchainList;
  }

  set blockchainList(value: BlockchainDTO[]) {
    this._blockchainList = value;
  }

  get showCategories(): boolean {
    return this._showCategories;
  }

  set showCategories(value: boolean) {
    this._showCategories = value;
  }

  get showCategoriesSorter(): boolean {
    return this._showCategoriesSorter;
  }

  set showCategoriesSorter(value: boolean) {
    this._showCategoriesSorter = value;
  }

  get showTrCount(): boolean {
    return this._showTrCount;
  }

  set showTrCount(value: boolean) {
    this._showTrCount = value;
  }

  get showTrSorter(): boolean {
    return this._showTrSorter;
  }

  set showTrSorter(value: boolean) {
    this._showTrSorter = value;
  }

  get showPowerConsumption(): boolean {
    return this._showPowerConsumption;
  }

  set showPowerConsumption(value: boolean) {
    this._showPowerConsumption = value;
  }

  get showPowerSorter(): boolean {
    return this._showPowerSorter;
  }

  set showPowerSorter(value: boolean) {
    this._showPowerSorter = value;
  }

  get showPricePerTr(): boolean {
    return this._showPricePerTr;
  }

  set showPricePerTr(value: boolean) {
    this._showPricePerTr = value;
  }

  get showPriceSorter(): boolean {
    return this._showPriceSorter;
  }

  set showPriceSorter(value: boolean) {
    this._showPriceSorter = value;
  }

  get showMarketCap(): boolean {
    return this._showMarketCap;
  }

  set showMarketCap(value: boolean) {
    this._showMarketCap = value;
  }

  get showMarketSorter(): boolean {
    return this._showMarketSorter;
  }

  set showMarketSorter(value: boolean) {
    this._showMarketSorter = value;
  }

  get sorterCategory(): string[] {
    return this._sorterCategory;
  }

  set sorterCategory(value: string[]) {
    this._sorterCategory = value;
  }

  get categories(): string[] {
    return this._categories;
  }

  set categories(value: string[]) {
    this._categories = value;
  }

  get transactionCounts(): string[] {
    return this._transactionCounts;
  }

  set transactionCounts(value: string[]) {
    this._transactionCounts = value;
  }

  get powerConsumptions(): string[] {
    return this._powerConsumptions;
  }

  set powerConsumptions(value: string[]) {
    this._powerConsumptions = value;
  }

  get pricePerTrs(): string[] {
    return this._pricePerTrs;
  }

  set pricePerTrs(value: string[]) {
    this._pricePerTrs = value;
  }

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
    this.showCategories = !this.showCategories
    this.showMarketCap = false
    this.showTrCount = false
    this.showPowerConsumption = false
    this.showPricePerTr = false
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.toggleCategory();
  }

  toggleCategorySorter() {
    this.showCategoriesSorter = !this.showCategoriesSorter
    this.showMarketSorter = false
    this.showTrSorter = false
    this.showPowerSorter = false
    this.showPriceSorter = false
  }

  selectCategorySorter(type: string) {
    this.selectedCategorySorter = type
    this.toggleCategorySorter();
  }

  toggleTrCount() {
    this.showTrCount = !this.showTrCount
    this.showMarketCap = false
    this.showCategories = false
    this.showPowerConsumption = false
    this.showPricePerTr = false
  }

  selectTrCount(trCount: string) {
    this.selectedTrCount = trCount
    this.toggleTrCount()
  }

  toggleTrSorter() {
    this.showTrSorter = !this.showTrSorter
    this.showMarketSorter = false
    this.showCategoriesSorter = false
    this.showPowerSorter = false
    this.showPriceSorter = false
  }

  selectTrSorter(type: string) {
    this.selectedTrSorter = type
    this.toggleTrSorter()
  }

  togglePowerConsumption() {
    this.showPowerConsumption = !this.showPowerConsumption
    this.showMarketCap = false
    this.showTrCount = false
    this.showCategories = false
    this.showPricePerTr = false
  }

  selectPowerConsumption(powerConsumption: string) {
    this.selectedPowerConsumption = powerConsumption
    this.togglePowerConsumption()
  }

  togglePowerSorter() {
    this.showPowerSorter = !this.showPowerSorter
    this.showMarketSorter = false
    this.showTrSorter = false
    this.showCategoriesSorter = false
    this.showPriceSorter = false
  }

  selectPowerSorter(type: string) {
    this.selectedPowerConsumptionSorter = type
    this.togglePowerSorter()
  }

  togglePricePerTr() {
    this.showPricePerTr = !this.showPricePerTr
    this.showMarketCap = false
    this.showTrCount = false
    this.showPowerConsumption = false
    this.showCategories = false
  }

  selectPricePerTr(pricePerTr: string) {
    this.selectedPricePerTr = pricePerTr
    this.togglePricePerTr()
  }

  togglePriceSorter() {
    this.showPriceSorter = !this.showPriceSorter
    this.showMarketSorter = false
    this.showTrSorter = false
    this.showPowerSorter = false
    this.showCategoriesSorter = false
  }

  selectPriceSorter(type: string) {
    this.selectedPriceSorter = type
    this.togglePriceSorter()
  }

  toggleMarketCap() {
    this.showMarketCap = !this.showMarketCap
    this.showCategories = false
    this.showTrCount = false
    this.showPowerConsumption = false
    this.showPricePerTr = false
  }

  selectMarketCap(marketCap: string) {
    this.selectedMarketCap = marketCap
    this.toggleMarketCap()
  }

  toggleMarketSorter() {
    this.showMarketSorter = !this.showMarketSorter
    this.showCategoriesSorter = false
    this.showTrSorter = false
    this.showPowerSorter = false
    this.showPriceSorter = false
  }

  selectMarketSorter(type: string) {
    this.selectedMarketSorter = type
    this.toggleMarketSorter()
  }

  extractMinAndMax(str: string, field: string) {
    if (field == "category") {
      if (str == "Public") this.minimumValue = String(-3)
      else if (str == "Private") this.minimumValue = String(-2)
      else this.minimumValue = String(-1)
      this.maximumValue = '9999999999999'
    } else {
      if (str[0] != '>') {
        //ia prima parte
        let minimum = Number(str.substring(0, str.indexOf(' ')));
        //daca contine mil in prima parte se inmulteste cu 1000000
        if (str[str.indexOf(' ') + 1] == 'm') this.minimumValue += String(minimum * 1000000)
        else this.minimumValue += minimum

        //pentru a doua parte
        let next = str.substring(str.indexOf('-') + 2, str.length)
        if (next.indexOf('m') != -1) {
          this.maximumValue += String(Number(next.substring(0, next.indexOf('m'))) * 1000000);
        } else if (next.indexOf('b') != -1) this.maximumValue += String(1000000000)
        else this.maximumValue += next
      } else if (field == 'market') {
        this.minimumValue += String(1000)
        this.maximumValue += '999999999999'
      } else if (field == 'power') {
        this.minimumValue += String(5000)
        this.maximumValue += '999999999999'
      } else {
        this.minimumValue += String(1000000000)
        this.maximumValue += '999999999999'
      }
    }
  }


  selectedSorting(str: string) {
    if (str == 'Ascending') this.selectedOrder = 'asc';
    else this.selectedOrder = 'desc';
  }

  updateBlockchainList(category: string, trCount: string, power: string, price: string, marketCap: string, categorySorter: string, trCountSorter: string, powerSorter: string, priceSorter: string, marketCapSorter: string) {

    let numberSelectedFilter = 0
    if (category != 'Any') {
      this.extractMinAndMax(category, 'category');
      this.selectedFilter = this.filterCategory[0];
      numberSelectedFilter++
    }
    if (trCount != 'Any') {
      if (numberSelectedFilter != 0) {
        this.minimumValue += ','
        this.maximumValue += ','
        this.extractMinAndMax(trCount, '');
        this.selectedFilter += ','
        this.selectedFilter += this.filterCategory[4];
      } else {
        this.selectedFilter = this.filterCategory[4];
        this.extractMinAndMax(trCount, '');
      }
      numberSelectedFilter++
    }
    if (power != 'Any') {
      if (numberSelectedFilter != 0) {
        this.minimumValue += ','
        this.maximumValue += ','
        this.extractMinAndMax(power, 'power');
        this.selectedFilter += ','
        this.selectedFilter += this.filterCategory[2];
      } else {
        this.selectedFilter = this.filterCategory[2];
        this.extractMinAndMax(power, 'power');
      }
      numberSelectedFilter++
    }
    if (price != 'Any') {
      if (numberSelectedFilter != 0) {
        this.minimumValue += ','
        this.maximumValue += ','
        this.extractMinAndMax(price, '');
        this.selectedFilter += ','
        this.selectedFilter += this.filterCategory[3];
      } else {
        this.selectedFilter = this.filterCategory[3];
      }
      numberSelectedFilter++
    }
    if (marketCap != 'Any') {

      if (numberSelectedFilter != 0) {
        this.minimumValue += ','
        this.maximumValue += ','
        this.extractMinAndMax(marketCap, 'market');
        this.selectedFilter += ','
        this.selectedFilter += this.filterCategory[1];
      } else {
        this.selectedFilter = this.filterCategory[1];
        this.extractMinAndMax(marketCap, 'market');
      }
    }

    if (categorySorter != '') {
      this.selectedSorterField = this.filterCategory[0];
      this.selectedSorting(category);
    } else if (trCountSorter != 'Any') {
      this.selectedSorterField = this.filterCategory[4];
      this.selectedSorting(trCountSorter);
    } else if (powerSorter != 'Any') {
      this.selectedSorterField = this.filterCategory[2];
      this.selectedSorting(powerSorter)
    } else if (priceSorter != 'Any') {
      this.selectedSorterField = this.filterCategory[3];
      this.selectedSorting(priceSorter)
    } else if (marketCapSorter != 'Any') {
      this.selectedSorterField = this.filterCategory[1];
      this.selectedSorting(marketCapSorter)
    }
    if (numberSelectedFilter != 0) {
      this._config.params = {
        sortBy: this.selectedSorterField,
        order: this.selectedOrder,
        min: this.minimumValue,
        max: this.maximumValue,
        filterBy: this.selectedFilter
      }
    } else {
      this._config.params = {
        sortBy: 'powerConsumption',
        order: 'asc',
        min: '0',
        max: '999999999999',
        filterBy: 'powerConsumption'
      }
    }

    axios.get(Routes.makePath(Routes.BLOCKCHAINS_ENDPOINT), this._config)
      .then(response => {
        console.dir(response)
        this._blockchainList = response.data;
      })
      .catch((e) => {
        this._requestError = true
        this._error = e.response.statusText
        console.log(e)
      });
    this.maximumValue = ''
    this.minimumValue = ''
    this.selectedFilter = this.filterCategory[0]
    this.selectedOrder = ''
  }

  private getAllBlockchains() {

    axios.get(Routes.makePath(Routes.BLOCKCHAINS_ENDPOINT), this._config)
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
    let localConfig = {
      params: {
        type: 'PUBLIC',
        maxPricePerTransaction: 10000000000,
        minPricePerTransaction: 0,
        maxTransactionCount: 10000000000,
        minTransactionCount: 0,
        maxMarketCap: 10000000000,
        minMarketCap: 0,
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

  get blockchainRecommendationList(): BlockchainDTO[] {
    return this._blockchainRecommendationList;
  }

  set blockchainRecommendationList(value: BlockchainDTO[]) {
    this._blockchainRecommendationList = value;
  }
}
