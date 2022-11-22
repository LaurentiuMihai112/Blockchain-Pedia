import { Component, OnInit } from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {Routes} from "../dto/routes";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  sortChartImage: string = "";
  orderChartImage: string = "";
  filterChartImage: string = "";
  config: AxiosRequestConfig

  constructor() {
    this.config = {
      headers: {},
      params: {}
    }
    this.getSortChartImage();
    this.getOrderChartImage();
    this.getFilterChartImage();
  }

  ngOnInit(): void {
  }

  private async getSortChartImage() {
    let imageName = ""
    await axios.get(Routes.makePath(Routes.CHARTS_SORT_ENDPOINT), this.config)
      .then(response => {
        imageName = response.data
      })
      .catch((e) => {
        this.getSortChartImage()
      });

    this.sortChartImage = Routes.makePath(Routes.CHARTS_FILE_ENDPOINT + "?name=" + imageName)
  }

  private async getOrderChartImage() {
    let imageName = ""
    await axios.get(Routes.makePath(Routes.CHARTS_ORDER_ENDPOINT), this.config)
      .then(response => {
        imageName = response.data
      })
      .catch((e) => {
        this.getSortChartImage()
      });

    this.orderChartImage = Routes.makePath(Routes.CHARTS_FILE_ENDPOINT + "?name=" + imageName)
  }

  private async getFilterChartImage() {
    let imageName = ""
    await axios.get(Routes.makePath(Routes.CHARTS_FILTER_ENDPOINT), this.config)
      .then(response => {
        imageName = response.data
      })
      .catch((e) => {
        this.getSortChartImage()
      });

    this.filterChartImage = Routes.makePath(Routes.CHARTS_FILE_ENDPOINT + "?name=" + imageName)
  }
}
