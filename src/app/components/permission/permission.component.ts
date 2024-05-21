import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-permission',

  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class PermissionComponent implements OnInit {


  accounts !: any[];
  moduleAndPer!: any[];
  private modalService = inject(NgbModal)

  constructor(
    private moduleService : ModuleService
  ){

  }

  ngOnInit(): void {
      this.getAccountProfile();
  }

  openDetailPermission(content: TemplateRef<any>, AccountID: any){
    this.moduleService.getModuleAndPermission(AccountID).subscribe({
      next : (item) => {
        this.moduleAndPer = item.moduleAndPermission;
      }
    })

    this.modalService.open(content, { modalDialogClass: 'dark-modal', size:'lg' });
  }
  
  openEditPermission(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal', size:'lg' });

  }

  openCreatePermission(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  openCreateModule(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  onEditPermission(){
    console.log('moduleAndPermission', this.moduleAndPer);
  }
  getAccountProfile(){
    this.moduleService.getAccountProfile().subscribe({
      next: (item) =>{
        this.accounts = item.user;
        console.log('account', this.accounts)
      }
    })
  }

}
