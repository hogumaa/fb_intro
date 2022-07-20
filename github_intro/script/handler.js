const list = document.querySelector('.cont3-2bList, .cont3-2-riList');
const listScrollWidth = list.scrollWidth;
const listClientWidth = list.clientWidth;
// 이벤트마다 갱신될 값
let startY = 0;
let nowY = 0;
let endY = 0;
let listY = 0;

const getClientX = (e) => {
const isTouches = e.touches ? true : false;
return isTouches ? e.touches[0].clientX : e.clientX;
};

const getTranslateX = () => {
return parseInt(getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5]);
};

const setTranslateX = (y) => {
list.style.transform = `translateX(${y}px)`;
};

const bindEvents = () => {
list.addEventListener('mousedown', onScrollStart);
list.addEventListener('touchstart', onScrollStart);
list.addEventListener('click', onClick);
};
bindEvents();

const onScrollStart = (e) => {
    startX = getClientY(e);
    window.addEventListener('mousemove', onScrollMove);
    window.addEventListener('touchmove', onScrollMove);
    window.addEventListener('mouseup', onScrollEnd);
    window.addEventListener('touchend', onScrollEnd);
};

const onScrollMove = (e) => {
    nowX = getClientY(e);
    setTranslateY(listY + nowY - startY);
};

const onScrollEnd = (e) => {
    endY = getClientY(e);
    listY = getTranslateY();
    if (listY > 0) {
      setTranslateX(0);
      list.style.transition = `all 0.3s ease`;
      listY = 0;
    } else if (listY < listClientWidth - listScrollWidth) {
      setTranslateX(listClientWidth - listScrollWidth);
      list.style.transition = `all 0.3s ease`;
      listY = listClientWidth - listScrollWidth;
    }
  
    window.removeEventListener('mousedown', onScrollStart);
    window.removeEventListener('touchstart', onScrollStart);
    window.removeEventListener('mousemove', onScrollMove);
    window.removeEventListener('touchmove', onScrollMove);
    window.removeEventListener('mouseup', onScrollEnd);
    window.removeEventListener('touchend', onScrollEnd);
    window.removeEventListener('click', onClick);
  
    setTimeout(() => {
      bindEvents();
      list.style.transition = '';
    }, 300);
};
 
const onClick = (e) => {
    if (startY - endY !== 0) {
      e.preventDefault();
    }
};
