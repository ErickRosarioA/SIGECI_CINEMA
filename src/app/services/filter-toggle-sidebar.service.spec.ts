import { TestBed } from '@angular/core/testing';

import { FilterToggleSidebarService } from './filter-toggle-sidebar.service';

describe('FilterToggleSidebarService', () => {
  let service: FilterToggleSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterToggleSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
