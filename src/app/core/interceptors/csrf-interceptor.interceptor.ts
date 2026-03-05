import { HttpInterceptorFn } from '@angular/common/http';

export const csrfInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const methods = ['POST','PUT','DELETE','PATCH'];

  const token = document.cookie
    .split('; ')
    .find(c => c.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  req = req.clone({ withCredentials: true });

  if (methods.includes(req.method) && token) {
    req = req.clone({
      headers: req.headers.set('X-XSRF-TOKEN', token)
    });
  }

  return next(req);
};
