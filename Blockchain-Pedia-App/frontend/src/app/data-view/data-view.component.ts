import {Component, OnInit} from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {BlockchainDTO} from "../dto/BlockchainDTO";
import {BlockchainModel} from "../../../../backend/src/model/blockchain-model"
import {Routes} from "../dto/routes";
import {BlockchainCategory} from "../dto/enum/BlockchainCategory";
import {BlockchainSorter} from "../../../../backend/src/sort/blockchain-sorter"
import {MarketCapComparator} from "../../../../backend/src/sort/impl/market-cap-comparator"
import {PowerConsumptionComparator} from "../../../../backend/src/sort/impl/power-consumption-comparator"
import {PricePerTransactionComparator} from "../../../../backend/src/sort/impl/price-per-transaction-comparator"
import {TransactionCountComparator} from "../../../../backend/src/sort/impl/transaction-count-comparator"
import {SorterService} from "../../sorter.service";

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
  blockchainModel: BlockchainModel[] = []
  comparatorMarket: MarketCapComparator = new MarketCapComparator()
  comparatorPower: PowerConsumptionComparator=new PowerConsumptionComparator()
  comparatorPrice: PricePerTransactionComparator = new PricePerTransactionComparator()
  comparatorTransaction: TransactionCountComparator = new TransactionCountComparator()
  sorter: BlockchainSorter = new BlockchainSorter()
  blockchainListSortedAscending: BlockchainDTO[] = []
  blockchainListSortedDescending: BlockchainDTO[] = []

  constructor(private sorterService: SorterService) {
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
  private createBlockchainModel(blockchains: BlockchainDTO[]){
    for (let blockchain of blockchains){
      var block =new BlockchainModel(blockchain._name,blockchain._baseUrl,blockchain._category,blockchain._transactionCount,blockchain._powerConsumption,blockchain._pricePerTransaction,blockchain._marketCap)
      this.blockchainModel.push(block)
    }
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

  static sortAscend(category: string) {
   DataViewComponent.sortAscending(category)
  }
}
