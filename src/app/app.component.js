var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CdsurApiProvider } from '../providers/cdsur-api/cdsur-api';
import { CartProvider } from '../providers/cart/cart';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CartPage } from '../pages/cart/cart';
import { Events } from 'ionic-angular';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl, menuCtrl, events, cdsurApiProvider, cartProvider) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.cdsurApiProvider = cdsurApiProvider;
        this.cartProvider = cartProvider;
        this.footerIsHidden = false;
        this.userInfo = false;
        this.rootPage = HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        events.subscribe('hideHeader', function (data) {
            _this.footerIsHidden = data.isHidden;
        });
        cdsurApiProvider.checkToken();
        this.userInfo = JSON.parse(localStorage.getItem('user-info'));
        ;
    }
    MyApp.prototype.ionViewDidLoad = function () {
        console.log('MENU LOAD');
    };
    MyApp.prototype.login = function () {
        this.menuCtrl.close();
        this.nav.push(LoginPage);
    };
    MyApp.prototype.signup = function () {
        this.menuCtrl.close();
        this.nav.push(SignupPage);
    };
    MyApp.prototype.logout = function () {
        this.cdsurApiProvider.destroyUserCredentials();
        this.menuCtrl.close();
        this.nav.push(HomePage);
        this.showMessage("Sesión cerrada", "Se ha cerrado la sesión");
    };
    MyApp.prototype.goToCart = function () {
        this.nav.push(CartPage);
    };
    MyApp.prototype.getUsername = function () {
        var userInfo = JSON.parse(localStorage.getItem('user-info'));
        if (userInfo == null)
            return "ANONYMUS";
        else
            return userInfo.username;
    };
    MyApp.prototype.getUserEmail = function () {
        var userInfo = JSON.parse(localStorage.getItem('user-info'));
        if (userInfo == null)
            return "ANONYMUS";
        else
            return userInfo.email;
    };
    MyApp.prototype.getCartProductsCount = function () {
        return this.cartProvider.getCartData().length;
    };
    MyApp.prototype.showMessage = function (title, message) {
        if (message === void 0) { message = ""; }
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        StatusBar,
        SplashScreen,
        AlertController,
        MenuController,
        Events,
        CdsurApiProvider,
        CartProvider])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map