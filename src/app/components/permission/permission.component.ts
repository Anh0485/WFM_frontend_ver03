import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleService } from 'src/app/services/module.service';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-permission',

  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class PermissionComponent implements OnInit {


  accounts !: any[];
  Accounts !:any [];
  moduleAndPer!: any[];
  modules !:any [];
  selectedRows: any[] = [];
  observables: any[] = [];
  createPermissionForm!:  FormGroup;
  private modalService = inject(NgbModal)

  constructor(
    private moduleService : ModuleService,
    private accountService: AccountService,
    private fb: FormBuilder
  ){
    this.createPermissionForm = this.fb.group({
      Description: [''],
      AccountID:[''],
      ModuleID:[''],
      CanAdd:[false],
      CanView:[false],
      CanEdit:[false],
      CanDelete:[false],
      CanExport:[false],
    })  
    
  }

  ngOnInit(): void {
      this.getAccountProfile();
      this.getAllAccount();
      this.getAllModule();
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
    this.modalService.open(content, { modalDialogClass: 'dark-modal', size:'lg' });
  }

  openCreateModule(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  onSubmitCreatePermission(){
    const canAddValue = this.createPermissionForm.get('CanAdd')?.value;
    const canViewValue = this.createPermissionForm.get('CanView')?.value;
    const canEditValue = this.createPermissionForm.get('CanEdit')?.value;
    const canDeleteValue = this.createPermissionForm.get('CanDelete')?.value;
    const canExportValue = this.createPermissionForm.get('CanExport')?.value;

    const accountList = this.selectedRows.filter(item=> item.AccountID).map((item)=> {
      return item.AccountID
    });
    const ModuleList = this.selectedRows.filter(item=>item.ModuleID).map((item)=> {
      return {
        ModuleID: item.ModuleID,
        ModuleName: item.ModuleName
      }
    })
    this.observables = [];
    accountList.forEach(account=>{
      ModuleList.forEach(module => {
        const data = {
          Description: module.ModuleName,
          AccountID: account,
          ModuleID:module.ModuleID,
          CanAdd:canAddValue,
          CanView:canViewValue,
          CanEdit:canEditValue,
          CanDelete:canDeleteValue,
          CanExport:canExportValue,
        }
        const observable = this.moduleService.createPermission(data);
        this.observables.push(observable);
      })
    })
    forkJoin(this.observables).subscribe(
      () => {
        alert('Created permission successfully');
        this.getAccountProfile()
      }
    )
  }

  onEditPermission(){
  }
  getAccountProfile(){
    this.moduleService.getAccountProfile().subscribe({
      next: (item) =>{
        this.accounts = item.user;
      }
    })
  }

  getAllAccount(){
    this.accountService.getAllAccount().subscribe({
      next : (item) =>{
        this.Accounts = item.account;
      }
    })
  }

  getAllModule(){
    this.moduleService.getAllModule().subscribe({
      next : (item) =>{
        this.modules = item.allModule;
      }
    })
  }
  
  isSelected(row: any):boolean {
    return this.selectedRows.includes(row);
  }

  

  toggleSelection(event: any, row: any):void{
    if(event.target.checked){
      this.selectedRows.push(row)
    }else{
      const index = this.selectedRows.indexOf(row);
      if(index >=0){
        this.selectedRows.splice(index,1);
      }
    }
  }

}
