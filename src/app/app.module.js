var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SearchPage } from '../pages/search/search';
import { SearchResultPage } from '../pages/search-result/search-result';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { PlanIntegralHigienePage } from '../pages/plan-integral-higiene/plan-integral-higiene';
import { CartPage } from '../pages/cart/cart';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CdsurApiProvider } from '../providers/cdsur-api/cdsur-api';
import { CartProvider } from '../providers/cart/cart';
import { HttpModule } from '@angular/http';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            LoginPage,
            SignupPage,
            SearchPage,
            SearchResultPage,
            ProductDetailPage,
            PlanIntegralHigienePage,
            CartPage
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp),
            HttpModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            LoginPage,
            SignupPage,
            SearchPage,
            SearchResultPage,
            ProductDetailPage,
            PlanIntegralHigienePage,
            CartPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            BarcodeScanner,
            CdsurApiProvider,
            CartProvider
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map