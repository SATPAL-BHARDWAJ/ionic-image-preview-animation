import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaPreviewPage } from './media-preview.page';

const routes: Routes = [
  {
    path: '',
    component: MediaPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaPreviewPageRoutingModule {}
