import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product = {};
  quantity = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cdsurApiProvider: CdsurApiProvider, public cartProvider: CartProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    var code = this.navParams.get('code');
    this.cdsurApiProvider.getProduct(code)
    .then(results => {
      this.product = results;
      this.quantity = 1;
    });
  }

  oneMore(){
    this.quantity++;
  }

  oneLess(){
    if(this.quantity>1)
      this.quantity--;
  }

  addProduct(product) {
    if(localStorage.getItem('access_token'))
    {
      this.cartProvider.addProduct(product, this.quantity);
    }else{
      this.showMessage("Necesita registrarse", "Debe crearse un usuario para utilizar esta función");
    }
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