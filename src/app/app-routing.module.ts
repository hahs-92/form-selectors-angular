import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'selectors',
    loadChildren: () =>
      import('./country/country.module').then((m) => m.CountryModule),
  },
  {
    path: '**',
    redirectTo: 'selectors',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
