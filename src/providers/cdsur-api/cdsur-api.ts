import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
	apiUrl = 'http://localhost/cdsur-core/api/web/index.php';

	constructor(public http: Http) {
		console.log('Hello CdsurApiProvider Provider');
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

	searchProducts(code, description) {
		return this.http.get(this.apiUrl+"/products/search?code="+code+"&description="+description).map(res => res.json()).toPromise();
	}
}