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
    path: 'nav', 
    loadChildren: './nav/nav.module#NavPageModule' 
  },
  {
    path:'list2', 
    loadChildren: './list2/list2.component'
  },
  {
    path:'list3', 
    loadChildren: './list3/list3.component'
  },  { path: 'registerform', loadChildren: './registerform/registerform.module#RegisterformPageModule' }

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
