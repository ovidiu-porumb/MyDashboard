import { TestBed, inject } from '@angular/core/testing';

import { DaysOfSprintServiceService } from './days-of-sprint-service.service';

describe('DaysOfSprintServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaysOfSprintServiceService]
    });
  });

  it('should be created', inject([DaysOfSprintServiceService], (service: DaysOfSprintServiceService) => {
    expect(service).toBeTruthy();
  }));
});
