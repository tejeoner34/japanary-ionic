import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar, IonHeader],
})
export class SideMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
