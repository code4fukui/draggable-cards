export class DraggableCards {
  constructor(snapw = 0, snaph = 0, maxcards = 10000, maxstackv = 5) {
    this.snapw = snapw;
    this.snaph = snaph;
    this.maxcards = maxcards;
    this.maxstackv = maxstackv;
    this.cards = [];
  }
  add(comp) {
    const snapw = this.snapw;
    const snaph = this.snaph;
    const maxcards = this.maxcards;
    const maxstackv = this.maxstackv;

    this.cards.push(comp);
    const snap = (x, w) => w ? Math.floor((x + w / 2) / w) * w + 5 : x;

    const getBoundingRect = (c) => {
      const rect = c.getBoundingClientRect();
      const r = { left: rect.left, top: rect.top };
      if (c.parentElement.tagName != "BODY") {
        c.parentElement.style.position = "relative";
      }
      if (c.parentElement.style.position == "relative") {
        const p = c.parentElement.getBoundingClientRect();
        r.left -= p.left;
        r.top -= p.top;
      }
      r.top += window.scrollY;
      r.left += window.scrollX;
      return r;
    };

    const samePos = (c1, c2) => {
      const r1 = getBoundingRect(c1);
      const r2 = getBoundingRect(c2);
      const arroundSame = (x1, x2) => Math.abs(x1 - x2) <= maxstackv;
      return arroundSame(r1.left, r2.left) && arroundSame(r1.top, r2.top);
    };

    let offsetX, offsetY;

    comp.startDrag = (event) => {
      event.preventDefault();
      const r = getBoundingRect(comp);
      if (event.type === 'mousedown') {
        offsetX = event.clientX - r.left;
        offsetY = event.clientY - r.top;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
      } else {
        let touch = event.touches[0];
        offsetX = touch.clientX - r.left;
        offsetY = touch.clientY - r.top;
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
      }
      const nextz = comp.style.zIndex - 1;
      comp.style.zIndex = maxcards;

      const nextcomp = this.cards.filter(i => samePos(i, comp)).find(i => i.style.zIndex == nextz);
      if (nextcomp) enableDrag(nextcomp);
    };
    const enableDrag = (comp) => {
      comp.addEventListener('mousedown', comp.startDrag);
      comp.addEventListener('touchstart', comp.startDrag, { passive: false });
      comp.style.cursor = "grab";
    };
    const disableDrag = (comp) => {
      comp.removeEventListener('mousedown', comp.startDrag);
      comp.removeEventListener('touchstart', comp.startDrag);
      comp.style.cursor = "";
    };

    let lastTouch;
    const drag = (event) => {
      let clientX, clientY;
      if (event.type === 'mousemove') {
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        const touch = event.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
        lastTouch = touch;
      }
      comp.style.left = (clientX - offsetX) + 'px';
      comp.style.top = (clientY - offsetY) + 'px';
    };

    const placeCard = (comp) => {
      const sameposcomps = this.cards.filter(i => samePos(i, comp));
      const nsamepos = sameposcomps.length - 1;
      comp.style.zIndex = nsamepos;
      const d = Math.min(maxstackv, nsamepos);
      const r = getBoundingRect(comp);
      comp.style.left = (r.left - d) + 'px';
      comp.style.top = (r.top - d) + 'px';
      sameposcomps.forEach(i => {
        if (i != comp) disableDrag(i);
      });      
    };
    const endDrag = (event) => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);

      let clientX, clientY;
      if (event.type === 'mouseup') {
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        const touch = lastTouch;
        clientX = touch.clientX;
        clientY = touch.clientY;
      }
      comp.style.left = snap(clientX - offsetX, snapw) + 'px';
      comp.style.top = snap(clientY - offsetY, snaph) + 'px';
      placeCard(comp);
    };
    enableDrag(comp);
    const r = getBoundingRect(comp);
    comp.style.left = snap(r.left, snapw) + 'px';
    comp.style.top = snap(r.top, snaph) + 'px';
    comp.style.zIndex = 0;
    placeCard(comp);
  }
};
