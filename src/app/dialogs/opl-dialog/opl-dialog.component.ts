import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'opcloud-opl-dialog',
  template: `
    <p [innerHTML]="link.attributes.opl">
      
    </p>
  `,
  styleUrls: ['./opl-dialog.component.css']
})
export class OplDialogComponent implements OnInit {

  public link;

  constructor() { }

  ngOnInit() {
  }

}
