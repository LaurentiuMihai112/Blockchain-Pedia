export enum BlockchainCategory {
    PUBLIC, PRIVATE, HYBRID
}

export function getBlockchainCategoryFromText(text: string): BlockchainCategory | null {
    switch (text) {
        case "PUBLIC":
            return BlockchainCategory.PUBLIC

        case "PRIVATE":
            return BlockchainCategory.PRIVATE

        case "HYBRID":
            return BlockchainCategory.HYBRID

        case "Any":
            return BlockchainCategory.PUBLIC

        default:
            return null
    }
}