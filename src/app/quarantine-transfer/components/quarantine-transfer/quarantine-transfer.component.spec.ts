import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarantineTransferComponent } from './quarantine-transfer.component';

describe('QuarantineTransferComponent', () => {
  let component: QuarantineTransferComponent;
  let fixture: ComponentFixture<QuarantineTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarantineTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarantineTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
