import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { FcmService } from './fcm.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoginService } from './login.service';
import { Storage } from '@ionic/storage';
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
    Showsplash =true;

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController,
    private router: Router, private data: LoginService,
    public loadingController: LoadingController,
    public storage:Storage
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.presentLoading();
        if (event.url != "/login") {
            if (event.url != "/reset") {
                // console.log(event)
                this.data.testlogin();
            }
        }
          
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });


  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  private async presentToast(message) {
    const alert = await this.alertCtrl.create({
      header: "Incident Aert",
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
      timer(3000).subscribe(()=>this.Showsplash = false)
    });
  }
  Logout(){
    this.storage.clear();
    this.router.navigateByUrl("/login")
  }
}
