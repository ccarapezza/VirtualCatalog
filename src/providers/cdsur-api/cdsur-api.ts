import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Events } from 'ionic-angular';


/*
  Generated class for the CdsurApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CdsurApiProvider {
	//apiUrl = 'http://www.cdsurargentina.com.ar/cdsur-core/api/web/index.php';
	apiUrl = 'http://localhost/cdsur-core/api/web/index.php';
	isLoggedin: boolean;
    AuthToken;
    
    constructor(public http: Http, public events: Events, public loadingCtrl: LoadingController) {
		console.log('Hello CdsurApiProvider Provider');
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
		events.publish('user:login', false);
    }

    checkToken() {
    	if(localStorage.getItem('access_token'))
    	{
	    	let options = new RequestOptions({ headers: this._getHeaders()});
	    	let loading = this.loadingCtrl.create({
		      content: 'Cargando, Espere por favor...'
		    });
		    loading.present();
	    	this.http.post(this.apiUrl+'/securities/user-info', {}, options).subscribe(res => { 
				if(res.ok){
					console.log("Check existing TOKEN OK!");
	                localStorage.setItem('user-info', JSON.stringify(res.json()));;
	                this.events.publish('user:login', true);
	            }
	            else
	            {
	            	this.destroyUserCredentials();
	            }

			} , (err) =>{
				this.destroyUserCredentials();
			}, () => { 
				loading.dismiss();
			});
    	}
    	else
    	{
    		this.destroyUserCredentials();
    	}
    }
    
    storeUserCredentials(token) {
        localStorage.setItem('access_token', token);
        this.useCredentials(token);
    }
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    
    loadUserCredentials() {
        var token = localStorage.getItem('access_token');
		this.events.publish('user:login', true);
        this.useCredentials(token);
    }
    
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        this.events.publish('user:login', false);
        localStorage.clear();
    }

	login(username, password) {
		return new Promise((resolve, reject) => {
			let options = new RequestOptions({ headers: this._getHeaders()});
			let userData = {"login": username, "password" : password};
			let loading = this.loadingCtrl.create({
		      content: 'Cargando, Espere por favor...'
		    });
		    loading.present();
			this.http.post(this.apiUrl+'/securities/login', userData, options).subscribe(res => { 
				if(res.ok){
                    this.storeUserCredentials(res.json().access_token);
                    this.checkToken();
                    resolve(true);
                }
                else
                {
                	this.destroyUserCredentials();
                    resolve(false);
                }

			} , (err) =>{
				this.destroyUserCredentials();
				reject(err);
			}, () =>{
				loading.dismiss();
			});
		});
	}

	signup(email, username, password) {
		return new Promise((resolve, reject) => {
			let options = new RequestOptions({ headers: this._getHeaders()});
			let signUpData = {"email": email, "username": username, "password" : password};
		    let loading = this.loadingCtrl.create({
		      content: 'Cargando, Espere por favor...'
		    });
		    loading.present();
			this.http.post(this.apiUrl+'/securities/signup', signUpData, options).subscribe(res => { 
				if(res.ok){
                    resolve(true);
                }
                else
                {
                    resolve(false);
                }

			} , (err) =>{
				reject(err);
			}, () =>{
				loading.dismiss();
			});
		});
	}	

	sendCart(cart) {
		return new Promise((resolve, reject) => {
			let options = new RequestOptions({ headers: this._getHeaders()});
			let loading = this.loadingCtrl.create({
		      content: 'Cargando, Espere por favor...'
		    });
		    loading.present();
			this.http.post(this.apiUrl+'/carts/send', {cart: cart}, options).subscribe(res => { 
				if(res.ok){
                    resolve(true);
                }
                else
                {
                    resolve(false);
                }

			} , (err) =>{
				reject(err);
			}, ()=>{
				loading.dismiss();
			});
		});
	}

	getProducts(categoryId) {
		var cId = "";
		if(categoryId){
			cId = "?categoryId="+categoryId;
		}

		return this.http.get(this.apiUrl+'/products'+cId)
			.map(res => res.json())
			.toPromise();
	}

	getCategories(parentId) {
		var pId = "";
		if(parentId){
			pId = "/"+parentId;
		}
		return this.http.get(this.apiUrl+'/categories/parent'+pId)
			.map(res => res.json())
			.toPromise();
	}

	getProduct(code) {
		return this.http.get(this.apiUrl+'/products/code/'+code)
			.map(res => res.json())
			.toPromise();
	}

	_getHeaders() {
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	    //headers.append('X-Requested-With', 'XMLHttpRequest');
	    this.loadUserCredentials();
	    if(this.AuthToken){
	        headers.append('cdsur-token', 'Bearer ' +this.AuthToken);
	    }
	    return headers;
	 }

	searchProducts(code, description) {
		return new Promise<any[]>((resolve, reject) => {
			var params;
			if(code){
				params="?code="+code;
			}else if(description){
				params="?description="+description;
			}

			let url = this.apiUrl+"/products/searchpost";
		    let options = new RequestOptions({ headers: this._getHeaders()});
		    let body = { 'description' : description};
			let loading = this.loadingCtrl.create({
		      content: 'Cargando, Espere por favor...'
		    });
		    loading.present();
			this.http.post(url, body, options).subscribe(res => { 
				if(res.ok){
	                resolve(res.json());
	            }
	            else
	            {
	                resolve(null);
	            }

			} , (err) =>{
				reject(err);
			}, () =>{
				loading.dismiss();
			});
		});
		/*var params;
		if(code){
			params="?code="+code;
		}else if(description){
			params="?description="+description;
		}

		let url = this.apiUrl+"/products/searchpost";
	    let options = new RequestOptions({ headers: this._getHeaders()});
	    let body = { 'description' : description};
	    return this.http.post(url, body, options).map(res => res.json()).toPromise();*/
		//return this.http.get(this.apiUrl+"/products/search"+params).map(res => res.json()).toPromise();


	}
}