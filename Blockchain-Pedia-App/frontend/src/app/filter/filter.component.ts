import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showCategories: boolean;
  showCategoriesSorter: boolean;
  showTrCount: boolean;
  showTrSorter: boolean;
  showPowerConsumption: boolean;
  showPowerSorter: boolean;
  showPricePerTr: boolean;
  showPriceSorter: boolean;
  showMarketCap: boolean;
  showMarketSorter: boolean;
  sorterCategory = ['Ascending','Descending']
  categories = ['Any', 'Public', 'Hybrid', 'Private']
  transactionCounts = ['Any', '0 - 100 mil.', '100 - 200 mil.', '200 - 300 mil.', '300 - 500 mil.', '500 mil. - 1 bil.', '> 1 bil.']
  powerConsumptions = ['Any', '0 - 1000', '1000- 2000', '2000 - 3000', '3000 - 5000', '>5000']
  pricePerTrs = ['Any', '0 - 100 mil.', '100- 200 mil.', '200 - 300 mil.', '300 - 400 mil.', '500 mil. - 1 bil.', '> 1 bil.']
  marketCaps = ['Any', '0 - 100.', '100 - 300', '300 - 500', '500 - 1000', '> 1000']
  selectedCategory: string;
  selectedCategorySorter: string;
  selectedTrCount: string;
  selectedTrSorter: string;
  selectedPowerConsumption: string;
  selectedPowerConsuptionSorter: string;
  selectedPricePerTr: string;
  selectedPriceSorter: string;
  selectedMarketCap: string;
  selectedMarketSorter: string;
  categoryAscending: boolean;
  trCountAscending: boolean;
  powerConsumptionAscending: boolean;
  pricePerTrAscending: boolean;
  marketCapAscending: boolean;

  constructor() {
    this.showCategories = false
    this.showCategoriesSorter = false;
    this.showTrCount = false
    this.showTrSorter = false
    this.showPowerConsumption = false
    this.showPowerSorter = false
    this.showPricePerTr = false
    this.showPriceSorter = false
    this.showMarketCap = false
    this.showMarketSorter = false
    this.selectedCategory = this.categories[0]
    this.selectedCategorySorter = this.sorterCategory[0]
    this.selectedTrCount = this.transactionCounts[0]
    this.selectedTrSorter = this.sorterCategory[0]
    this.selectedPowerConsumption = this.powerConsumptions[0]
    this.selectedPowerConsuptionSorter = this.sorterCategory[0]
    this.selectedPricePerTr = this.pricePerTrs[0]
    this.selectedPriceSorter = this.sorterCategory[0]
    this.selectedMarketCap = this.marketCaps[0]
    this.selectedMarketSorter = this.sorterCategory[0]
    this.categoryAscending = false
    this.trCountAscending = false
    this.powerConsumptionAscending = false
    this.pricePerTrAscending = false
    this.marketCapAscending = false
  }

  ngOnInit(): void {
  }

  toggleCategory() {
    this.showCategories = !this.showCategories
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.toggleCategory();
  }

  toggleCategorySorter(){
    this.showCategoriesSorter = !this.showCategoriesSorter
  }

  selectCategorySorter(type: string){
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

  toggleTrSorter(){
    this.showTrSorter = !this.showTrSorter
  }

  selectTrSorter(type: string){
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

  togglePowerSorter(){
    this.showPowerSorter = !this.showPowerSorter
  }

  selectPowerSorter(type: string){
    this.selectedPowerConsuptionSorter = type
    this.togglePowerSorter()
  }

  togglePricePerTr() {
    this.showPricePerTr = !this.showPricePerTr
  }

  selectPricePerTr(pricePerTr: string) {
    this.selectedPricePerTr = pricePerTr
    this.togglePricePerTr()
  }

  togglePriceSorter(){
    this.showPriceSorter = !this.showPriceSorter
  }

  selectPriceSorter(type: string){
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

  toggleMarketSorter(){
    this.showMarketSorter = !this.showMarketSorter
  }

  selectMarketSorter(type: string){
    this.selectedMarketSorter = type
    this.toggleMarketSorter()
  }
  updateBlockchainList() {

  }
}
