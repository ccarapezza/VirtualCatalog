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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';
/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SearchResultPage = (function () {
    function SearchResultPage(navCtrl, navParams, cdsurApiProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cdsurApiProvider = cdsurApiProvider;
        this.products = [];
    }
    SearchResultPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad SearchResultPage');
        var code = this.navParams.get('code');
        var description = this.navParams.get('description');
        var categoryId = this.navParams.get('categoryId');
        if (code || description) {
            this.cdsurApiProvider.searchProducts(code, description)
                .then(function (results) {
                _this.products = results;
            });
        }
        else if (categoryId) {
            this.cdsurApiProvider.getProducts(categoryId)
                .then(function (results) {
                _this.products = results;
            });
        }
    };
    SearchResultPage.prototype.selectProduct = function (code) {
        this.navCtrl.push(ProductDetailPage, {
            code: code
        });
    };
    return SearchResultPage;
}());
SearchResultPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-search-result',
        templateUrl: 'search-result.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        CdsurApiProvider])
], SearchResultPage);
export { SearchResultPage };
//# sourceMappingURL=search-result.js.map