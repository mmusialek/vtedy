import { TestBed, async, inject } from '@angular/core/testing';

import { IsUserAuthenticatedGuard } from './is-user-authenticated.guard';

describe('IsUserAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsUserAuthenticatedGuard]
    });
  });

  it('should ...', inject([IsUserAuthenticatedGuard], (guard: IsUserAuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
