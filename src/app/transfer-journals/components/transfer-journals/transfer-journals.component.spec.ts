import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferJournalsComponent } from './transfer-journals.component';

describe('TransferJournalsComponent', () => {
  let component: TransferJournalsComponent;
  let fixture: ComponentFixture<TransferJournalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferJournalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferJournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
