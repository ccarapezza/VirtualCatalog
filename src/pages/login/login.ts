import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  userData = {"username":"", "password": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public cdsurApiProvider: CdsurApiProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Cargando, Espere por favor...'
    });
    loading.present();
  	this.cdsurApiProvider.login(this.userData.username, this.userData.password).then((result) =>{
      loading.dismiss();
      if(result){
        this.showMessage("Bienvenido!", "Ahora podrá realizar pedidos");
  		  this.navCtrl.push(HomePage);
      }else{
        this.showMessage("Acceso Denegado", "Nombre de usuario y/o contraseña incorrectos.");
      }
  	}, (err) =>{
      loading.dismiss();
      this.showMessage("Ha ocurrido un error", "Verifique su conexión.");
  	});
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
