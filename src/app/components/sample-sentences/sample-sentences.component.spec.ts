import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SampleSentencesComponent } from './sample-sentences.component';

describe('SampleSentencesComponent', () => {
  let component: SampleSentencesComponent;
  let fixture: ComponentFixture<SampleSentencesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SampleSentencesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
