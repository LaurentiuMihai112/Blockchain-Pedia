import {Component, OnInit} from '@angular/core';
import {FilterService} from "../services/filter.service";

@Component({
  selector: 'app-best-fit',
  templateUrl: './best-fit.component.html',
  styleUrls: ['./best-fit.component.scss']
})
export class BestFitComponent implements OnInit {

  constructor(private _filterService: FilterService) {

  }

  get filterService(): FilterService {
    return this._filterService;
  }

  ngOnInit(): void {
  }
}
