/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModelStorageService } from './model-storage.service';

describe('ModelStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelStorageService]
    });
  });

  it('should ...', inject([ModelStorageService], (service: ModelStorageService) => {
    expect(service).toBeTruthy();
  }));
});
