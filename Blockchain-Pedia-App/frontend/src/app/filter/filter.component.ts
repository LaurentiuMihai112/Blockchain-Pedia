import {Component, OnInit} from '@angular/core';
import {FilterService} from "../services/filter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  constructor(private _filterService: FilterService) {

  }

  get filterService(): FilterService {
    return this._filterService;
  }

  ngOnInit(): void {
  }

}
