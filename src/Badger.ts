const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
import Button from "./Button"
import { IConfig } from "./interfaces/IConfig"

class Badger extends BITBOXSDK {
  constructor(config: IConfig) {
    super(config)
    let restURL
    if (config && config.restURL && config.restURL !== "")
      restURL = config.restURL
    else restURL = "https://rest.bitcoin.com/v1/"

    this.Button = new Button(restURL)
  }
}

export default Badger
