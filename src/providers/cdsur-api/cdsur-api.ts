import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the CdsurApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CdsurApiProvider {
	//apiUrl = 'http://www.cdsurargentina.com.ar/cdsur-core/api/web/index.php';
	apiUrl = 'http://www.cdsurargentina.com.ar/cdsur-core/api/web/index.php';

	constructor(public http: Http) {
		console.log('Hello CdsurApiProvider Provider');
	}

	login(username, password) {
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			let userData = {"username": username, "password" : password};
			this.http.post("login", JSON.stringify(userData), {headers: headers}).subscribe(res => { 
 				resolve(res.json());
			} , (err) =>{
				reject(err);
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
	    headers.append('Content-Type', 'x-www-form-urlencoded');
	    return headers;
	 }

	searchProducts(code, description) {
		var params;
		if(code){
			params="?code="+code;
		}else if(description){
			params="?description="+description;
		}

		let url = this.apiUrl+"/products/searchpost";
	    let headers = this._getHeaders();
	    let body = { 'description' : description};
	    return this.http.post(url, body, headers).map(res => res.json()).toPromise();
		//return this.http.get(this.apiUrl+"/products/search"+params).map(res => res.json()).toPromise();
	}
}