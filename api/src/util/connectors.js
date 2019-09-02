import W3 from 'web3'

// export const web3 = new W3(
//     new W3.providers.HttpProvider('https://rinkeby.infura.io/v3/24366b6fe8fa46f0aa374e68ea38adee')
// )

export const web3 = new W3(
    new W3.providers.HttpProvider('https://localhost:7545')
)