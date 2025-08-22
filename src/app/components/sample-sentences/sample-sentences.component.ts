import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonLabel,
  IonItem,
  IonList,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ExampleSentence } from 'src/app/services/interfaces/dictionary.interface';

@Component({
  selector: 'app-sample-sentences',
  templateUrl: './sample-sentences.component.html',
  styleUrls: ['./sample-sentences.component.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonList, IonItem, IonLabel, AsyncPipe],
})
export class SampleSentencesComponent implements OnInit {
  dictionaryService = inject(DictionaryService);
  loading$ = this.dictionaryService.loadingSenteces$;
  error$ = this.dictionaryService.errorSentences$;
  sentences$ = this.dictionaryService.sentecesResult$;

  numberOfItemsArray = Array(3);

  constructor() {}

  ngOnInit() {}
}
