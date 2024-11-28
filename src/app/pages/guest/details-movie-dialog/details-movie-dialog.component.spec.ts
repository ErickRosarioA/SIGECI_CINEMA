import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMovieDialogComponent } from './details-movie-dialog.component';

describe('DetailsMovieDialogComponent', () => {
  let component: DetailsMovieDialogComponent;
  let fixture: ComponentFixture<DetailsMovieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMovieDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
