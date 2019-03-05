import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public menuCtrl: MenuController) {
  }

  tabsPage = TabsPage;

  onToggleMenu() {
    this.menuCtrl.open();
  }

}
