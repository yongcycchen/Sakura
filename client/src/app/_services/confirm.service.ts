import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef: BsModalRef={}as BsModalRef;

  constructor(private modalService:BsModalService) { }
  confirm(title = 'Confirmation',
    message = 'Are you sure?',
    btnOktext='Ok',
    btnCancelText='Cancel'):Promise<boolean>{
      const config={
        initialState:{
          title,
          message,
          btnOktext,
          btnCancelText
        }
      }
      this.bsModalRef = this.modalService.show(ConfirmModalComponent,config);
      return new Promise<boolean>((resolve)=>{
        this.bsModalRef.onHidden.subscribe(()=>{
          resolve(this.bsModalRef.content?.result);
        })
      });
    }
}
