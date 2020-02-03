import {Component} from '@angular/core';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidenavComponent {
  showSidebar = false;

  toggle() {
    this.showSidebar = !this.showSidebar;
  }
}
