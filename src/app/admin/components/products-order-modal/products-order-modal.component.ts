import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {ItemCarrito} from "@models/dto/item-carrito";
import {CurrencyPipe} from "@angular/common";
import {getUrlImage} from "@utils/image-util";

@Component({
  selector: 'app-products-order-modal',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './products-order-modal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export class ProductsOrderModalComponent {

  @Input() visible: boolean = false;

  @Input() items: ItemCarrito[] = [];

  @Output() close = new EventEmitter<void>();

  cerrar() {
    this.close.emit();
  }

  protected readonly getUrlImage = getUrlImage;
}
