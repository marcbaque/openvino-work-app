import { Component, Input } from '@angular/core';
import { WorkModel } from '../../work.model';

@Component({
  selector: 'work-item',
  templateUrl: 'work-item.component.html',
  styleUrls: ['work-item.component.scss'],
})
export class WorkItemComponent {

  @Input() public item: WorkModel;

  constructor() {}

}
