import { AlertController } from 'ionic-angular';
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

	constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider: CartProvider, public cdsurApiProvider: CdsurApiProvider, public events: Events, public alertCtrl: AlertController) {
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

	sendCart(){
		this.cdsurApiProvider.sendCart(this.cartProvider.getCartData()).then((result) =>{
	      if(result){
	        this.showMessage("Enviado", "Su pedido ha sido enviado");
	      }else{
	        this.showMessage("No Enviado", "Su pedido no ha sido enviado, contactese con el administrador");
	      }
	  	}, (err) =>{
	      this.showMessage("Ha ocurrido un error", "Verifique su conexión.");
	  	});
		this.cartProvider.clearCart();
	}

	clearCart(){
		let alert = this.alertCtrl.create({
		title: 'Confirmación',
		message: 'Esta seguro que desea vaciar el carro?',
		buttons: [
		  {
		    text: 'SI',
		    handler: () => {
		      this.cartProvider.clearCart();
		    }
		  },
		  {
		    text: 'NO',
		    role: 'cancel',
		  },
		]
		});
		alert.present();
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CartPage');
		this.events.publish('template:show-footer', false);
	}

	ionViewDidLeave() {
		console.log('ionViewDidLeave CartPage');
		this.events.publish('template:show-footer', true);
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