var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PlanIntegralHigienePage } from '../plan-integral-higiene/plan-integral-higiene';
import { ProductDetailPage } from '../product-detail/product-detail';
var HomePage = (function () {
    function HomePage(navCtrl, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.qrData = null;
        this.createdCode = null;
        this.scannedCode = null;
    }
    HomePage.prototype.goToPlanIntegralHigienePage = function () {
        this.navCtrl.push(PlanIntegralHigienePage);
    };
    HomePage.prototype.goToSearchPage = function () {
        this.navCtrl.push(SearchPage);
    };
    HomePage.prototype.scanQr = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.scannedCode = barcodeData.text;
            var code = _this.scannedCode.split("-")[1];
            _this.navCtrl.push(ProductDetailPage, {
                code: code
            });
        });
    };
    HomePage.prototype.createCode = function () {
        this.createdCode = this.qrData;
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, BarcodeScanner])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map