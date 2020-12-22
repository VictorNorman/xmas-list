import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupMgmtPage } from './group-mgmt.page';

describe('GroupMgmtPage', () => {
  let component: GroupMgmtPage;
  let fixture: ComponentFixture<GroupMgmtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMgmtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupMgmtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
