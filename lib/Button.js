"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(config) {
        var _this = _super.call(this, config) || this;
        var restURL;
        if (config && config.restURL && config.restURL !== "") {
            _this.restURL = config.restURL;
        }
        else {
            config.restURL = "https://rest.bitcoin.com/v1/";
            _this.restURL = "https://rest.bitcoin.com/v1/";
        }
        if (config && config.id && config.id !== "") {
            _this.id = config.id;
            var badgerButton = document.getElementById(_this.id);
            badgerButton.addEventListener("click", function (event) {
                var _this = this;
                if (typeof web4bch !== "undefined") {
                    web4bch = new Web4Bch(web4bch.currentProvider);
                    var txParams = {
                        to: config["data-to"]
                            ? config["data-to"]
                            : this.getAttribute("data-to"),
                        from: web4bch.bch.defaultAccount,
                        value: config["data-satoshis"]
                            ? config["data-satoshis"]
                            : this.getAttribute("data-satoshis"),
                        opreturn: undefined
                    };
                    if (config["data-opreturn"]) {
                        txParams.opreturn = config["data-opreturn"];
                    }
                    else if (this.getAttribute("data-opreturn")) {
                        txParams.opreturn = this.getAttribute("data-opreturn");
                    }
                    web4bch.bch.sendTransaction(txParams, function (err, res) {
                        if (err)
                            return;
                        var paywallId = _this.getAttribute("data-paywall-id");
                        if (paywallId) {
                            var paywall = document.getElementById("paywall");
                            paywall.style.display = "block";
                        }
                        var successCallback = _this.getAttribute("data-success-callback");
                        if (successCallback) {
                            window[successCallback](res);
                        }
                    });
                }
                else {
                    window.open("https://badger.bitcoin.com");
                }
            });
        }
        return _this;
    }
    return Button;
}(BITBOXSDK));
exports.default = Button;
