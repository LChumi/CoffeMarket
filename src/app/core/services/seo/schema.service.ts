import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {Producto} from "@models/producto";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private domain = environment.domain;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private renderer: Renderer2;
  /**
   * Inyecta el schema en el <head> del documento
   */
  injectSchema(schema: object, type: string): void {
    // Elimina cualquier script previo con el mismo tipo
    this.document.head.querySelectorAll(`script[data-schema-type="${type}"]`)
      .forEach(script => this.renderer.removeChild(this.document.head, script));

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);
    script.setAttribute('data-schema-type', type);
    this.renderer.appendChild(this.document.head, script);
  }

  /**
   * Schema para la página principal (index)
   */
  generateIndexSchema(): object {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${this.domain}/#breadcrumblist`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "@id": `${this.domain}/#listItem`,
              "position": 1,
              "name": "Inicio"
            }
          ]
        },
        this.generateOrganizationSchema(),
        {
          "@type": "WebPage",
          "@id": `${this.domain}/#webpage`,
          "url": this.domain,
          "name": "Bunna Cafe de Especialidad | Accesorios para Cafe",
          "description": "Explora nuestro universo cafetero: cafeteras, jarros, molinillos y más. Calidad y sabor desde Cuenca.",
          "inLanguage": "es-EC",
          "isPartOf": { "@id": `${this.domain}/#website` },
          "breadcrumb": { "@id": `${this.domain}/#breadcrumblist` },
          "datePublished": "2021-08-26T12:13:00-05:00",
          "dateModified": new Date().toISOString()
        },
        this.generateWebsiteSchema()
      ]
    };
  }

  /**
   * Schema para un producto
   */
  generateProductSchema(product: Producto, currentUrl: string): object {
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "@id": `${this.domain}/#listItem`,
        "position": 1,
        "name": "Inicio",
        "item": this.domain
      },
      {
        "@type": "ListItem",
        "@id": `${currentUrl}#listItem`,
        "position": 2,
        "name": product.descripcion
      }
    ];

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${currentUrl}#breadcrumblist`,
          "itemListElement": breadcrumbItems
        },
        {
          "@type": "ItemPage",
          "@id": `${currentUrl}#itempage`,
          "url": currentUrl,
          "name": `${product.descripcion} | Bunna Cafe de Especialidad`,
          "inLanguage": "es-EC",
          "isPartOf": { "@id": `${this.domain}/#website` },
          "breadcrumb": { "@id": `${currentUrl}#breadcrumblist` },
          "image": {
            "@type": "ImageObject",
            "url": product.imagenUrl,
            "@id": `${currentUrl}#mainImage`
          },
          "primaryImageOfPage": { "@id": `${currentUrl}#mainImage` },
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString()
        },
        this.generateOrganizationSchema(),
        this.generateWebsiteSchema(),
        {
          "@type": "Product",
          "@id": `${currentUrl}#product`,
          "sku": product.sku,
          "name": product.descripcion,
          "description": product.descripcion,
          "image": product.imagenUrl,
          "brand": { "@type": "Brand", "name": "Bunna" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.precio,
            "availability": `https://schema.org/${product.disponible ?? 'InStock'}`,
            "url": currentUrl,
            "seller": {
              "@type": "Organization",
              "name": "Bunna Cafe de Especialidad",
              "url": this.domain
            }
          }
        }
      ]
    };
  }

  /**
   * Schema para páginas de contenido genéricas
   */
  generateContentPageSchema(currentUrl: string, pageName: string, description: string): object {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${currentUrl}#breadcrumblist`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "@id": `${this.domain}/#listItem`,
              "position": 1,
              "name": "Inicio",
              "item": this.domain
            },
            {
              "@type": "ListItem",
              "@id": `${currentUrl}#listItem`,
              "position": 2,
              "name": pageName,
              "item": currentUrl
            }
          ]
        },
        this.generateOrganizationSchema(),
        {
          "@type": "WebPage",
          "@id": `${currentUrl}#webpage`,
          "url": currentUrl,
          "name": `${pageName} | Bunna Cafe de Especialidad`,
          "description": description,
          "inLanguage": "es-EC",
          "isPartOf": { "@id": `${this.domain}/#website` },
          "breadcrumb": { "@id": `${currentUrl}#breadcrumblist` },
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString()
        },
        this.generateWebsiteSchema()
      ]
    };
  }

  private generateOrganizationSchema(): object {
    return {
      "@type": "Organization",
      "@id": `${this.domain}/#organization`,
      "name": "Bunna Cafe de Especialidad",
      "description": "Cafe de especialidad y accesorios únicos desde Cuenca, Ecuador.",
      "url": this.domain,
      "email": "bunnacoffeemp@gmail.com",
      "telephone": "+593979126861",
      "logo": {
        "@type": "ImageObject",
        "url": `${this.domain}/favicon.ico`,
        "@id": `${this.domain}/#organizationLogo`,
        "width": 1200,
        "height": 900
      },
      "image": { "@id": `${this.domain}/#organizationLogo` },
      "sameAs": [
        "https://www.facebook.com/BunnaCafeEspecialidad",
        "https://www.instagram.com/bunnacafeec/"
      ]
    };
  }

  private generateWebsiteSchema(): object {
    return {
      "@type": "WebSite",
      "@id": `${this.domain}/#website`,
      "url": this.domain,
      "name": "Bunna Cafe de Especialidad",
      "alternateName": "Bunna Shop",
      "description": "Descubre nuestras exquisitas selecciones de cafe y accesorios.",
      "inLanguage": "es-EC",
      "publisher": { "@id": `${this.domain}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${this.domain}/products?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }
}
