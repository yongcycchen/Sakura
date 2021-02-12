import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cofirm-dialog',
  templateUrl: './cofirm-dialog.component.html',
  styleUrls: ['./cofirm-dialog.component.css']
})
export class CofirmDialogComponent implements OnInit {
  title:string={}as string;
  message:string={}as string;
  btnOkText:string={}as string;
  btnCancelText:string={}as string;
  result: boolean={}as boolean;

  constructor(public bsModalRef:BsModalRef) { }

  ngOnInit(): void {
  }

  confirm(){
    this.result = true;
    this.bsModalRef.hide();
  }

  decline(){
    this.result = false;
    this.bsModalRef.hide();
  }
}
