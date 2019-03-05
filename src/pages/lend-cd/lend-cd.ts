import { Library } from './../../models/Library';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ToastController } from 'ionic-angular';
import { BookCdServices } from '../../services/library.service';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {

  name: string;
  index: number;
  cd: Library;

  constructor(public navParams: NavParams, public navCtrl: NavController, public cdService: BookCdServices, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.cdService.cdList[this.index]
  }

  close() {
    this.navCtrl.pop();
  }

  onToggleAppareil(position: string) {
    this.cd.isLend = !this.cd.isLend;
    let cdLend = this.cd.isLend === true ? 'emprunté' : 'rendu'
    let toast = this.toastCtrl.create({
      message: `Le CD est ${cdLend}`,
      duration: 2000,
      position: position,
    });

    toast.present(toast);
  }
}
