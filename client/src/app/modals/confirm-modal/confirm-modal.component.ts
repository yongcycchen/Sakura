import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  title:string = {} as string;
  message:string = {} as string;
  btnOktext:string = {} as string;
  btnCancelText:string = {} as string;
  result:boolean = {} as boolean
  constructor(public bsModalRef:BsModalRef) { }

  ngOnInit(): void {
  }

  confirm(){
    this.result = true;
    this.bsModalRef.hide();
  }

  cancel(){
    this.result = false;
    this.bsModalRef.hide();
  }
}
