const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
import { IConfig } from "./interfaces/IConfig"
class Button extends BITBOXSDK {
  id: string
  restURL: string
  constructor(config: IConfig) {
    super(config)
    let restURL
    if (config && config.restURL && config.restURL !== "") {
      this.restURL = config.restURL
    } else {
      config.restURL = "https://rest.bitcoin.com/v1/"
      this.restURL = "https://rest.bitcoin.com/v1/"
    }

    if (config && config.id && config.id !== "") {
      this.id = config.id
      let badgerButton = document.getElementById(this.id)
      console.log("bb", badgerButton)
      badgerButton.addEventListener("click", function(event) {
        if (typeof web4bch !== "undefined") {
          web4bch = new Web4Bch(web4bch.currentProvider)

          var txParams = {
            to: this.getAttribute("data-to"),
            from: web4bch.bch.defaultAccount,
            value: this.getAttribute("data-satoshis")
          }
          web4bch.bch.sendTransaction(txParams, (err: any, res: any) => {
            if (err) return
            //
            // var paywallId = this.getAttribute("data-paywall-id")
            // if (paywallId) {
            //   var paywall = document.getElementById("paywall")
            //   paywall.style.display = "block"
            // }

            var successCallback = this.getAttribute("data-success-callback")
            if (successCallback) {
              window[successCallback](res)
            }
          })
        } else {
          window.open("https://badger.bitcoin.com")
        }
      })
    }
  }
}

export default Button
