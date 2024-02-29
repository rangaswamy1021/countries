import { NgModule } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';

@NgModule({
  providers: [SplashScreenService],
})
export class CoreSplashScreenModule {
  constructor(private splashScreenService: SplashScreenService) {}
}
