import {afterNextRender, Component, computed, ElementRef, inject, OnInit, signal} from '@angular/core';
import {CAFETERIA_MENU, MenuCategoria} from "@pages/cafeteria/mocks/menu-categoria.mock";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {environment} from "@environments/environment";
import {SchemaService} from "@services/seo/schema.service";
import {MetaService} from "@services/seo/meta.service";

@Component({
  selector: 'app-menus',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './menus.component.html',
  styles: ``
})
export class MenusComponent implements OnInit {

  private domain = environment.domain;
  private router = inject(Router)
  private schemaService = inject(SchemaService)
  private seoService = inject(MetaService)
  private route = inject(ActivatedRoute);
  private elRef = inject(ElementRef<HTMLElement>);

  categorias: MenuCategoria[] = CAFETERIA_MENU;

  /** slug inicial que viene por queryParam, ej: /cafeteria/menu?categoria=cafes-filtrados */
  private slugInicial = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('categoria'))),
    { initialValue: null },
  );

  categoriaActiva = signal<string>(this.categorias[0].slug);

  categoriaSeleccionada = computed<MenuCategoria>(
    () => this.categorias.find((c) => c.slug === this.categoriaActiva()) ?? this.categorias[0],
  );

  constructor() {
    // una vez el DOM ya pintó los tabs, centra el tab activo (sin animación,
    // para que no se sienta como un "salto" al cargar la página)
    afterNextRender(() => {
      this.centrarTab(this.categoriaActiva(), 'instant');
    });
  }

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`;

    const title = 'Bunna Coffee Shop | Menu de Cafe de Especialidad';
    const description = 'Explora el menu de Bunna Coffee Shop: cafes de especialidad, bebidas artesanales y opciones dulces y saladas para acompañar tu experiencia unica en Cuenca.'

    this.seoService.updateMetaTags({
      title,
      description,
      canonicalUrl: currentUrl,
      og: {
        title,
        description,
        url: currentUrl,
        image: `${this.domain}/images/logos/bunnaCirc.webp`
      }
    });

    const schema = this.schemaService.generateContentPageSchema(
      currentUrl,
      'Menú | Bunna Coffee Shop',
      description,
      true);
    this.schemaService.injectSchema(schema, 'Menu');
    const inicial = this.slugInicial();
    if (inicial && this.categorias.some((c) => c.slug === inicial)) {
      this.categoriaActiva.set(inicial);
    }
  }

  seleccionar(slug: string): void {
    this.categoriaActiva.set(slug);
    this.centrarTab(slug, 'smooth');
  }

  private centrarTab(slug: string, behavior: ScrollBehavior): void {
    const boton = this.elRef.nativeElement.querySelector(`[data-slug="${slug}"]`) as HTMLElement | null;
    boton?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
  }

  /**
   * Convierte "Café de la Casa Bunna" -> "cafe-de-la-casa-bunna"
   * para armar la ruta del asset: /images/menu/cafe-de-la-casa-bunna.webp
   */
  getImageName(nombre: string): string {
    return nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quita tildes
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  /**
   * Si la foto del item aún no existe en /images/menu, oculta el <img> roto
   * y deja visible la inicial de fondo (ya está en el DOM, detrás de la imagen).
   */
  ocultarImagenRota(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
