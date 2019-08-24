import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {LoginService} from './login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNav=false;
  title = 'TestWeb';
  constructor(private router: Router, private data: LoginService) {

    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            if (event.url !="/reset")
            {
                console.log(event)
                this.data.testlogin();
            }
            
        }

        if (event instanceof NavigationEnd) {
            // Hide loading indicator
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator
            document.getElementById('generalMod').click();
            // Present error to user
            console.log(event.error);
        }
    });

}
}
