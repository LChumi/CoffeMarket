import { HttpInterceptorFn } from '@angular/common/http';

export const csrfInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const methods = ['POST','PUT','DELETE','PATCH'];

  const token = document.cookie
    .split('; ')
    .find(c => c.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

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
