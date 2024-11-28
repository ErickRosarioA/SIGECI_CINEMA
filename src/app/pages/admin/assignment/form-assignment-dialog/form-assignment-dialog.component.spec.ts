import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssignmentDialogComponent } from './form-assignment-dialog.component';

describe('FormAssignmentDialogComponent', () => {
  let component: FormAssignmentDialogComponent;
  let fixture: ComponentFixture<FormAssignmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAssignmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
