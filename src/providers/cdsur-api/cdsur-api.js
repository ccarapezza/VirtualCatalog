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
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Events } from 'ionic-angular';
/*
  Generated class for the CdsurApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var CdsurApiProvider = (function () {
    function CdsurApiProvider(http, events) {
        this.http = http;
        this.events = events;
        apiUrl = 'http://www.cdsurargentina.com.ar/cdsur-core/api/web/';
        //this.apiUrl = 'http://localhost/cdsur-core/api/web/';
        console.log('Hello CdsurApiProvider Provider');
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
        events.publish('hideHeader', { isHidden: true });
    }
    CdsurApiProvider.prototype.checkToken = function () {
        var _this = this;
        if (localStorage.getItem('access_token')) {
            var options = new RequestOptions({ headers: this._getHeaders() });
            this.http.post(this.apiUrl + '/securities/user-info', {}, options).subscribe(function (res) {
                if (res.ok) {
                    console.log("Check existing TOKEN OK!");
                    localStorage.setItem('user-info', JSON.stringify(res.json()));
                    _this.events.publish('hideHeader', { isHidden: false });
                }
                else {
                    _this.destroyUserCredentials();
                }
            }, function (err) {
                _this.destroyUserCredentials();
            });
        }
        else {
            this.destroyUserCredentials();
        }
    };
    CdsurApiProvider.prototype.storeUserCredentials = function (token) {
        localStorage.setItem('access_token', token);
        this.useCredentials(token);
    };
    CdsurApiProvider.prototype.useCredentials = function (token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    };
    CdsurApiProvider.prototype.loadUserCredentials = function () {
        var token = localStorage.getItem('access_token');
        this.events.publish('hideHeader', { isHidden: false });
        this.useCredentials(token);
    };
    CdsurApiProvider.prototype.destroyUserCredentials = function () {
        this.isLoggedin = false;
        this.AuthToken = null;
        this.events.publish('hideHeader', { isHidden: true });
        localStorage.clear();
    };
    CdsurApiProvider.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = new RequestOptions({ headers: _this._getHeaders() });
            var userData = { "login": username, "password": password };
            _this.http.post(_this.apiUrl + '/securities/login', userData, options).subscribe(function (res) {
                if (res.ok) {
                    _this.storeUserCredentials(res.json().access_token);
                    _this.checkToken();
                    resolve(true);
                }
                else {
                    _this.destroyUserCredentials();
                    resolve(false);
                }
            }, function (err) {
                _this.destroyUserCredentials();
                reject(err);
            });
        });
    };
    CdsurApiProvider.prototype.getProducts = function (categoryId) {
        var cId = "";
        if (categoryId) {
            cId = "?categoryId=" + categoryId;
        }
        return this.http.get(this.apiUrl + '/products' + cId)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CdsurApiProvider.prototype.getCategories = function (parentId) {
        var pId = "";
        if (parentId) {
            pId = "/" + parentId;
        }
        return this.http.get(this.apiUrl + '/categories/parent' + pId)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CdsurApiProvider.prototype.getProduct = function (code) {
        return this.http.get(this.apiUrl + '/products/code/' + code)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    CdsurApiProvider.prototype._getHeaders = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('X-Requested-With', 'XMLHttpRequest');
        this.loadUserCredentials();
        if (this.AuthToken) {
            headers.append('Authorization', 'Bearer ' + this.AuthToken);
        }
        return headers;
    };
    CdsurApiProvider.prototype.searchProducts = function (code, description) {
        var params;
        if (code) {
            params = "?code=" + code;
        }
        else if (description) {
            params = "?description=" + description;
        }
        var url = this.apiUrl + "/products/searchpost";
        var headers = this._getHeaders();
        var body = { 'description': description };
        return this.http.post(url, body, headers).map(function (res) { return res.json(); }).toPromise();
        //return this.http.get(this.apiUrl+"/products/search"+params).map(res => res.json()).toPromise();
    };
    return CdsurApiProvider;
}());
CdsurApiProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Events])
], CdsurApiProvider);
export { CdsurApiProvider };
//# sourceMappingURL=cdsur-api.js.map