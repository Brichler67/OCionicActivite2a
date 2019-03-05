import { Component } from '@angular/core';
import { MenuController, ModalController } from 'ionic-angular';
import { Library } from '../../models/library';
import { BookCdServices } from '../../services/library.service';
import { LendCdPage } from '../lend-cd/lend-cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Library[];

  constructor( public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public cdService: BookCdServices) {
  }

  ionViewWillEnter() {
    this.cdList = this.cdService.cdList.slice();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  openModal(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, { index: index });
    modal.present();
  }
  
}
