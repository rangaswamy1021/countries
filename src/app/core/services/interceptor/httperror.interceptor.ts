import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const httpErrorInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const snackBarService = inject(SnackBarService);
  // Clone the request object
  let newReq = req.clone();

  // Response
  return next(newReq).pipe(
    catchError((error) => {
      return handleError(error);
    }),
  );

  function handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 400: {
          errorMessage = `Bad request: ${err.error.message}`;
          break;
        }
        case 401: {
          errorMessage = `Unauthorized: ${err.error.message}`;
          break;
        }
        case 403: {
          errorMessage = `Forbidden: ${err.error.message}`;
          break;
        }
        case 404: {
          errorMessage = `Not found: ${err.error.message}`;
          break;
        }
        case 500: {
          errorMessage = `Internal server error: ${err.error.message}`;
          break;
        }
        case 503: {
          errorMessage = `Service unavailable: ${err.error.message}`;
          break;
        }
        case 422: {
          errorMessage = `Unprocessable entity: ${err.error.message}`;
          break;
        }
        default: {
          errorMessage = `Error code ${err.status}: ${err.error.message}`;
          break;
        }
      }
    }
    snackBarService.openSanckBar('Okay', 'st-snack-danger');
    return throwError(() => err);
  }
};
