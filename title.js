// Decorative association traces live only behind the title, never over media.
window.TitleAtmosphere = {
  markup() {
    let paths='';
    for(let row=0;row<24;row++){
      const y=65+row*16;
      let points='';
      for(let x=0;x<=1200;x+=16){
        const wave=Math.sin(x*.005+row*.13)*32*Math.sin(x/1200*Math.PI);
        points+=`${x===0?'M':'L'}${x},${(y+wave).toFixed(1)} `;
      }
      paths+=`<path d="${points}" opacity="${(.2+.5*Math.sin((row+1)/25*Math.PI)).toFixed(2)}"/>`;
    }
    return `<div class="title-atmosphere" aria-hidden="true"><svg viewBox="0 0 1200 560" preserveAspectRatio="none"><g class="association-traces">${paths}</g></svg><div class="memory-glow"></div></div>`;
  }
};
