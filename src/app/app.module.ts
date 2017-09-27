import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { SearchResultPage } from '../pages/search-result/search-result';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { PlanIntegralHigienePage } from '../pages/plan-integral-higiene/plan-integral-higiene';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CdsurApiProvider } from '../providers/cdsur-api/cdsur-api';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    SearchResultPage,
    ProductDetailPage,
    PlanIntegralHigienePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    SearchResultPage,
    ProductDetailPage,
    PlanIntegralHigienePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    CdsurApiProvider
  ]
})
export class AppModule {}
