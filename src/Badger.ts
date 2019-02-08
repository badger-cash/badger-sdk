// require deps
const BITBOXSDK: any = require("bitbox-sdk/lib/bitbox-sdk").default

// import interfaces
import { IConfig } from "./interfaces/BadgerInterfaces"

// import classes
import Button from "./Button"

// Badger SDK is a superset of BITBOX SDK <3
class Badger extends BITBOXSDK {
  restURL: string
  Button: any
  constructor(config: IConfig) {
    super(config)
    let restURL
    if (config && config.restURL && config.restURL !== "") {
      this.restURL = config.restURL
    } else {
      this.restURL = "https://rest.bitcoin.com/v2/"
    }

    this.Button = Button
  }
}

export default Badger
