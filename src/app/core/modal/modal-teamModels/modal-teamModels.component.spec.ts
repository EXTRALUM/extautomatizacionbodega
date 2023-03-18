import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalTeamModelsComponent } from './modal-teamModels.component';

describe('ModalDelaysComponent', () => {
  let component: ModalTeamModelsComponent;
  let fixture: ComponentFixture<ModalTeamModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTeamModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTeamModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
