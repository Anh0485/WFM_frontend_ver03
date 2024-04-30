import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkscheduleComponent } from './workschedule.component';


const routes: Routes = [
  {
    path: '',
    component: WorkscheduleComponent,
    data: {
      title: `Work Schedule`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkscheduleRoutingModule {
}
