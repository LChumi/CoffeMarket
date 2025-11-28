import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pop-us',
  imports: [],
  templateUrl: './pop-us.component.html',
  styles: ``
})
export class PopUsComponent implements AfterViewInit {

  titulo: string='';
  mensage:string='';
  showModal:boolean=true;

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const triggerModal = () => {
        // Mostrar el modal 1 segundo después del evento
        setTimeout(() => {
          this.showModal = true;

          // Cierre automático después de 3 segundos
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        }, 1000);

        // Elimina los listeners después del primer disparo
        window.removeEventListener('scroll', triggerModal);
        window.removeEventListener('click', triggerModal);
      };

      window.addEventListener('scroll', triggerModal);
      window.addEventListener('click', triggerModal);
    }
  }

}
