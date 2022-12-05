import {Component, OnInit} from '@angular/core';
import {FilterService} from "../services/filter.service";

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {


  constructor(private _filterService: FilterService) {

  }

  get filterService(): FilterService {
    return this._filterService;
  }

  ngOnInit(): void {
  }
}
