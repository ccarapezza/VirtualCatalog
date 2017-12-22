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
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';
import { CartProvider } from '../../providers/cart/cart';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductDetailPage = (function () {
    function ProductDetailPage(navCtrl, navParams, cdsurApiProvider, cartProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cdsurApiProvider = cdsurApiProvider;
        this.cartProvider = cartProvider;
        this.product = {};
    }
    ProductDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ProductDetailPage');
        var code = this.navParams.get('code');
        this.cdsurApiProvider.getProduct(code)
            .then(function (results) {
            _this.product = results;
        });
    };
    ProductDetailPage.prototype.addProduct = function (product) {
        this.cartProvider.addProduct(product);
    };
    return ProductDetailPage;
}());
ProductDetailPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-product-detail',
        templateUrl: 'product-detail.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, CdsurApiProvider, CartProvider])
], ProductDetailPage);
export { ProductDetailPage };
//# sourceMappingURL=product-detail.js.map