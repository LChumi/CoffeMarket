import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateMetaTags(config: {
    title: string;
    description: string;
    canonicalUrl: string;
    og?: { title: string; description: string; url: string; image: string };
  }): void {
    this.title.setTitle(config.title);

    this.updateOrAddTag('name', 'description', config.description);
    this.updateOrAddTag('name', 'robots', 'index, follow');
    this.updateCanonical(config.canonicalUrl);

    if (config.og) {
      this.updateOrAddTag('property', 'og:title', config.og.title);
      this.updateOrAddTag('property', 'og:description', config.og.description);
      this.updateOrAddTag('property', 'og:url', config.og.url);
      this.updateOrAddTag('property', 'og:image', config.og.image);
    }
  }

  private updateOrAddTag(attr: 'name' | 'property', key: string, value: string): void {
    const tag = this.meta.getTag(`${attr}="${key}"`);
    if (tag) {
      this.meta.updateTag({ [attr]: key, content: value });
    } else {
      this.meta.addTag({ [attr]: key, content: value });
    }
  }

  private updateCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }
}
