import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-permission',

  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class PermissionComponent implements OnInit {

  private modalService = inject(NgbModal)

  constructor(
    
  ){

  }

  ngOnInit(): void {
      
  }

  openDetailPermission(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });

  }
  
  openEditPermission(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });

  }

  openCreatePermssion(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  openCreateModule(content: TemplateRef<any>){
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

}
