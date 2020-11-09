import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './filter/filter.component';

const routes: Routes = [
  { path:'',component:FilterComponent},
  { path:'home', component:FilterComponent},
  { path:'home/:limit/:launch_success/:land_success/:launch_year', component:FilterComponent},
  { path:'home/:limit/:launch_success', component:FilterComponent},
  { path:'home/:limit/:launch_success/:land_success/', component:FilterComponent},  // {path: '', redirectTo: 'home/:limit/:launch_year', pathMatch: 'full'},
  { path: 'home/:limit', component: FilterComponent },
  { path: '**', component: FilterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
