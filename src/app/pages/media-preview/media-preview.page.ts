import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GestureController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-media-preview',
  templateUrl: './media-preview.page.html',
  styleUrls: ['./media-preview.page.scss'],
})
export class MediaPreviewPage implements OnInit, AfterViewInit {

  @ViewChild('mediaSlide') mediaSlide : ElementRef;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
    zoom: {
      minRatio: 1,
      maxRatio: 3,
      toggle: true,
      containerClass :'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed'
    }
  };

  @Input() image: string;
  @Input() position: number;
  @Input() viewport: number;

  translateY: number;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private gestureCtrl: GestureController
  ) {
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    const gesture = this.gestureCtrl.create({
      gestureName: 'drag-image',
      el: this.mediaSlide.nativeElement,
      threshold: 70,
      direction: 'y',
      onStart: () => {
        console.log('start!');
        this.dismiss();
      },
    });
  
    gesture.enable();
  }

  ngAfterViewInit() {
      this.translateY = this.position - (this.viewport*84/100);
      console.log( this.position, this.viewport*84/100, this.translateY );

      if ( this.translateY < -30 || this.translateY > 30 ) {

        this.renderer.setStyle(this.mediaSlide.nativeElement, 'transform', `translateY(${this.translateY}px) scale3d(0.99, 0.99, 1)`);
        this.renderer.setStyle(this.mediaSlide.nativeElement, 'transition', '0.5s ease-in-out');

        setTimeout(() => {
          this.renderer.removeStyle(this.mediaSlide.nativeElement, 'transform');
        }, 50);
      }
  }

  dismiss() {
    if ( this.translateY < -30 || this.translateY > 30 ) {

      setTimeout(() => {
        this.renderer.setStyle(this.mediaSlide.nativeElement, 'transform', `translateY(${this.translateY}px) scale3d(0.94, 0.94, 1)`);
      }, 50);
    }

    this.modalCtrl.dismiss();
  }

}