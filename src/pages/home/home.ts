import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { PlanIntegralHigienePage } from '../plan-integral-higiene/plan-integral-higiene';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductDetailPage } from '../product-detail/product-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	qrData = null;
	createdCode = null;
	scannedCode = null;

	constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {}

	goToPlanIntegralHigienePage() {
		this.navCtrl.push(PlanIntegralHigienePage);
	}

	goToSearchPage() {
		this.navCtrl.push(SearchPage);
	}

	scanQr(){
		this.barcodeScanner.scan().then(barcodeData => {
			this.scannedCode = barcodeData.text;
			this.navCtrl.push(ProductDetailPage);
		})
	}

	createCode() {
		this.createdCode = this.qrData;
	}
}