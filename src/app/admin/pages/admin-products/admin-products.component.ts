import {Component, inject, OnInit, ChangeDetectionStrategy, computed, signal} from '@angular/core';
import {ProductoService} from "@services/producto.service";
import {Producto} from "@models/producto";
import {CurrencyPipe} from "@angular/common";
import {getUrlImage} from "@utils/image-util";
import {ProductoModalComponent} from "@admin/components/producto-modal/producto-modal.component";
import {MessageService} from "primeng/api";

type FiltroStock = 'todos' | 'conStock' | 'sinStock';

@Component({
  selector: 'app-admin-products',
  imports: [
    CurrencyPipe,
    ProductoModalComponent
  ],
  templateUrl: './admin-products.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AdminProductsComponent implements OnInit {

  private productsService = inject(ProductoService);
  private toastr = inject(MessageService);

  productos = signal<Producto[]>([]);
  cargando = signal(true);
  busqueda = signal('');
  filtroStock = signal<FiltroStock>('todos');
  confirmandoId = signal<string | null>(null);
  modalProducto = false;
  modo: 'agregar' | 'editar' = 'agregar';
  idProducto = '';

  readonly stockBajo = 5;

  readonly filtros: { valor: FiltroStock; etiqueta: string; conteo: 'total' | 'conStock' | 'sinStock' }[] = [
    { valor: 'todos', etiqueta: 'Todos', conteo: 'total' },
    { valor: 'conStock', etiqueta: 'Con stock', conteo: 'conStock' },
    { valor: 'sinStock', etiqueta: 'Agotados', conteo: 'sinStock' }
  ];

  conteo = _i2.computed(() => {
    const lista = this.productos();
    const conStock = lista.filter(p => p.stock > 0).length;
    return { total: lista.length, conStock, sinStock: lista.length - conStock };
  });

  productosFiltrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    const filtro = this.filtroStock();

    return this.productos()
      .filter(p => filtro === 'todos' || (filtro === 'conStock' ? p.stock > 0 : p.stock <= 0))
      .filter(p =>
        !q ||
        p.sku?.toString().toLowerCase().includes(q) ||
        p.item?.toLowerCase().includes(q) ||
        p.descripcion?.toLowerCase().includes(q)
      )
      .sort((a, b) => Number(b.stock > 0) - Number(a.stock > 0));
  });

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.cargando.set(true);
    this.productsService.getAll().subscribe({
      next: data => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
        this.toastr.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos' });
      }
    });
  }

  limpiarFiltros() {
    this.busqueda.set('');
    this.filtroStock.set('todos');
  }

  abrirModal() {
    this.idProducto = '';
    this.modo = 'agregar';
    this.modalProducto = true;
  }

  abrirModalProducto(producto: Producto) {
    this.idProducto = producto.id;
    this.modo = 'editar';
    this.modalProducto = true;
  }

  deleteProduct(producto: Producto) {
    this.productsService.delete(producto.id).subscribe({
      next: () => {
        this.confirmandoId.set(null);
        this.toastr.add({ severity: 'info', summary: 'Info', detail: 'Producto eliminado' });
        this.getProductos();
      },
      error: () => {
        this.confirmandoId.set(null);
        this.toastr.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto' });
      }
    });
  }

  handleSaveRequest(event: { editUpdate: boolean }) {
    if (event.editUpdate) {
      this.idProducto = '';
      this.getProductos();
    }
  }

  protected readonly getUrlImage = getUrlImage;
}
