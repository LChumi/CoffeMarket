import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {ClarityService} from "@services/data/clarity.service";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
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
            toastr.error(msg, 'Solicitud inválida');
            break;
          case 401:
            toastr.error(msg, 'No autorizado');
            break;
          case 403:
            toastr.error('No tienes permitido hacer esto.', 'Prohibido');
            break;
          case 404:
            toastr.error(msg, 'No encontrado');
            break;
          case 500:
            toastr.error(msg, 'Error del servidor');
            break;
          default:
            toastr.error(msg, `Error ${e.status}`);
            break;
        }
      }

      return throwError(() => e);
    })
  );
};

