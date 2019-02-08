export interface IConfig {
  restURL: string
}

export interface IButtonConfig {
  id: string
  restURL: string
  to: string
  satoshis: string
  opreturn: string
  callback: string
  paywallId: string
}

export interface IWeb4BCHConfig {
  currentProvider: string
  bch: IBCHConfig
}

export interface IBCHConfig {
  defaultAccount: string
  sendTransaction(txParams: any, callback: (err: any, res: any) => void): void
}

export interface ITxParams {
  to: string
  from: string
  value: string
  opreturn: any
}
