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
    this._categoryAscending = false
    this._trCountAscending = false
    this._powerConsumptionAscending = false
    this._pricePerTrAscending = false
    this._marketCapAscending = false
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

  private _showTrSorter: boolean;

  get showTrSorter(): boolean {
    return this._showTrSorter;
  }

  set showTrSorter(value: boolean) {
    this._showTrSorter = value;
  }

  private _showPowerConsumption: boolean;

  get showPowerConsumption(): boolean {
    return this._showPowerConsumption;
  }

  set showPowerConsumption(value: boolean) {
    this._showPowerConsumption = value;
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

  private _showPriceSorter: boolean;

  get showPriceSorter(): boolean {
    return this._showPriceSorter;
  }

  set showPriceSorter(value: boolean) {
    this._showPriceSorter = value;
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

  private _sorterCategory = ['Ascending', 'Descending']

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

  private _transactionCounts = ['Any', '0 - 100 mil.', '100 - 200 mil.', '200 - 300 mil.', '300 - 500 mil.', '500 mil. - 1 bil.', '> 1 bil.']

  get transactionCounts(): string[] {
    return this._transactionCounts;
  }

  set transactionCounts(value: string[]) {
    this._transactionCounts = value;
  }

  private _powerConsumptions = ['Any', '0 - 1000', '1000- 2000', '2000 - 3000', '3000 - 5000', '>5000']

  get powerConsumptions(): string[] {
    return this._powerConsumptions;
  }

  set powerConsumptions(value: string[]) {
    this._powerConsumptions = value;
  }

  private _pricePerTrs = ['Any', '0 - 100 mil.', '100- 200 mil.', '200 - 300 mil.', '300 - 400 mil.', '500 mil. - 1 bil.', '> 1 bil.']

  get pricePerTrs(): string[] {
    return this._pricePerTrs;
  }

  set pricePerTrs(value: string[]) {
    this._pricePerTrs = value;
  }

  private _marketCaps = ['Any', '0 - 100.', '100 - 300', '300 - 500', '500 - 1000', '> 1000']

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

  private _categoryAscending: boolean;

  get categoryAscending(): boolean {
    return this._categoryAscending;
  }

  set categoryAscending(value: boolean) {
    this._categoryAscending = value;
  }

  private _trCountAscending: boolean;

  get trCountAscending(): boolean {
    return this._trCountAscending;
  }

  set trCountAscending(value: boolean) {
    this._trCountAscending = value;
  }

  private _powerConsumptionAscending: boolean;

  get powerConsumptionAscending(): boolean {
    return this._powerConsumptionAscending;
  }

  set powerConsumptionAscending(value: boolean) {
    this._powerConsumptionAscending = value;
  }

  private _pricePerTrAscending: boolean;

  get pricePerTrAscending(): boolean {
    return this._pricePerTrAscending;
  }

  set pricePerTrAscending(value: boolean) {
    this._pricePerTrAscending = value;
  }

  private _marketCapAscending: boolean;

  get marketCapAscending(): boolean {
    return this._marketCapAscending;
  }

  set marketCapAscending(value: boolean) {
    this._marketCapAscending = value;
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
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.toggleCategory();
  }

  toggleCategorySorter() {
    this.showCategoriesSorter = !this.showCategoriesSorter
  }

  selectCategorySorter(type: string) {
    this.selectedCategorySorter = type
    this.toggleCategorySorter();
  }

  toggleTrCount() {
    this.showTrCount = !this.showTrCount
  }

  selectTrCount(trCount: string) {
    this.selectedTrCount = trCount
    this.toggleTrCount()
  }

  toggleTrSorter() {
    this.showTrSorter = !this.showTrSorter
  }

  selectTrSorter(type: string) {
    this.selectedTrSorter = type
    this.toggleTrSorter()
  }

  togglePowerConsumption() {
    this.showPowerConsumption = !this.showPowerConsumption
  }

  selectPowerConsumption(powerConsumption: string) {
    this.selectedPowerConsumption = powerConsumption
    this.togglePowerConsumption()
  }

  togglePowerSorter() {
    this.showPowerSorter = !this.showPowerSorter
  }

  selectPowerSorter(type: string) {
    this.selectedPowerConsumptionSorter = type
    this.togglePowerSorter()
  }

  togglePricePerTr() {
    this.showPricePerTr = !this.showPricePerTr
  }

  selectPricePerTr(pricePerTr: string) {
    this.selectedPricePerTr = pricePerTr
    this.togglePricePerTr()
  }

  togglePriceSorter() {
    this.showPriceSorter = !this.showPriceSorter
  }

  selectPriceSorter(type: string) {
    this.selectedPriceSorter = type
    this.togglePriceSorter()
  }

  toggleMarketCap() {
    this.showMarketCap = !this.showMarketCap
  }

  selectMarketCap(marketCap: string) {
    this.selectedMarketCap = marketCap
    this.toggleMarketCap()
  }

  toggleMarketSorter() {
    this.showMarketSorter = !this.showMarketSorter
  }

  selectMarketSorter(type: string) {
    this.selectedMarketSorter = type
    this.toggleMarketSorter()
  }

  updateBlockchainList() {

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
}
