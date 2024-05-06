import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkhoursComponent } from './workhours/workhours.component';
import { OvertimehoursComponent } from './overtimehours/overtimehours.component';
import { NumberoftenantComponent } from './numberoftenant/numberoftenant.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Report',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'workhours',
        component: WorkhoursComponent,
        data: {
          title: 'Work hours',
        },
      },
      // {
      //   path: 'overtimehours',
      //   component: OvertimehoursComponent,
      //   data: {
      //     title: 'Overtime hours',
      //   },
      // },
      // {
      //   path: 'numberoftenant',
      //   component: NumberoftenantComponent,
      //   data: {
      //     title: 'Number of tenant',
      //   },
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}

