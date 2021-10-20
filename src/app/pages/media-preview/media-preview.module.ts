import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaPreviewPageRoutingModule } from './media-preview-routing.module';

import { MediaPreviewPage } from './media-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaPreviewPageRoutingModule
  ],
  declarations: [MediaPreviewPage]
})
export class MediaPreviewPageModule {}
