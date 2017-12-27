import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	signupForm = {"email":"", "username":"", "password": "", "passwordCheck": ""};
	constructor(public navCtrl: NavController, public navParams: NavParams, public cdsurApiProvider: CdsurApiProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	signup() {
		if(this.signupForm.password==this.signupForm.passwordCheck){
			this.cdsurApiProvider.signup(this.signupForm.email, this.signupForm.username, this.signupForm.password).then((result) =>{
				if(result){
					this.showMessage("Usuario Registrado!", "Revise su email para confirmar la cuenta");
					this.navCtrl.push(HomePage);
				}else{
					this.showMessage("Error", "Comuniquese con el administrador.");
				}
			}, (err) =>{
				this.showMessage("Ha ocurrido un error", "Verifique su conexión.");
			});
		}else{
			this.showMessage("Validación", "Las contraseñas no coinciden.");
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