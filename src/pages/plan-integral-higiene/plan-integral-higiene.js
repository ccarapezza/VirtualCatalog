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
import { SearchResultPage } from '../search-result/search-result';
/**
 * Generated class for the PlanIntegralHigienePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PlanIntegralHigienePage = (function () {
    function PlanIntegralHigienePage(navCtrl, navParams, cdsurApiProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cdsurApiProvider = cdsurApiProvider;
        this.categories = [];
    }
    PlanIntegralHigienePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad PlanIntegralHigienePage');
        this.cdsurApiProvider.getCategories(null)
            .then(function (results) {
            _this.categories = results;
        });
    };
    PlanIntegralHigienePage.prototype.selectCategory = function (categoryId) {
        var _this = this;
        this.cdsurApiProvider.getCategories(categoryId)
            .then(function (results) {
            if (results.length != 0) {
                _this.categories = results;
            }
            else {
                _this.navCtrl.push(SearchResultPage, {
                    categoryId: categoryId,
                });
            }
        });
    };
    return PlanIntegralHigienePage;
}());
PlanIntegralHigienePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-plan-integral-higiene',
        templateUrl: 'plan-integral-higiene.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        CdsurApiProvider])
], PlanIntegralHigienePage);
export { PlanIntegralHigienePage };
//# sourceMappingURL=plan-integral-higiene.js.map