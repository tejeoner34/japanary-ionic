import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DictionarySearchFormComponent } from './dictionary-search-form.component';

describe('DictionarySearchFormComponent', () => {
  let component: DictionarySearchFormComponent;
  let fixture: ComponentFixture<DictionarySearchFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionarySearchFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DictionarySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
