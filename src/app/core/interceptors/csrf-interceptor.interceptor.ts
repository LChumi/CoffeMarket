import { HttpInterceptorFn } from '@angular/common/http';

export const csrfInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const methodsToCheck = ['POST', 'PUT', 'DELETE', 'PATCH'];
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (methodsToCheck.includes(req.method) && token) {
    req = req.clone({
      withCredentials: true,
      headers: req.headers.set('X-XSRF-TOKEN', token)
    });
  }
  return next(req);
};
