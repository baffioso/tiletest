import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InfoboxComponent } from './map/infobox/infobox.component';
import { FilterComponent } from './map/filter/filter.component';
import { SidenavComponent } from './sidebar/sidebar.component';
import { LayerControlComponent } from './map/layer-control/layer-control.component';
import { FilterPipe } from './filter.pipe';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { ToggleBaselayerComponent } from './map/toggle-baselayer/toggle-baselayer.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
   declarations: [
      AppComponent,
      MapComponent,
      NavbarComponent,
      InfoboxComponent,
      FilterComponent,
      SidenavComponent,
      LayerControlComponent,
      FilterPipe,
      ToggleBaselayerComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      MatToolbarModule,
      MatButtonToggleModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatInputModule,
      MatRadioModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
