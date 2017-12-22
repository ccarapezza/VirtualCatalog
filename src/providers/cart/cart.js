var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the CartProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var CartProvider = (function () {
    function CartProvider(http) {
        this.http = http;
        console.log('Hello CartProvider Provider');
        this.loadLocalStorageCartData();
    }
    CartProvider.prototype.loadLocalStorageCartData = function () {
        var cart = localStorage.getItem('cart');
        if (cart != null) {
            this.cart = JSON.parse(cart);
        }
        else {
            this.cart = new Array();
        }
        localStorage.setItem('cart', this.cart);
        return this.cart;
    };
    CartProvider.prototype.getCartData = function () {
        if (this.cart == null)
            this.loadLocalStorageCartData();
        return this.cart;
    };
    CartProvider.prototype.addProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var index = this.findProductInCart(product);
        if (index > -1) {
            this.cart[index].quantity += quantity;
        }
        else {
            var productRow = {
                product: product,
                quantity: quantity
            };
            this.cart.push(productRow);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    };
    CartProvider.prototype.removeProduct = function (product) {
        var index = this.findProductInCart(product);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    };
    CartProvider.prototype.findProductInCart = function (product) {
        var index = -1;
        for (var i = 0; i < this.cart.length; ++i) {
            if (this.cart[i].product.id == product.id) {
                index = i;
                break;
            }
        }
        return index;
    };
    return CartProvider;
}());
CartProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], CartProvider);
export { CartProvider };
//# sourceMappingURL=cart.js.map