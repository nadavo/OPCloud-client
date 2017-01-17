/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommandManagerService } from './command-manager.service';

describe('CommandManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandManagerService]
    });
  });

  it('should ...', inject([CommandManagerService], (service: CommandManagerService) => {
    expect(service).toBeTruthy();
  }));
});
