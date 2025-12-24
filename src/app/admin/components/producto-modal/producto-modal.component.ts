import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductoService} from "@services/producto.service";
import {ToastrService} from "ngx-toastr";
import {Categorias} from "@models/data/categorias";
import {DataService} from "@services/data/data.service";
import {Atributos} from "@models/dto/atributos";
import {Producto} from "@models/producto";

@Component({
  selector: 'app-producto-modal',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './producto-modal.component.html',
  styles: ``
})
export class ProductoModalComponent implements OnInit {

  private _visible: boolean = false;
  private _idProducto: string = '';

  @Input() modo!: string;

  @Input() set idProduct(value: string | null) {
    if (value) {
      // Modo edición → cargar datos del producto
      this.loadProduct(value);
      this._idProducto = value;
    } else {
      // Modo creación → resetear formulario
      this.productoForm.reset();
      this.etiquetasNuevas = []
      this.atributosNuevo = []
    }
  }

  @Input() set visible(visible: boolean) {
    this._visible = visible;
    if (visible) {
      this.initializeModal()
    }
  }

  get visible() {
    return this._visible;
  }

  @Output() saveRequest = new EventEmitter<{editUpdate: boolean}>
  @Output() visibleChange = new EventEmitter<boolean>();

  private productoService = inject(ProductoService);
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  protected categorias: Categorias[] = []
  protected etiquetasNuevas: string[] = []
  protected atributosNuevo: Atributos[] = []
  atributo: Atributos = {} as Atributos;
  etiqueta = ''

  productoForm!: FormGroup;

  constructor() {
    this.productoForm = this.fb.group({
      sku: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      item: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      categoria: ['', [Validators.required]],
    });
    this.loadCategories()
  }

  ngOnInit(): void {
        this.loadCategories()
    }

  loadCategories() {
    this.dataService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }

  initializeModal(){
    if (this.idProduct){
      console.log(this.idProduct)
    }
  }

  cerrarModal() {
    this.visibleChange.emit(false);
    this.etiquetasNuevas = []
    this.atributosNuevo = []
    this._idProducto = ''
  }

  addLabel(){

    const value = this.etiqueta?.trim();

    if (!value) return;

    if (!this.etiquetasNuevas.includes(value)) {
      this.etiquetasNuevas.push(value);
    }

    this.etiqueta = '';
  }
  removeLabel(index: number) {
    this.etiquetasNuevas.splice(index, 1);
  }

  addAtributo() {
    const nombre = this.atributo?.nombre?.trim();
    const detalle = this.atributo?.detalle?.trim();
    // Validar que ambos campos tengan valor
    if (!nombre || !detalle) return;
    // Evitar duplicados (comparando nombre + detalle)
    const existe = this.atributosNuevo.some(
      at => at.nombre === nombre && at.detalle === detalle
    );

    if (!existe) {
      this.atributosNuevo.push({ nombre, detalle });
    }
    // Resetear el objeto temporal
    this.atributo = {} as Atributos;
  }

  removeAtributo(index: number) {
    this.atributosNuevo.splice(index, 1);
  }

  agregarEditarProducto(){
    if (this.productoForm.invalid) {
      this.toastr.warning('Pro favor llene los campos del formulario');
      return;
    }
    const sku = this.productoForm.get('sku')?.value;
    const item = this.productoForm.get('item')?.value;
    const descripcion = this.productoForm.get('descripcion')?.value;
    const precio = this.productoForm.get('precio')?.value;
    const categoria = this.productoForm.get('categoria')?.value;
    const etiquetas = this.etiquetasNuevas
    const atributos = this.atributosNuevo

    const producto: Producto ={
      id: null,
      sku: sku,
      item: item,
      descripcion: descripcion,
      precio: precio,
      disponible: true,
      stock: 0,
      categoriaId: categoria,
      etiquetas: etiquetas,
      atributos: atributos,
      variantes: []
    }

    if (this._idProducto) {
      this.productoService.update(this._idProducto, producto).subscribe({
        next: data => {
          this.toastr.success('Producto actualizado con exito!');
          this.visibleChange.emit(false);
          this.saveRequest.emit({editUpdate: true});
        }
      })
    } else {
      this.productoService.save(producto).subscribe({
        next: data => {
          this.toastr.success('Producto guardado con exito');
          this.visibleChange.emit(false);
          this.saveRequest.emit({editUpdate: true});
        }
      })
    }
  }

  private loadProduct(id: string){
    this.productoService.getById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.productoForm.patchValue({
          sku: data.sku,
          item: data.item,
          descripcion: data.descripcion,
          precio: data.precio,
          categoria: data.categoriaId,
        });
        this.etiquetasNuevas = data.etiquetas;
        this.atributosNuevo = data.atributos;
      }
    });
  }
}
