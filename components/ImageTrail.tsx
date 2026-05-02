"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0, clientY = 0;
  if ('touches' in e && e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM: { el: HTMLElement; inner: HTMLElement };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect: DOMRect;
  resize: () => void;

  constructor(DOM_el: HTMLElement) {
    this.DOM = { el: DOM_el, inner: DOM_el.querySelector('.content__img-inner') as HTMLElement };
    this.rect = this.DOM.el.getBoundingClientRect();
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    this.initEvents();
  }
  initEvents() {
    window.addEventListener('resize', this.resize);
  }
  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }
  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}

// We will use Variant 4 as it looks very cool (spreads out and fades)
class ImageTrailVariant4 {
  container: HTMLElement;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition: number;
  zIndexVal: number;
  activeImagesCount: number;
  isIdle: boolean;
  threshold: number;
  mousePos: { x: number; y: number };
  lastMousePos: { x: number; y: number };
  cacheMousePos: { x: number; y: number };
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  initRender: (ev: MouseEvent | TouchEvent) => void;
  rafId: number | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = Array.from(container.querySelectorAll('.content__img')).map((img) => new ImageItem(img as HTMLElement));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.handlePointerMove = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      if (this.rafId === null) {
        this.rafId = requestAnimationFrame(() => this.render());
      }
    };
    container.addEventListener('mousemove', this.handlePointerMove as EventListener);
    container.addEventListener('touchmove', this.handlePointerMove as EventListener);

    this.initRender = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      if (this.rafId === null) {
        this.rafId = requestAnimationFrame(() => this.render());
      }
      container.removeEventListener('mousemove', this.initRender as EventListener);
      container.removeEventListener('touchmove', this.initRender as EventListener);
    };
    container.addEventListener('mousemove', this.initRender as EventListener);
    container.addEventListener('touchmove', this.initRender as EventListener);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;

    const isMoving = Math.abs(this.mousePos.x - this.cacheMousePos.x) > 0.5 || Math.abs(this.mousePos.y - this.cacheMousePos.y) > 0.5;

    if (!this.isIdle || isMoving) {
      this.rafId = requestAnimationFrame(() => this.render());
    } else {
      this.rafId = null;
    }
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) {
      dx /= distance;
      dy /= distance;
    }
    dx *= distance / 100;
    dy *= distance / 100;

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2,
          filter: `brightness(${Math.max((400 * distance) / 100, 100)}%) contrast(${Math.max((400 * distance) / 100, 100)}%)`
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%) contrast(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0
        },
        0.4
      )
      .to(
        img.DOM.el,
        {
          duration: 1.5,
          ease: 'power4',
          x: `+=${dx * 110}`,
          y: `+=${dy * 110}`
        },
        0.05
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.container.removeEventListener('mousemove', this.handlePointerMove as EventListener);
    this.container.removeEventListener('touchmove', this.handlePointerMove as EventListener);
    this.images.forEach(img => img.destroy());
  }
}

export default function ImageTrail({ items = [] }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ImageTrailVariant4 | null>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    
    // Wait for images to load or at least initialize variant
    instanceRef.current = new ImageTrailVariant4(containerRef.current);

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [items]);

  return (
    <div className="content" ref={containerRef}>
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}
