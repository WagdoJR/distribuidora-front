import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoaderService} from "./loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requestCount: number;

  /**
   * Construtor da classe.
   *
   * @param loaderService
   */
  constructor(private loaderService: LoaderService) {
    this.requestCount = 0;
  }

  /**
   * Método responsável por interceptar a requisição Http.
   *
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (++this.requestCount === 1) {
      this.loaderService.onStart.emit();
    }

    return next.handle(request).pipe(finalize(() => {
      if (--this.requestCount === 0) {
        this.loaderService.onStop.emit();
      }
    }));
  }
}
