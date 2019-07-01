import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'registerform',
    loadChildren: './registerform/registerform.module#RegisterformPageModule'
  },
  { 
    path: 'nav', 
    loadChildren: './nav/nav.module#NavPageModule' 
  },
  /*{ path: 'modifyranger',
   loadChildren: './modifyranger/modifyranger.module#ModifyrangerPageModule'
   },  */
  //  { path: 'registerform',
  //  loadChildren: './registerform/registerform.module#registerformPageModule'
  //  },  
  { path: 'rangerprofile', 
  loadChildren: './rangerprofile/rangerprofile.module#RangerprofilePageModule'
   },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'shiftbookings', loadChildren: './shiftbookings/shiftbookings.module#ShiftbookingsPageModule' },
  { path: 'rangerpatrol', loadChildren: './rangerpatrol/rangerpatrol.module#RangerpatrolPageModule' },
  { path: 'rewards', loadChildren: './rewards/rewards.module#RewardsPageModule' },
  { path: 'vehicles', loadChildren: './vehicles/vehicles.module#VehiclesPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'helppage', loadChildren: './helppage/helppage.module#HelppagePageModule' },
  { path: 'rewardtype', loadChildren: './rewardtype/rewardtype.module#RewardtypePageModule' },
  { path: 'incidents', loadChildren: './incidents/incidents.module#IncidentsPageModule' },  { path: 'generagevoucher', loadChildren: './generagevoucher/generagevoucher.module#GeneragevoucherPageModule' },
  { path: 'confirm-reward', loadChildren: './confirm-reward/confirm-reward.module#ConfirmRewardPageModule' },
  { path: 'voucher', loadChildren: './voucher/voucher.module#VoucherPageModule' },
  { path: 'generated-vouchers', loadChildren: './generated-vouchers/generated-vouchers.module#GeneratedVouchersPageModule' },
  { path: 'view-vouchar', loadChildren: './view-vouchar/view-vouchar.module#ViewVoucharPageModule' },
  { path: 'error-not-enough-points', loadChildren: './error-not-enough-points/error-not-enough-points.module#ErrorNotEnoughPointsPageModule' },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
