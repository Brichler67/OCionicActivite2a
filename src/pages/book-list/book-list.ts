import { Component } from '@angular/core';
import { MenuController, ModalController } from 'ionic-angular';
import { Library } from '../../models/library';
import { BookCdServices } from '../../services/library.service';
import { LendBookPage } from '../lend-book/lend-book';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  bookList: Library[];

  constructor(
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public bookService: BookCdServices) {
  }

  ionViewWillEnter() {
    this.bookList = this.bookService.bookList.slice();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  openModal(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, { index: index });
    modal.present();
  }

}
