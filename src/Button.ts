// import interfaces
import {
  IButtonConfig,
  IWeb4BCHConfig,
  ITxParams
} from "./interfaces/BadgerInterfaces"

interface Window {
  [key: string]: any // Add index signature
}

// import classes
const Web4Bch = require("web4bch")

class Button {
  restURL: string
  constructor(config: IButtonConfig) {
    let restURL
    if (config && config.restURL && config.restURL !== "") {
      this.restURL = config.restURL
    } else {
      // config.restURL = "https://rest.bitcoin.com/v2/"
      this.restURL = "https://rest.bitcoin.com/v2/"
    }

    let web4bch: IWeb4BCHConfig

    if (config && config.id && config.id !== "") {
      let badgerButton = document.getElementById(config.id)
      // let win: Window = window
      badgerButton.addEventListener("click", function(event) {
        if (typeof web4bch !== "undefined") {
          web4bch = new Web4Bch(web4bch.currentProvider)
          console.log("web4bch: ", web4bch)
          let txParams: ITxParams = {
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

            let paywallId: string
            if (config.paywallId) {
              paywallId = config.paywallId
            } else if (this.getAttribute("data-paywall-id")) {
              paywallId = this.getAttribute("data-paywall-id")
            }
            if (paywallId) {
              let paywall: {
                style: {
                  display: string
                }
              } = document.getElementById("paywall")
              paywall.style.display = "block"
            }

            let successCallback: string
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
