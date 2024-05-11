import {Routes} from '@angular/router';
import {TrackingQueriesComponent} from "./pages/tracking-queries/tracking-queries.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {ContactDevComponent} from "./pages/contact-dev/contact-dev.component";
import {PriceHistoryComponent} from "./pages/price-history/price-history.component";
import {TradingPlatformsComponent} from "./pages/trading-platforms/trading-platforms.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'contact-dev', component: ContactDevComponent},
  {path: 'tracking-queries', component: TrackingQueriesComponent},
  {path: 'price-history', component: PriceHistoryComponent},
  {path: 'trading-platforms', component: TradingPlatformsComponent},
];
