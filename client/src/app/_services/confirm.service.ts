import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
=======
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CofirmDialogComponent } from '../modals/cofirm-dialog/cofirm-dialog.component';
>>>>>>> master

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
<<<<<<< HEAD
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
=======
  bsModelRef: BsModalRef={}as BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title = 'Confirmation',message = 'Are you sure you want to do this?',
    btnOkText = 'Ok', btnCancelText='Cancel'):Observable<boolean>{
      const config = {
        initialState:{
          title,
          message,
          btnOkText,
          btnCancelText
        }
      }
      this.bsModelRef = this.modalService.show(CofirmDialogComponent,config);
      return new Observable<boolean>(this.getResult());
  }

  private getResult(){
    return (observer:any) => {
      const subscription = this.bsModelRef.onHidden.subscribe(()=>{
        observer.next(this.bsModelRef.content.result);
        observer.complete();
      });
      return {
        unsubscribe(){
          subscription.unsubscribe();
        }
      }
    }
  }
>>>>>>> master
}
