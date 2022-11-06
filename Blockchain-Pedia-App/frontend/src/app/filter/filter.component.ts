import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showCategories: boolean;
  showTrCount: boolean;
  categories = ['Public', 'Hybrid', 'Private']
  transactionCounts = ['0 - 100 mil.', '100- 200 mil.', '200 - 300 mil.', '300 - 400 mil.', '500 mil. - 1 bil.', '> 1 bil.']
  selectedCategory: string;
  selectedTrCount: string;

  constructor() {
    this.showCategories = false
    this.showTrCount = false
    this.selectedCategory = this.categories[0]
    this.selectedTrCount = this.transactionCounts[0]
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
}
