import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-shopping-cart-sidebar',
  imports: [],
  templateUrl: './shopping-cart-sidebar.component.html',
  styles: ``
})
export class ShoppingCartSidebarComponent {

  private _visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() set visible(val: boolean) {
    this._visible = val;
  }

  get visible(): boolean{
    return this._visible;
  }
}
