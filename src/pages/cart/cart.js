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
import { CartProvider } from '../../providers/cart/cart';
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CartPage = (function () {
    function CartPage(navCtrl, navParams, cartProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartProvider = cartProvider;
        this.cart = new Array();
    }
    CartPage.prototype.getCartData = function () {
        return this.cartProvider.
        ;
        return JSON.parse(localStorage.getItem('cart'));
    };
    CartPage.prototype.removeProduct = function (product) {
        this.cartProvider.removeProduct(product);
    };
    CartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CartPage');
    };
    return CartPage;
}());
CartPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-cart',
        templateUrl: 'cart.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, CartProvider])
], CartPage);
export { CartPage };
//# sourceMappingURL=cart.js.map