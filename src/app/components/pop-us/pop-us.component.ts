import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pop-us',
  imports: [],
  templateUrl: './pop-us.component.html',
  styles: ``
})
export class PopUsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const triggerModal = () => {
        setTimeout(() => {
          this.showModal = false;
        }, 5000); // se cierra en 5 segundos
        window.removeEventListener('scroll', triggerModal);
        window.removeEventListener('click', triggerModal);
      };

      window.addEventListener('scroll', triggerModal);
      window.addEventListener('click', triggerModal);
    }
  }

  titulo: string='';
  mensage:string='';
  showModal:boolean=true;
}
