import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConsentModalComponent} from "@components/consent-modal/consent-modal.component";
import {IndexNowService} from "@services/index-now.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsentModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private indexNow = inject(IndexNowService)

  title = 'Bunna Cafe';

  ngOnInit() {
    const urls = [
      'https://www.bunnashop.com/bunna/productos/1',
      'https://www.bunnashop.com/bunna/productos/2',
      'https://www.bunnashop.com/bunna/productos/3',
      'https://www.bunnashop.com/bunna/productos/4',
      'https://www.bunnashop.com/bunna/productos/5',
      'https://www.bunnashop.com/bunna/productos/6',
      'https://www.bunnashop.com/bunna/producto/6981606489809',
      'https://www.bunnashop.com/bunna/producto/6981606489816',
      'https://www.bunnashop.com/bunna/producto/6981606489823',
      'https://www.bunnashop.com/bunna/producto/6981606489847',
      'https://www.bunnashop.com/bunna/producto/6981606489854',
      'https://www.bunnashop.com/bunna/producto/6981606489861',
      'https://www.bunnashop.com/bunna/producto/6981606489885',
      'https://www.bunnashop.com/bunna/producto/6981606489892',
      'https://www.bunnashop.com/bunna/producto/6981606489908',
      'https://www.bunnashop.com/bunna/producto/6981606489953',
      'https://www.bunnashop.com/bunna/producto/6981606489984',
      'https://www.bunnashop.com/bunna/producto/6981606489991',
      'https://www.bunnashop.com/bunna/producto/6981606490003',
      'https://www.bunnashop.com/bunna/producto/6981606490027',
      'https://www.bunnashop.com/bunna/producto/6981606490119',
      'https://www.bunnashop.com/bunna/producto/6981606490133',
      'https://www.bunnashop.com/bunna/producto/6981606490171',
      'https://www.bunnashop.com/bunna/producto/6981606490188',
      'https://www.bunnashop.com/bunna/producto/6981606490195',
      'https://www.bunnashop.com/bunna/producto/6981606490218',
      'https://www.bunnashop.com/bunna/producto/6981606490256',
      'https://www.bunnashop.com/bunna/producto/8679874000267',
      'https://www.bunnashop.com/bunna/producto/8679874000304',
      'https://www.bunnashop.com/bunna/producto/8679874000311',
      'https://www.bunnashop.com/bunna/producto/8679874000328',
      'https://www.bunnashop.com/bunna/producto/8679874000328',
      'https://www.bunnashop.com/bunna/producto/8679874000342',
      'https://www.bunnashop.com/bunna/producto/8679874000359',
      'https://www.bunnashop.com/bunna/producto/8679874000366',
      'https://www.bunnashop.com/bunna/producto/8679874000373',
      'https://www.bunnashop.com/bunna/producto/8679874000380',
      'https://www.bunnashop.com/bunna/producto/8679874000397',
      'https://www.bunnashop.com/bunna/producto/8679874000403',
      'https://www.bunnashop.com/bunna/producto/8679874000410',
      'https://www.bunnashop.com/bunna/producto/8679874000427',
      'https://www.bunnashop.com/bunna/producto/8679874000434',
      'https://www.bunnashop.com/bunna/producto/8679874000441',
      'https://www.bunnashop.com/bunna/producto/8679874000458',
      'https://www.bunnashop.com/bunna/producto/8679874000465',
      'https://www.bunnashop.com/bunna/producto/8679874000472',
      'https://www.bunnashop.com/bunna/producto/8679874000489',
      'https://www.bunnashop.com/bunna/producto/8679874000496',
      'https://www.bunnashop.com/bunna/producto/8679874000502',
      'https://www.bunnashop.com/bunna/producto/8679874000519',
      'https://www.bunnashop.com/bunna/producto/8679874000526',
      'https://www.bunnashop.com/bunna/producto/8679874000533',
      'https://www.bunnashop.com/bunna/producto/8679874000540',
      'https://www.bunnashop.com/bunna/producto/8679874000557',
      'https://www.bunnashop.com/bunna/producto/8679874000564',
      'https://www.bunnashop.com/bunna/producto/8679874000571',
      'https://www.bunnashop.com/bunna/producto/8679874000588'
    ];
    this.indexNow.enviarUrls(urls)
  }
}
