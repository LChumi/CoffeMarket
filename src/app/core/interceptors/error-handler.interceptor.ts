import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {ClarityService} from "@services/data/clarity.service";
import {MessageService} from "primeng/api";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(MessageService);
  const clarity = inject(ClarityService)

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e) {
        const msg = typeof e.error === 'object' && e.error.message
          ? e.error.message
          : typeof e.error === 'string'
            ? e.error
            : 'Error desconocido';

        // Enviar evento a Clarity
        clarity.event(`Error HTTP ${e.status}: ${msg}`);

        // Etiquetar la sesión con el tipo de error
        clarity.setTag('errorHttp', e.status.toString());
        clarity.setTag('errorUrl', req.url);

        // Priorizar si es grave
        if (e.status >= 500) {
          clarity.prioritize(`Error crítico en ${req.url}`);
        }

        // Mostrar error al usuario
        switch (e.status) {
          case 400:
            toastr.add({ severity: 'error', summary: msg, detail: 'Solicitud inválida'})
            break;
          case 401:
            toastr.add({ severity: 'error', summary: msg, detail: 'No autorizado'})
            break;
          case 403:
            toastr.add({ severity: 'error', summary: msg, detail: 'No tienes permitido hacer esto.\', \'Prohibido'})
            break;
          case 404:
            toastr.add({ severity: 'error', summary: msg, detail: 'No encontrado'})
            break;
          case 500:
            toastr.add({ severity: 'error', summary: msg, detail: 'Error del servidor'})
            break;
          default:
            console.error('Error de servidor o ruta dañada')
            break;
        }
      }

      return throwError(() => e);
    })
  );
};

