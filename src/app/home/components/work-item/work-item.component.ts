import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WorkModel } from '../../work.model';

@Component({
  selector: 'work-item',
  templateUrl: 'work-item.component.html',
  styleUrls: ['work-item.component.scss'],
})
export class WorkItemComponent {

  @Input() public item: WorkModel;

  public typeLabels: any;

  constructor(
    translate: TranslateService
  ) {
    this.typeLabels = translate.instant('tasks.types');
  }

}
