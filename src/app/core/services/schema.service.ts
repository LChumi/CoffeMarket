import {inject, Injectable, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Products} from "@models/data/products";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private document = inject(DOCUMENT);

  constructor() { }

  /**
   * Inserta el schema JSON-LD en el <head>
   */
  insertSchema(schema: object, type: 'WebSite' | 'Product' | 'Organization'): void {
    // Si NO es WebSite, eliminamos los anteriores del mismo tipo
    if (type !== 'WebSite') {
      const existingSchemas = this.document.head.querySelectorAll(
        'script[type="application/ld+json"][data-schema-type="' + type + '"]'
      );
      existingSchemas.forEach(tag => tag.remove());
    }

    // Insertar el nuevo schema con tipo marcado
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.setAttribute('data-schema-type', type);
    this.document.head.appendChild(script);
  }

  /**
   * Crea schema de tipo Organización
   */
  generateOrganizationSchema(domain: string): object {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bunna",
      "url": domain,
      "logo": `${domain}/images/logos/caffeCirc.webp`,
      "sameAs": [
        "https://www.instagram.com/bunnacafeec/",
        "https://www.facebook.com/BunnaCafeEspecialidad"
      ]
    };
  }

  /**
   * Crea schema de tipo Producto
   */
  generateProductSchema(product : Products, domain: string, currentUrl: string): object {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "sku": product.sku,
      "name": product.item,
      "description": product.descripcion,
      "image": `${domain}/images/products/${product.sku}.webp`,
      "brand": { "@type": "Brand", "name": "Bunna" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": product.precio,
        "availability": "https://schema.org/InStock",
        "url": currentUrl
      }
    };
  }

  /**
   * Crea schema tipo WebSite
   */
  generateWebSiteSchema(domain: string): object {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Bunna Café",
      "url": domain,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${domain}/bunna/products?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }
}
