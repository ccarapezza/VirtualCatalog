import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';
import { SearchResultPage } from '../search-result/search-result';
/**
 * Generated class for the PlanIntegralHigienePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan-integral-higiene',
  templateUrl: 'plan-integral-higiene.html',
})
export class PlanIntegralHigienePage {

	categories: any[] = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public cdsurApiProvider: CdsurApiProvider
	){}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PlanIntegralHigienePage');
		this.cdsurApiProvider.getCategories(null)
    	.then(results => {
	      this.categories = results;
	    })
	}

	selectCategory(categoryId) {
		this.cdsurApiProvider.getCategories(categoryId)
    	.then(results => {
    		if(results.length!=0){
    			this.categories = results;
    		}else{
				this.navCtrl.push(SearchResultPage, {
					categoryId: categoryId,
				});
    		}
	    })
	}
}
