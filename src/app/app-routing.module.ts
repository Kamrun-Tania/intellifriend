import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './shared/components/layout/full-layout/full-layout.component';
import { content } from "./shared/routes/content.routes";
import { full } from './shared/routes/full.routes';
import { AuthGuard } from '@shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/user',
    pathMatch: 'full'
    // ,
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: content
  },
  {
    path: '',
    component: FullLayoutComponent,
    // canActivate: [AdminGuard],
    children: full
  },
  // {
  //   path: '**',
  //   redirectTo: '/sample/sample-component'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
