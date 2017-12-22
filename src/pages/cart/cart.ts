import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';

import { Events } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
	public cart: Array<Object> = new Array();

	constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider: CartProvider, public events: Events) {
	}

	getCartData(){
		return this.cartProvider.getCartData();
	}

	oneMore(productRow){
		this.cartProvider.addProduct(productRow.product);
	}

	oneLess(productRow){
		if(productRow.quantity>1)
			this.cartProvider.addProduct(productRow.product, -1);
	}

	changeQuantity(){
		this.cartProvider.updateCartLocalStorage();
	}

	removeProduct(product){
		this.cartProvider.removeProduct(product);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CartPage');
		this.events.publish('template:show-footer', false);
	}

	ionViewDidLeave() {
		console.log('ionViewDidLeave CartPage');
		this.events.publish('template:show-footer', true);
	}
}