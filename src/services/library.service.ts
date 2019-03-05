import { Library } from './../models/Library';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot

export class BookCdServices {

  book$ = new Subject<Library[]>();
  cd$ = new Subject<Library[]>();

  bookList: Library[] = [
    {
      name: "Sherlock Holmes : Une étude en rouge",
      description: "Au n° 3 de Lauriston Gardens près de Londres, dans une maison vide, un homme est trouvé mort. Assassiné ? Aucune blessure apparente ne permet de le dire, en dépit des taches de sang qui maculent la pièce. Sur le mur, griffonnée à la hâte, une inscription : \" Rache ! \". Vengeance ! Vingt ans plus tôt, en 1860, dans les gorges de la Nevada, Jean Ferrier est exécuté par des mormons sanguinaires chargés de faire respecter la loi du prophète. Sa fille, Lucie, est séquestrée dans le harem du fils de l'Ancien.",
      isLend: false,
      username: ''
    },
    {
      name: "Arsène Lupin, l'Aiguille creuse",
      description: "Arsène Lupin serait-il mort ? C'est en tout cas ce que tout le monde s'accorde à dire. Sauf Isodore Beautrelet, lycéen surdoué et détective amateur, qui n'y croit pas une seconde. Coïncidence étrange, le document de l'Aiguille creuse disparaît également. Quel mystère ces disparitions cachent-elles ? Arsène aurait-il enfin trouvé un adversaire à sa taille en la personne d'Isodore Beautrelet ?",
      isLend: false,
      username: ''
    },
    {
      name: "Le monde perdu",
      description: "Prêt à tout pour conquérir Gladys - qui ne veut épouser qu'un homme célèbre -, Edward Malone, jeune journaliste en début de carrière, s'engage à suivre le terrible professeur Challenger en Amérique du Sud, pour rapporter des preuves de ce qu'il affirme envers et contre tous : les animaux de la préhistoire existent encore de nos jours !",
      isLend: false,
      username: ''
    }
  ];

  cdList: Library[] = [
    {
      name: "The Best of 25 Years",
      description: "Sting",
      isLend: false,
      username: ''
    },
    {
      name: "Chacun Sa Route",
      description: "Tonton David",
      isLend: false,
      username: ''
    },
    {
      name: "The Dark Side of the Moon",
      description: "Pink Floyd",
      isLend: false,
      username: ''
    }
  ];


  addBooks(book: Library){
    this.bookList.push(book);
    console.log("book",book.username)
    this.emitBooks();
  }

  emitBooks() {
    this.book$.next(this.bookList.slice());
    console.log("book",this.bookList.slice())
  }

  saveData(){
    return new Promise((resolve, reject)=>{
      firebase.database().ref('books').set(this.bookList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    })
  }

  retrieveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').once('value').then(
        (data: DataSnapshot) => {
          this.bookList = data.val();
          this.emitBooks();
          resolve('Données récupérées.');
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  addCd(cd: Library){
    this.cdList.push(cd);
    console.log("cd",cd.username)
    this.emitCds();
  }


  emitCds() {
    this.cd$.next(this.cdList.slice());
  }

  saveDataCD(){
    return new Promise((resolve, reject)=>{
      firebase.database().ref('cd').set(this.cdList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    })
  }

  retrieveDataCD(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('cd').once('value').then(
        (data: DataSnapshot) => {
          this.cdList = data.val();
          if(this.cdList !=null){this.emitCds()}
          //this.emitCds();          
          resolve('Données récupérées.');
        }, (error) => {
          reject(error);
        }
      );
    });
  }

}

