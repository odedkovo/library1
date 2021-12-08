'use strict';

var gTrans = {
  title: {
    en: 'welcome to our library',
    he: 'ברוכים הבאים לספרייה שלנו',
  },
  'wanna-add-book-button': {
    en: 'wanna add book?',
    he: 'רוצה להוסיף ספר?',
  },
  'id-table': {
    en: 'id',
    he: 'מק"ט',
  },
  'title-table': {
    en: 'title',
    he: 'שם',
  },
  'price-table': {
    en: 'price',
    he: 'מחיר',
  },
  'img-table': {
    en: 'img',
    he: 'תמונה',
  },
  'actions-table': {
    en: 'actions',
    he: 'פעולות',
  },
  'rate-table': {
    en: 'rate',
    he: 'דרג',
  },
  'read-button': {
    en: 'read',
    he: 'לקריאה',
  },
  'update-button': {
    en: 'update',
    he: 'עדכן',
  },
  'delete-button': {
    en: 'delete',
    he: 'מחק',
  },
  'book-name': {
    en: 'book name',
    he: 'שם הספר',
  },
  'ender-book-name': {
    en: 'enter book name',
    he: 'הכנס את שם הספר ',
  },
  'enter-price': {
    en: 'enter price',
    he: 'הכנס מחיר  ',
  },
  close: {
    en: 'close',
    he: 'סגור',
  },
  'add-book-button': {
    en: 'add',
    he: 'הוסף',
  },
  'next-button': {
    en: 'next page',
    he: 'לעמוד הבא ',
  },
  'prev-button': {
    en: 'prev page',
    he: 'לעמוד הקודם',
  },
};

const DEFAULT_LANG = 'en';
var gCurrLang = DEFAULT_LANG;

function setLang(val) {
  gCurrLang = val;
}

function getTrans(transKey) {
  var word = gTrans[transKey][gCurrLang];
  return word;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    const transKey = el.dataset.trans;
    if (el.nodeName === 'INPUT') {
      el.placeholder = getTrans(transKey);
    } else {
      el.innerText = getTrans(transKey);
    }
  });
}

function getLang() {
  return gCurrLang;
}
