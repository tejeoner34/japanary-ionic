import { Component, Input, OnInit } from '@angular/core';
import {
  IonSkeletonText,
  IonLabel,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-item-skeleton',
  templateUrl: './search-item-skeleton.component.html',
  styleUrls: ['./search-item-skeleton.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonSkeletonText],
})
export class SearchItemSkeletonComponent implements OnInit {
  numberOfItemsArray: number[] = [0];

  @Input() set numberOfItems(value: number) {
    console.log('Setting numberOfItems:', value);
    this.numberOfItemsArray = Array.from({ length: value }, (_, i) => i);
  }
  constructor() {}

  ngOnInit() {}
}
