import {Component, OnInit} from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {BlockchainDTO} from "../dto/BlockchainDTO";
import {Routes} from "../dto/routes";
import {BlockchainCategory} from "../dto/enum/BlockchainCategory";

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {
  config: AxiosRequestConfig
  blockchainList: BlockchainDTO[] = []
  requestError: boolean
  error: String = ''

  constructor() {
    this.requestError = false
    this.config = {
      headers: {},
      params: {

      }
    }
    this.getAllBlockchains()
  }

  ngOnInit(): void {
  }

  private getAllBlockchains() {

    axios.get(Routes.makePath(Routes.BLOCKCHAINS_ENDPOINT), this.config)
      .then(response => {
        console.dir(response)
        this.blockchainList = response.data;
      })
      .catch((e) => {
        this.requestError = true
        this.error = e.response.statusText
        console.log(e)
      });

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
}
