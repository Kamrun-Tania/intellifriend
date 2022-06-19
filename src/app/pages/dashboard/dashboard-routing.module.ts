import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyDetailComponent } from './company-dashboard/company-detail.component';
import { CompanyDetailGuard } from './company-dashboard/company-detail.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'my/:date/week',
      //   component: MyDashboardComponent,
      //   data: {
      //     title: "My Dashboard",
      //     breadcrumb: "My Dashboard"
      //   }
      // },
      // {
      //   path: 'my/:date/month',
      //   component: MyDashboardComponent,
      //   data: {
      //     title: "My Dashboard",
      //     breadcrumb: "My Dashboard"
      //   }
      // },
      // {
      //   path: 'my/:date/day',
      //   component: MyDashboardComponent,
      //   data: {
      //     title: "My Dashboard",
      //     breadcrumb: "My Dashboard"
      //   }
      // },
      // {
      //   path: 'my',
      //   component: MyDashboardComponent,
      //   data: {
      //     title: "My Dashboard",
      //     breadcrumb: "My Dashboard"
      //   }
      // },


      {
        path: 'user/:id/:date/week',
        component: UserDashboardComponent,
        data: {
          title: "User Dashboard",
          breadcrumb: "User Dashboard"
        }
      },
      {
        path: 'user/:id/:date/month',
        component: UserDashboardComponent,
        data: {
          title: "User Dashboard",
          breadcrumb: "User Dashboard"
        }
      },
      {
        path: 'user/:id/:date/day',
        component: UserDashboardComponent,
        data: {
          title: "User Dashboard",
          breadcrumb: "User Dashboard"
        }
      },
      {
        path: 'user/:id',
        component: UserDashboardComponent,
        data: {
          title: "User Dashboard",
          breadcrumb: "User Dashboard"
        }
      },


      {
        path: 'user',
        component: UserDashboardComponent,
        data: {
          title: "User Dashboard",
          breadcrumb: "User Dashboard"
        }
      },
      
      {
        path: 'companies',
        component: CompanyDashboardComponent,
        data: {
          title: "Company List",
          breadcrumb: "Company List"
        }

      },
      {
        path: 'companies/:id',
        canActivate: [CompanyDetailGuard],
        component: CompanyDetailComponent
      },
      {
        path: 'default',
        redirectTo: 'user',
        pathMatch: 'full',
        
      },

      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
