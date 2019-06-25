import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Profile',
      url: '/rangerprofile',
      icon: 'contact'
    },
    
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'chatboxes'
    },
    {
      title: 'Bookings',
      url: '/shiftbookings',
      icon: 'calendar'
    },
    {
      title: 'Patrol',
      url: '/rangerpatrol',
      icon: 'navigate'
    },
    {
      title: 'Rewards',
      url: '/rewards',
      icon: 'star'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'My Vehicles',
      url: '/vehicles',
      icon: 'logo-model-s'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'build'
    },
    {
      title: 'Help',
      url: '/helppage',
      icon: 'help'
    },
    {
      title: 'Logout',
      url: '/Logout',
      icon: 'log-out'
    },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
