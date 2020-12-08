import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiftListPage } from './gift-list.page';

describe('GiftListPage', () => {
  let component: GiftListPage;
  let fixture: ComponentFixture<GiftListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
