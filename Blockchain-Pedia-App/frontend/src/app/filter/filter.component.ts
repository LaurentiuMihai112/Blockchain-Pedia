import {Component, OnInit} from '@angular/core';
import { DataViewComponent } from '../data-view/data-view.component';
import {SorterService} from "../../sorter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showCategories: boolean;
  showTrCount: boolean;
  showPowerConsumption: boolean;
  showPricePerTr: boolean;
  showMarketCap: boolean;
  showPowerConsumptionSorter: boolean;
  categories = ['Any', 'Public', 'Hybrid', 'Private']
  transactionCounts = ['Any', '0 - 100 mil.', '100 - 200 mil.', '200 - 300 mil.', '300 - 500 mil.', '500 mil. - 1 bil.', '> 1 bil.']
  powerConsumptions = ['Any', '0 - 1000', '1000- 2000', '2000 - 3000', '3000 - 5000', '>5000']
  powerConsumptionsSorting = ['Ascending','Descending']
  pricePerTrs = ['Any', '0 - 100 mil.', '100- 200 mil.', '200 - 300 mil.', '300 - 400 mil.', '500 mil. - 1 bil.', '> 1 bil.']
  marketCaps = ['Any', '0 - 100.', '100 - 300', '300 - 500', '500 - 1000', '> 1000']
  selectedCategory: string;
  selectedTrCount: string;
  selectedPowerConsumption: string;
  selectedPricePerTr: string;
  selectedMarketCap: string;
  selectedPowerConsumptionSorting: string;
  categoryAscending: boolean;
  trCountAscending: boolean;
  powerConsumptionAscending: boolean;
  pricePerTrAscending: boolean;
  marketCapAscending: boolean;

  constructor(private sorterService: SorterService) {
    this.showCategories = false
    this.showTrCount = false
    this.showPowerConsumption = false
    this.showPricePerTr = false
    this.showMarketCap = false
    this.showPowerConsumptionSorter=false;
    this.selectedCategory = this.categories[0]
    this.selectedTrCount = this.transactionCounts[0]
    this.selectedPowerConsumption = this.powerConsumptions[0]
    this.selectedPowerConsumptionSorting = this.powerConsumptionsSorting[0]
    this.selectedPricePerTr = this.pricePerTrs[0]
    this.selectedMarketCap = this.marketCaps[0]
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

  toggleTrCount() {
    this.showTrCount = !this.showTrCount
  }

  selectTrCount(trCount: string) {
    this.selectedTrCount = trCount
    this.toggleTrCount()
  }
  togglePowerConsumptionSorting() {
    this.showPowerConsumptionSorter = !this.showPowerConsumptionSorter
  }
  togglePowerConsumption() {
    this.showPowerConsumption = !this.showPowerConsumption
  }

  sorterPowerConsumption(type: string){
    if(type=="Ascending"){
    this.sorter.sortAscending("Asc")
    }
  }

  selectPowerConsumptionSorting(powerConsumption: string){
    this.selectedPowerConsumptionSorting =powerConsumption
    this.togglePowerConsumptionSorting()
    this.sorterPowerConsumption(this.selectedPowerConsumptionSorting)
  }
  selectPowerConsumption(powerConsumption: string) {
    this.selectedPowerConsumption = powerConsumption
    this.togglePowerConsumption()
  }

  togglePricePerTr() {
    this.showPricePerTr = !this.showPricePerTr
  }

  selectPricePerTr(pricePerTr: string) {
    this.selectedPricePerTr = pricePerTr
    this.togglePricePerTr()
  }

  toggleMarketCap() {
    this.showMarketCap = !this.showMarketCap
  }

  selectMarketCap(marketCap: string) {
    this.selectedMarketCap = marketCap
    this.toggleMarketCap()
  }

  updateBlockchainList() {

  }
}
