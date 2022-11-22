import { Injectable } from '@angular/core';
import {BlockchainDTO} from "./app/dto/BlockchainDTO";

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  constructor() { }
  // @ts-ignore
  public sortAscending(category: string):BlockchainDTO[]{
    this.createBlockchainModel(this.blockchainList)
    if(category == "power"){
      var listBlockchain = this.sorter.sortAscending(this.blockchainModel,this.comparatorPower)
      var i=0
      for (let element of listBlockchain){
        this.blockchainListSortedAscending[i]._name=element.name
        this.blockchainListSortedAscending[i]._baseUrl=element.baseUrl
        this.blockchainListSortedAscending[i]._marketCap=element.marketCap
        this.blockchainListSortedAscending[i]._pricePerTransaction=element.pricePerTransaction
        this.blockchainListSortedAscending[i]._powerConsumption=element.powerConsumption
        this.blockchainListSortedAscending[i]._transactionCount=element.transactionCount
        i+=1
      }
      this.blockchainList=this.blockchainListSortedAscending
    }
  }
}
