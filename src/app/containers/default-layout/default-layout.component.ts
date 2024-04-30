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

  getModule(){
    this.moduleService.getModuleByModuleName().subscribe((item)=>{
      console.log('data', item.modules)
      item.modules.forEach((data:any)  => {
        console.log('data', data);
        const nav : INavData = {
          name: data.title,
          url: data.path,
          iconComponent:{name: data.icon},
          // badge: {
          //   color: 'info',
          //   text: 'NEW'
          // }
        }
        if (data.title === 'Dashboard') {
          nav.badge = {
            color: 'info',
            text: 'NEW',
          };
        }
       
        this.navItem.push(nav);
        const dashboardIndex = this.navItem.findIndex((item) => item.name === 'Dashboard');

      // If Dashboard item found, move it to the beginning
      if (dashboardIndex !== -1) {
        const dashboardItem = this.navItem.splice(dashboardIndex, 1)[0];
        this.navItem.unshift(dashboardItem);
      }

      // Assign the processed navItems array to navItems property
      
      
      console.log('navItems', this.navItem);
       
      })
    })

  }
}
