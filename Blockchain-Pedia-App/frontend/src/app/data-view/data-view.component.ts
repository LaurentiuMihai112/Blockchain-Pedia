import {Component, OnInit} from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {BlockchainDTO} from "../dto/BlockchainDTO";
import {Routes} from "../dto/routes";

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {
  config: AxiosRequestConfig
  blockchainList: BlockchainDTO[] = []

  constructor() {
    this.config = {
      headers: {},
      params: {}
    }
    this.getAllBlockchains()
  }

  ngOnInit(): void {
  }

  private getAllBlockchains() {

    axios.get(Routes.makePath(Routes.BLOCKCHAINS_ENDPOINT), this.config)
      .then(response => {
        console.dir(response.data)
        this.blockchainList = response.data;
      })
      .catch();

  }
}
