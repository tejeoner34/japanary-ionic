import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyPedingCardsPage } from './study-peding-cards.page';

describe('StudyPedingCardsPage', () => {
  let component: StudyPedingCardsPage;
  let fixture: ComponentFixture<StudyPedingCardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPedingCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
