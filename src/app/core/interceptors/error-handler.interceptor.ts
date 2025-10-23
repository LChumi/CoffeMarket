import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e) {
        const msg = typeof e.error === 'object' && e.error.message
          ? e.error.message
          : typeof e.error === 'string'
            ? e.error
            : 'Error desconocido';

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

