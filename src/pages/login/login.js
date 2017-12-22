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
import { AlertController } from 'ionic-angular';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, cdsurApiProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cdsurApiProvider = cdsurApiProvider;
        this.alertCtrl = alertCtrl;
        this.userData = { "username": "", "password": "" };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.cdsurApiProvider.login(this.userData.username, this.userData.password).then(function (result) {
            if (result) {
                _this.showMessage("Bienvenido!", "Ahora podrá realizar pedidos");
                _this.navCtrl.push(HomePage);
            }
            else {
                _this.showMessage("Acceso Denegado", "Nombre de usuario y/o contraseña incorrectos.");
            }
        }, function (err) {
            _this.showMessage("Ha ocurrido un error", "Verifique su conexión.");
        });
    };
    LoginPage.prototype.showMessage = function (title, message) {
        if (message === void 0) { message = ""; }
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, CdsurApiProvider, AlertController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map