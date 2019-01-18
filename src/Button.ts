const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
import { IConfig } from "./interfaces/IConfig"
class Button extends BITBOXSDK {
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
      let badgerButton = document.getElementById(config.id)
      badgerButton.addEventListener("click", function(event) {
        if (typeof web4bch !== "undefined") {
          web4bch = new Web4Bch(web4bch.currentProvider)
          var txParams = {
            to: config.to ? config.to : this.getAttribute("data-to"),
            from: web4bch.bch.defaultAccount,
            value: config.satoshis
              ? config.satoshis
              : this.getAttribute("data-satoshis"),
            opreturn: undefined
          }

          if (config.opreturn) {
            txParams.opreturn = config.opreturn
          } else if (this.getAttribute("data-opreturn")) {
            txParams.opreturn = this.getAttribute("data-opreturn")
          }

          web4bch.bch.sendTransaction(txParams, (err: any, res: any) => {
            if (err) return

            var paywallId
            if (config.paywallId) {
              paywallId = config.paywallId
            } else if (this.getAttribute("data-paywall-id")) {
              paywallId = this.getAttribute("data-paywall-id")
            }
            if (paywallId) {
              var paywall = document.getElementById("paywall")
              paywall.style.display = "block"
            }

            var successCallback
            if (config.callback) {
              successCallback = config.callback
            } else if (this.getAttribute("data-callback")) {
              successCallback = this.getAttribute("data-callback")
            }
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
