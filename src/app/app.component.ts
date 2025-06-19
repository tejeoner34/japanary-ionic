import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu } from '@ionic/angular/standalone';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, SideMenuComponent, IonMenu],
})
export class AppComponent {
  constructor() {}
}
