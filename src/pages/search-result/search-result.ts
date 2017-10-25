import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { CdsurApiProvider } from '../../providers/cdsur-api/cdsur-api';

/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  products: any[] = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public cdsurApiProvider: CdsurApiProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
    var code = this.navParams.get('code');
    var description = this.navParams.get('description');
    var categoryId = this.navParams.get('categoryId');
    if(code || description){
      this.cdsurApiProvider.searchProducts(code, description)
      .then(results => {
        this.products = results;
      })  
    }else if(categoryId){
      this.cdsurApiProvider.getProducts(categoryId)
      .then(results => {
        this.products = results;
      })
    }
  }

  selectProduct(code) {
    this.navCtrl.push(ProductDetailPage,{
      code: code
    });
  }
  
}
