import { Component, Input, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { Sense } from 'src/app/services/interfaces/dictionary.interface';

@Component({
  selector: 'app-word-meaning',
  templateUrl: './word-meaning.component.html',
  styleUrls: ['./word-meaning.component.scss'],
  standalone: true,
  imports: [IonButton],
})
export class WordMeaningComponent implements OnInit {
  @Input() senses: Sense[] = [];

  constructor() {}

  ngOnInit() {}
}
