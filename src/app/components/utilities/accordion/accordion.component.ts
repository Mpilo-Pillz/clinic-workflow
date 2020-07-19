import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() heading: string;
  @Input() diagnosis: string;
  @Input() prescription: string;
  @Input() active = false;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onToggle(event) {
    event.preventDefault();
    this.toggle.emit(this.active);
    // this.active = !this.active;
  }

}
