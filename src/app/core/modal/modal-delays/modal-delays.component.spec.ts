import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDelaysComponent } from './modal-delays.component';

describe('ModalDelaysComponent', () => {
  let component: ModalDelaysComponent;
  let fixture: ComponentFixture<ModalDelaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDelaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDelaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
