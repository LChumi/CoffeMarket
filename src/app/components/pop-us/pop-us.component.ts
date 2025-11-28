import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pop-us',
  imports: [],
  templateUrl: './pop-us.component.html',
  styles: ``
})
export class PopUsComponent implements OnInit {

  titulo: string='';
  mensage:string='';
  showModal:boolean=true;

  ngOnInit() {
    setTimeout(() => {
      this.showModal = false;
    }, 5000); // se cierra en 5 segundos
  }


}
