import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './fcm.service';
import { ToastController } from '@ionic/angular';

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
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    {
      title: 'My Vehicles',
      url: '/vehicles',
      icon: 'logo-model-s'
    },
    // {
    //   title: 'Settings',
    //   url: '/modifybooking',
    //   icon: 'build'
    // },
    // {
    //   title: 'Help',
    //   url: '/resetpassword',
    //   icon: 'help'
    // },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  // private async presentToast(message) {
  //   const toast = await this.toastController.create({
  //     message,
  //     duration: 3000
  //   });
  //   toast.present();
  // }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          // this.presentToast(msg.aps.alert);
        } else {
          // this.presentToast(msg.body);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
}
