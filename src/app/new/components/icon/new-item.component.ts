import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {

  @Input() public icon: string;
  @Input() public label: string;
  @Input() public completed = false;

  @Output() public onClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onItemClick() {
    this.onClick.emit();
  }

}
