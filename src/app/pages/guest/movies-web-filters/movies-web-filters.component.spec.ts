import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesWebFiltersComponent } from './movies-web-filters.component';

describe('MoviesWebFiltersComponent', () => {
  let component: MoviesWebFiltersComponent;
  let fixture: ComponentFixture<MoviesWebFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesWebFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesWebFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
