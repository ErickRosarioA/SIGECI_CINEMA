import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMovieDialogComponent } from './form-movie-dialog.component';

describe('FormMovieDialogComponent', () => {
  let component: FormMovieDialogComponent;
  let fixture: ComponentFixture<FormMovieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMovieDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
