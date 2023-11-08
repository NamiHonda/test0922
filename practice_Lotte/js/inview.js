/**
 * Inview
 * ウインドウ内に入ったら表示用のclassを付与します
 */
class Inview {
  static INVIEW_CLASS = 'is-inview';

  /**
   * IntersectionObserver callback
   * @param {IntersectionObserverEntry} entries IntersectionObserver callback 戻り値
   */
  intersection = (entries) => {
    [...entries].map((entry) => {
      if (entry.isIntersecting) {
        this.execute(entry);
      }
    });
  };

  /**
   * 画面内に登場すると出現します
   * @param {*} [options={root: null, rootMargin: string, threshold: [number]}] IntersectionObserver option
   */
  constructor(
    options = {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: [0],
    }
  ) {
    this.observer = new IntersectionObserver(this.intersection, options);
  }

  /**
   * target element を追加します
   * @param {Element} element target element
   */
  observe(element) {
    this.observer.observe(element);
  }

  /**
   * target element を削除します
   * @param {Element} element target element
   */
  unobserve(element) {
    this.observer.unobserve(element);
  }

  /**
   * 処理実行します
   * @param {*} entry `IntersectionObserverEntry`
   */
  execute(entry) {
    // console.log('Inview.execute - entry', entry);
    entry.target.classList.add(Inview.INVIEW_CLASS);
    this.unobserve(entry.target);
  }
}

/**
 * inviewInit
 * @param {string} target targetです
 */
const inviewInit = (target = '.js-inview') => {
  const elements = document.querySelectorAll(target);
  // console.log('observers.init - elements', elements)
  if (!elements.length) {
    return;
  }
  const inview = new Inview();

  [...elements].map((element) => {
    inview.observe(element);
  });
};

/**
 * inviewNoMarginInit
 * マージンなし 全体が画面に入ってから
 * @param {string} target targetです
 */
// const inviewNoMarginInit = (target = '.js-inview-nomargin') => {
//   const elements = document.querySelectorAll(target);
//   // console.log('observers.init - elements', elements)
//   if (!elements.length) {
//     return;
//   }
//   const inview = new Inview({ rootMargin: '0px 0px 0px 0px', threshold: [1] });

//   [...elements].map((element) => {
//     inview.observe(element);
//   });
// };

/**
 * init
 */
const init = () => {
  inviewInit();
  // inviewNoMarginInit();
};

const inview = {
  init,
};


/**
 * addClassToBody
 * bodyにclassを付与します
 * @param {string} classname 付与するclass名です
 */
const addClassToBody = (classname) => {
  document.body.classList.add(classname);
};

/**
 * init
 */
const addloadinit = () => {
  const loaded = '--loaded';

  setTimeout(() => {
    addClassToBody(loaded);
  }, 320);
};

/**
 * addClassLoaded
 * @type {{init: init}}
 */
const addClassLoaded = {
  addloadinit,
};


const loadInit = () => {

  inview.init();
  addClassLoaded.addloadinit();
};


const load = () => {
  window.removeEventListener('load', load);

  loadInit();
};

// document.addEventListener('DOMContentLoaded', ready, false);
window.addEventListener('load', load, false);
