import { HttpInterceptorFn } from '@angular/common/http';
import {getCookie} from "@utils/csrf-utils";

export const csrfInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const methods = ['POST','PUT','DELETE','PATCH'];
  const token = getCookie('XSRF-TOKEN');

  if (methods.includes(req.method) && token) {
    req = req.clone({
      withCredentials: true,
      setHeaders: {
        'X-XSRF-TOKEN': token
      }
    });
  } else {
    req = req.clone({ withCredentials: true });
  }

  return next(req);
};
