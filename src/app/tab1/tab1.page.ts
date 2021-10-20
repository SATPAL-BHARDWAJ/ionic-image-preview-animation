import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonContent, ModalController } from '@ionic/angular';
import { MediaPreviewPage } from '../pages/media-preview/media-preview.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('ionContent') ionContent: IonContent;

  posts: any = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.posts = await fetch("assets/data/posts.json").then(resp => resp.json());
  }

  async preview(event: any, file: string) {
    const body: HTMLElement = await this.ionContent.getScrollElement();
    console.log({event}, {file}, body.clientHeight);

    const modal = await this.modalCtrl.create({
      component: MediaPreviewPage,
      animated: true,
      enterAnimation: modalAnimation,
      leaveAnimation: leaveModalAnimation,
      componentProps: {
        image: file,
        position: event.clientY - event.layerY,
        viewport: (body.clientHeight/2) 
      }
    })

    return await modal.present();
  }
}

const modalAnimation = (baseEl: HTMLElement) => {
  const AnimationC = new AnimationController;
  const baseAnimation = AnimationC.create();

  const backdropAnimation = AnimationC.create();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = AnimationC.create();
  wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'))
  .keyframes([
    { offset: 0, opacity: '0', transform: 'translateX(0%)' },
    { offset: 1, opacity: '0.99', transform: 'translateX(0%)' }
  ]);

  backdropAnimation.fromTo('opacity', 0.01, 0.8);

  return baseAnimation
      .addElement(baseEl)
      .easing('ease-in-out')
      .duration(500)
      .beforeAddClass('show-modal')
      .addAnimation([backdropAnimation, wrapperAnimation])
}

const leaveModalAnimation = (baseEl: HTMLElement) => {
  return modalAnimation(baseEl).duration(600).direction('reverse');
}