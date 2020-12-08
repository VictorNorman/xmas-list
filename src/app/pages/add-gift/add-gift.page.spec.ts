import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGiftPage } from './add-gift.page';

describe('AddGiftPage', () => {
  let component: AddGiftPage;
  let fixture: ComponentFixture<AddGiftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGiftPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
