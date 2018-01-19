import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CartProvider {
	public cart: any;

	constructor(public http: Http, public alertCtrl: AlertController, private toastCtrl: ToastController) {
		console.log('Hello CartProvider Provider');
		this.loadLocalStorageCartData();
	}

	loadLocalStorageCartData(){
		var cart = localStorage.getItem('cart');
		if(cart!=null&&cart!=""){
			this.cart = JSON.parse(cart);
		}
		else{
			this.cart = new Array();
		}

		localStorage.setItem('cart', JSON.stringify(this.cart));
		return this.cart;
	}

	getCartData(){
		if(this.cart==null)
			this.loadLocalStorageCartData();
		return this.cart;
	}

	clearCart(){
		this.cart = new Array();
		localStorage.setItem('cart', JSON.stringify(this.cart));
	}

	addProduct(product, quantity = 1) {
		let index = this.findProductInCart(product);

		if(index > -1){
			this.cart[index].quantity += quantity;
		}else{
			var productRow = {
				product: product,
				quantity: quantity
			};
			this.cart.push(productRow);
		}

		localStorage.setItem('cart', JSON.stringify(this.cart));

		this.showToast("Se han añadido "+quantity+" productos.");
	}

	updateCartLocalStorage(){
		localStorage.setItem('cart', JSON.stringify(this.cart));
	}

	removeProduct(product){
		let index = this.findProductInCart(product);

		if(index > -1){
			this.cart.splice(index, 1);
		}

		localStorage.setItem('cart', JSON.stringify(this.cart));

		this.showToast("El producto se ha eliminado.");
	}

	findProductInCart(product){
		let index = -1;

		for (var i = 0; i < this.cart.length; ++i) {
			if(this.cart[i].product.id==product.id){
				index = i;
				break;
			}
		}

		return index;
	}

	showToast(message){
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'middle'
		});

		toast.present();
	}

	showMessage(title, message = "") {
		let alert = this.alertCtrl.create({
		  title: title,
		  message: message,
		  buttons: ['Ok']
		});
		alert.present();
	}

}
