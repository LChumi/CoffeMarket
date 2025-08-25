import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IndexNowService {

  private http = inject(HttpClient)

  private endpoint = 'https://api.indexnow.org/indexnow';

  constructor() { }

  enviarUrls(urls: string[]) {
    const payload = {
      host: 'bunnashop.com',
      key: 'bd71eadb4cdc4896b4a2c788e8a82169',
      keyLocation: 'https://www.bunnashop.com/bd71eadb4cdc4896b4a2c788e8a82169.txt',
      urlList: urls
    };

    return this.http.post(this.endpoint, payload);
  }
}
