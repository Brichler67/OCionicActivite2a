import { Library } from './../../models/Library';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ToastController, LoadingController } from 'ionic-angular';
import { BookCdServices } from '../../services/library.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {

  name: string;
  index: number;
  book: Library;
  bookForm: FormGroup;

  constructor(
     public navParams: NavParams,
     public navCtrl: NavController,
     public bookService: BookCdServices,
     public toastCtrl: ToastController,
     private formBuilder: FormBuilder,
     private loadingCtrl: LoadingController
     ) { }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.bookService.bookList[this.index];
    this.initForm();
  }

  close() {
    this.navCtrl.pop();
  }

  onToggleAppareil(position: string) {
    this.book.isLend = !this.book.isLend;
    let bookLend = this.book.isLend === true ? 'emprunté' : 'rendu'
    let toast = this.toastCtrl.create({
      message: `Le livre est ${bookLend}`,
      duration: 2000,
      position: position
    });

    toast.present(toast);
    this.onSaveList();
    this.navCtrl.pop();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: this.formBuilder.array([]),
      username: ['', Validators.required]
    });
  }

  onSaveList() {
    let loader = this.loadingCtrl.create({
      content: 'En cours de sauvegarde.'
    });
    loader.present();
    this.bookService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Fin de la sauvegarde.',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }


  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'En cours de récupération.'
    });
    loader.present();
    this.bookService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Fin de la récupération.',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }


  clearForm() {
    this.bookForm.reset();
   }

}
