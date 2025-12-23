import {AfterViewInit, Component, EventEmitter, inject, Input, input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductoService} from "@services/producto.service";
import {ToastrService} from "ngx-toastr";
import {Categorias} from "@models/data/categorias";
import {DataService} from "@services/data/data.service";
import {Atributos} from "@models/dto/atributos";

@Component({
  selector: 'app-producto-modal',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './producto-modal.component.html',
  styles: ``
})
export class ProductoModalComponent implements OnChanges {

  private _visible: boolean = false;

  @Input() modo!: string;
  @Input() idProduct!: string;
  @Input() set visible(visible: boolean) {
    this._visible = visible;
    if (visible) {
      this.initializeModal()
    }
  }

  get visible() {
    return this._visible;
  }

  @Output() saveRequest = new EventEmitter<{visible: boolean}>
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
      sku: ['', Validators.required, Validators.pattern('^[0-9]+$')], //solo se aceptan numeros sin letras
      item: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],//numero entero o decimal con dos decimales
      categoria: ['', Validators.required],
    })
    this.loadCategories()
  }

  ngOnChanges(): void {
    this.initializeModal()
  }

  loadCategories() {
    this.dataService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }

  initializeModal(){

  }

  cerrarModal() {
    this.visibleChange.emit(false);
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

  }
}
