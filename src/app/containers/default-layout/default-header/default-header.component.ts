import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit, OnDestroy {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  user: string = '';
  RoleName : string = '';
  currentDate !:Date; 
  private timer: any;

  constructor(
    private classToggler: ClassToggleService,
    private loginService: LoginService,
    private userService: UserService,
    
  ) {
  super();

  }

  ngOnInit(): void {
      this.getUserProfile();
      this.updateTime();
      this.timer = setInterval(()=>{
        this.updateTime();
      },1000)
  }

  ngOnDestroy(): void {
    
  }
  
  updateTime(): void {
    this.currentDate = new Date();
  }
  


  getUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (item) => {
        console.log('get user', item);
        this.user = item.user[0].FullName;
        this.RoleName = item.user[0].RoleName;
      },
    });
  }

  logout(event: MouseEvent) {
    event.preventDefault();

    this.loginService.logout(); // Gọi phương thức logout từ service
  }
}
