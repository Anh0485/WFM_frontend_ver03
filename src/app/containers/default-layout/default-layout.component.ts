import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';

import { navItems } from './_nav';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;

  public navItem : INavData[] =[];



  constructor(
    private moduleService : ModuleService
  ) {}

  ngOnInit(): void {
      this.getModule();
  }

  getModule() {
    this.moduleService.getModuleByModuleName().subscribe((item) => {
        console.log('data', item.modules);

        const navItems: INavData[] = [];
        let workHourModule: INavData = {} ;

        // First pass to collect all modules
        item.modules.forEach((data: any) => {
            const nav: INavData = {
                name: data.title,
                url: data.path,
                iconComponent: data.icon ? { name: data.icon } : undefined,
            };

            if (data.title === 'Dashboard') {
                nav.badge = {
                    color: 'info',
                    text: 'NEW',
                };
            }

            if (data.title === 'Work Hour') {
                workHourModule = nav;
            } else {
                navItems.push(nav);
            }
        });

        // Add "Work Hour" as a child of "Report" if it exists
        if (workHourModule !== null) {
            navItems.forEach((nav) => {
                if (nav.name === 'Report') {
                    if (!nav.children) {
                        nav.children = [];
                    }
                    nav.children.push(workHourModule);
                }
            });
        }

        // Move 'Dashboard' item to the beginning if it exists
        const dashboardIndex = navItems.findIndex((item) => item.name === 'Dashboard');
        if (dashboardIndex !== -1) {
            const dashboardItem = navItems.splice(dashboardIndex, 1)[0];
            navItems.unshift(dashboardItem);
        }

        // Assign the processed navItems array to navItems property
        this.navItem = navItems;
        console.log('navItems', this.navItem);
    });
}



  // getModule(){
  //   this.moduleService.getModuleByModuleName().subscribe((item)=>{
  //     console.log('data module', item.modules)
  //     item.modules.forEach((data:any)  => {
  //       const nav : INavData = {
  //         name: data.title,
  //         url: data.path,
  //         iconComponent:{name: data.icon},
  //       }
        
  //       if (data.title === 'Dashboard') {
  //         nav.badge = {
  //           color: 'info',
  //           text: 'NEW',
  //         };
  //       }
  //       if(data.title === "Work Hour"){
  //         let workHour : INavData = {
  //           name: data.title,
  //           url: data.path
  //         }
  //         console.log('nav wh',workHour)
  //       }

       
  //       this.navItem.push(nav);
  //       const dashboardIndex = this.navItem.findIndex((item) => item.name === 'Dashboard');

  //     // If Dashboard item found, move it to the beginning
  //     if (dashboardIndex !== -1) {
  //       const dashboardItem = this.navItem.splice(dashboardIndex, 1)[0];
  //       this.navItem.unshift(dashboardItem);
  //     }

  //     // Assign the processed navItems array to navItems property
      
  //     console.log('data nav', data);
  //     console.log('navItems', this.navItem);
       
  //     })
  //   })

  // }
}
