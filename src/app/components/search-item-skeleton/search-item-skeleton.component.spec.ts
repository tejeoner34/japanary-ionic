import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchItemSkeletonComponent } from './search-item-skeleton.component';

describe('SearchItemSkeletonComponent', () => {
  let component: SearchItemSkeletonComponent;
  let fixture: ComponentFixture<SearchItemSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
