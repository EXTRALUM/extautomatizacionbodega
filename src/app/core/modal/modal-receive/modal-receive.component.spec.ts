import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReceiveComponent } from './modal-receive.component';

describe('ModalReceiveComponent', () => {
  let component: ModalReceiveComponent;
  let fixture: ComponentFixture<ModalReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
