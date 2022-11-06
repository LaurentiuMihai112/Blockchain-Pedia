import {BlockchainCategory} from "./enum/BlockchainCategory";

export interface BlockchainDTO {
  _name: string
  _baseUrl: string
  _category: BlockchainCategory
  _transactionCount: number
  _powerConsumption: number
  _pricePerTransaction: number
  _marketCap: number
}
