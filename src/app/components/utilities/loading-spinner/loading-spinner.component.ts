import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.renderer[!this.toggled ? 'addClass': 'removeClass'](document.body, 'body--position__fixed')
  }

}
