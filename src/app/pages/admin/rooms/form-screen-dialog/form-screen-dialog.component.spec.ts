import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScreenDialogComponent } from './form-screen-dialog.component';

describe('FormScreenDialogComponent', () => {
  let component: FormScreenDialogComponent;
  let fixture: ComponentFixture<FormScreenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormScreenDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormScreenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
