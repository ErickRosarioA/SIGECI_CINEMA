import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterToggleSidebarComponent } from './filter-toggle-sidebar.component';

describe('FilterToggleSidebarComponent', () => {
  let component: FilterToggleSidebarComponent;
  let fixture: ComponentFixture<FilterToggleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterToggleSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterToggleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
