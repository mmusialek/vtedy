import { TestBed, inject } from '@angular/core/testing';

import { Item.DetailsService } from './item.details.service';

describe('Item.DetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Item.DetailsService]
    });
  });

  it('should be created', inject([Item.DetailsService], (service: Item.DetailsService) => {
    expect(service).toBeTruthy();
  }));
});
