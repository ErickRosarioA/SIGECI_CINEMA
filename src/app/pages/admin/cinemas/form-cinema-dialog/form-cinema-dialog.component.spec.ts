import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCinemaDialogComponent } from './form-cinema-dialog.component';

describe('FormCinemaDialogComponent', () => {
  let component: FormCinemaDialogComponent;
  let fixture: ComponentFixture<FormCinemaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCinemaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCinemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
