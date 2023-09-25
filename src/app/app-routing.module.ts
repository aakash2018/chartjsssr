import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent:()=> import('./home/home.component').then((x)=>x.HomeComponent),
  },
  {
    path:'chartone',
    loadComponent:()=> import('./chartone/chartone.component').then((x)=>x.ChartoneComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
