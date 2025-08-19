import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCreateFlashcardComponent } from './modal-create-flashcard.component';

describe('ModalCreateFlashcardComponent', () => {
  let component: ModalCreateFlashcardComponent;
  let fixture: ComponentFixture<ModalCreateFlashcardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalCreateFlashcardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCreateFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
