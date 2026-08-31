import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from "@services/auth/auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, switchMap, throwError} from "rxjs";

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const excludedPaths = ['/auth/login', '/auth/refresh'];

  const request = req.clone({
    withCredentials: true,
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isExcluded = excludedPaths.some((path) => request.url.includes(path));
      if (error.status !== 401 || isExcluded) {
        return throwError(() => error);
      }

      return authService.refresh().pipe(
        switchMap(() => {
          return next(request);
        }),
        catchError((refreshError) => {
          router.navigate(['/login']).then(() => {});
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
