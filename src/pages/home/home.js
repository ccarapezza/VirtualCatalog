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
import { PlanIntegralHigienePage } from '../plan-integral-higiene/plan-integral-higiene';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
var HomePage = (function () {
    function HomePage(navCtrl, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
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
        });
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