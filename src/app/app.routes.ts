import {Routes} from '@angular/router';
import {TrackingQueriesComponent} from "./pages/tracking-queries/tracking-queries.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {ContactDevComponent} from "./pages/contact-dev/contact-dev.component";
import {PriceHistoryComponent} from "./pages/price-history/price-history.component";
import {TradingPlatformsComponent} from "./pages/trading-platforms/trading-platforms.component";
import {HomeComponent} from "./pages/home/home.component";
import {GoodsComponent} from "./pages/goods/goods.component";
import {AvailabilityHistoryComponent} from "./pages/availability-history/availability-history.component";

const projectName = 'Project D'

export const routes: Routes = [
  {path: '', component: HomeComponent, title: projectName + ' | Home'},
  {path: 'settings', component: SettingsComponent, title: projectName + ' | Settings'},
  {path: 'contact-dev', component: ContactDevComponent, title: projectName + ' | Contact Dev'},
  {path: 'tracking-queries', component: TrackingQueriesComponent, title: projectName + ' | Tracking Queries'},
  {path: 'price-history', component: PriceHistoryComponent, title: projectName + ' | Price History'},
  {path: 'price-history/:good_id', component: PriceHistoryComponent, title: projectName + ' | Price History'},
  {
    path: 'availability-history',
    component: AvailabilityHistoryComponent,
    title: projectName + ' | Availability History'
  }, {
    path: 'availability-history/:good_id',
    component: AvailabilityHistoryComponent,
    title: projectName + ' | Availability History'
  },
  {path: 'trading-platforms', component: TradingPlatformsComponent, title: projectName + ' | Trading Platforms'},
  {path: 'goods', component: GoodsComponent, title: projectName + ' | Goods'}

];
