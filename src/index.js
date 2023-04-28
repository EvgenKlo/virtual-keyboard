/* import { electron } from 'webpack'; */
import exampleJsonFile from '../keyboard.json';
import { Key } from './script/Key';

// Выбранный язык клавиатуры
let language = 'english';

let shiftPress = 0;

let indicatorForChangeLanguage = 0;

// Создаем первый ряд клавиш

function createFirstRow() {
  const keyboard = document.querySelector('.keyboard');
  let row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);
  for (let i = 0; i < 14; i += 1) {
    let key = document.createElement('div');
    key.className = 'key';
    row.append(key);
  }
}

// Создаем второй ряд клавиш

function createSecondRow() {
  const keyboard = document.querySelector('.keyboard');
  let row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);
  for (let i = 0; i < 15; i += 1) {
    let key = document.createElement('div');
    key.className = 'key';
    row.append(key);
  }
}

// Создаем третий ряд клавиш

function createThirdRow() {
  const keyboard = document.querySelector('.keyboard');
  let row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);
  for (let i = 0; i < 13; i += 1) {
    let key = document.createElement('div');
    key.className = 'key';
    row.append(key);
  }
}

// Создаем четвертый ряд клавиш

function createFourthRow() {
  const keyboard = document.querySelector('.keyboard');
  let row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);
  for (let i = 0; i < 13; i += 1) {
    let key = document.createElement('div');
    key.className = 'key';
    row.append(key);
  }
}

// Создаем пятый ряд клавиш

function createFifthRow() {
  const keyboard = document.querySelector('.keyboard');
  let row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);
  for (let i = 0; i < 9; i += 1) {
    let key = document.createElement('div');
    key.className = 'key';
    row.append(key);
  }
}

// Создаем начальные элементы

function createTitle(element) {
  const title = document.createElement('h1');
  title.className = 'title';
  title.innerText = 'RSS Виртуальная клавиатура';
  element.append(title);
}

function createTextArea(element) {
  const textArea = document.createElement('textarea');
  textArea.className = 'textArea';
  textArea.rows = 5;
  textArea.cols = 50;
  element.append(textArea);
}

function createKeyboard(element) {
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  element.append(keyboard);
  createFirstRow();
  createSecondRow();
  createThirdRow();
  createFourthRow();
  createFifthRow();
}

function createSystemName(element) {
  const systemName = document.createElement('p');
  systemName.className = 'system-name';
  systemName.innerText = 'Клавиатура создана в операционной системе Windows';
  element.append(systemName);
}

function createLanguageChange(element) {
  const languageChange = document.createElement('p');
  languageChange.className = 'language-change';
  languageChange.innerText = 'Для переключения языка комбинация: ctrl + alt';
  element.append(languageChange);
}

function createContainer() {
  const container = document.createElement('div');
  container.className = 'container';
  document.body.append(container);
  createTitle(container);
  createTextArea(container);
  createKeyboard(container);
  createSystemName(container);
  createLanguageChange(container);
}

function buildKeys(type) {
  let i = 0;
  for (let prop in exampleJsonFile) {
    let item = document.querySelectorAll('.key')[i];
    i += 1;
    let keyObject = new Key(exampleJsonFile[prop]);
    item.className = `${item.className} ${keyObject.item.class}`;
    item.innerText = `${keyObject.item[type]}`;
  }
}

function changeKeySimbol(type) {
  let item = document.querySelectorAll('.key');
  item.forEach(element => {
    let keyObject = new Key(exampleJsonFile[element.classList[1]]);
    element.innerText = `${keyObject.item[type]}`;
  });
}

function pressCapsLock() {
  if (language === 'english') {
    language = 'shift-english';
    changeKeySimbol(language);
  } else if (language === 'shift-english') {
    language = 'english';
    changeKeySimbol(language);
  }
}

function pressCtrlAlt() {
  if (language === 'english') {
    language = 'russian';
    changeKeySimbol(language);
  } else if (language === 'russian') {
    language = 'english';
    changeKeySimbol(language);
  } else if (language === 'shift-english') {
    language = 'shift-russian';
    changeKeySimbol(language);
  } else if (language === 'shift-russian') {
    language = 'shift-english';
    changeKeySimbol(language);
  }
}

function removeActivSelectorOnKey() {
  if (this.classList.contains('ShiftLeft') || this.classList.contains('ShiftRight')) {
    if (language === 'english') {
      language = 'shift-english';
      changeKeySimbol(language);
    } else if (language === 'russian') {
      language = 'shift-russian';
      changeKeySimbol(language);
    } else if (language === 'shift-english') {
      language = 'english';
      changeKeySimbol(language);
    } else if (language === 'shift-russian') {
      language = 'russian';
      changeKeySimbol(language);
    }
  }
  if (!this.classList.contains('CapsLock')) {
    this.classList.remove('active');
  }
}

function addActivSelectorOnKey() {
  if (this.classList.contains('CapsLock') && this.classList.contains('active')) {
    this.classList.remove('active');
    pressCapsLock();
  } else {
    this.classList.add('active');
    this.addEventListener('mouseup', removeActivSelectorOnKey);
    let textArea = document.querySelector('.textArea');
    if (this.classList.contains('Backspace')) {
      if (textArea.value !== '') {
        textArea.value = `${textArea.value.slice(0, -1)}`;
      }
    } else if (this.classList.contains('CapsLock')) {
      pressCapsLock();
    } else if (this.classList.contains('Space')) {
      textArea.value = `${textArea.value} `;
    } else if (this.classList.contains('Tab')) {
      textArea.value = `${textArea.value}    `;
    } else if (this.classList.contains('ShiftLeft') || this.classList.contains('ShiftRight')) {
      if (language === 'english') {
        language = 'shift-english';
        changeKeySimbol(language);
      } else if (language === 'russian') {
        language = 'shift-russian';
        changeKeySimbol(language);
      } else if (language === 'shift-english') {
        language = 'english';
        changeKeySimbol(language);
      } else if (language === 'shift-russian') {
        language = 'russian';
        changeKeySimbol(language);
      }
    } else if (this.classList.contains('Enter')) {
      textArea.value = `${textArea.value}\n`;
    } else if (this.classList.contains('MetaLeft')) {
      console.log('Hello RS');
    } else if (this.classList.contains('Delete')) {
      console.log('go go go');
    } else {
      textArea.value = `${textArea.value}${this.innerText}`;
    }
  }
}

function addPressHandlerOnKeys() {
  let key = document.querySelectorAll('.key');
  key.forEach(element => {
    element.addEventListener('mousedown', addActivSelectorOnKey);
  });
}

window.onload = function onload() {
  createContainer();

  buildKeys(language);

  addPressHandlerOnKeys();

  let textArea = document.querySelector('.textArea');

  document.addEventListener('keydown', (event) => {
    let key = document.querySelector(`.${event.code}`);
    if (event.code === 'CapsLock' && shiftPress !== 1) {
      if (key.classList.contains('active')) {
        if (language === 'russian' || language === 'shift-russian') {
          language = 'russian';
        } else if (language === 'english' || language === 'shift-english') {
          language = 'english';
        }
        changeKeySimbol(language);
        key.classList.remove('active');
      } else {
        if (language === 'russian' || language === 'shift-russian') {
          language = 'shift-russian';
        } else if (language === 'english' || language === 'shift-english') {
          language = 'shift-english';
        }
        key.classList.add('active');
        changeKeySimbol(language);
      }
    } else if (event.code === 'Enter') {
      key.classList.add('active');
      textArea.value = `${textArea.value}\n`;
    } else if (event.code === 'Tab') {
      textArea.focus();
      event.preventDefault();
      key.classList.add('active');
      textArea.value = `${textArea.value}    `;
    } else if (event.code !== 'Tab' && event.code !== 'CapsLock' && event.code !== 'ShiftLeft' && event.code !== 'ControlLeft' && event.code !== 'MetaLeft' && event.code !== 'AltLeft' && event.code !== 'AltRight' && event.code !== 'ControlRight' && event.code !== 'ShiftRight' && event.code !== 'Enter' && event.code !== 'Delete' && event.code !== 'Backspace') {
      key.classList.add('active');
      textArea.blur();
      if (event.code === 'Space') {
        textArea.value = `${textArea.value} `;
      } else {
        textArea.value = `${textArea.value}${key.innerText}`;
      }
    } else if (event.code === 'Backspace') {
      textArea.focus();
      key.classList.add('active');
    } else if (event.code === 'ControlLeft' || event.code === 'AltLeft' || event.code === 'ControlRight' || event.code === 'AltRight') {
      event.preventDefault();
      key.classList.add('active');
      let controlLeft = document.querySelector('.ControlLeft');
      let controlRight = document.querySelector('.ControlRight');
      let altLeft = document.querySelector('.AltLeft');
      let altRight = document.querySelector('.AltRight');
      if (event.code[0] === 'C' && indicatorForChangeLanguage === 1 && (altLeft.classList.contains('active') || altRight.classList.contains('active'))) {
        pressCtrlAlt();
      } else if (event.code[0] === 'A' && indicatorForChangeLanguage === 1 && (controlLeft.classList.contains('active') || controlRight.classList.contains('active'))) {
        pressCtrlAlt();
      }
      indicatorForChangeLanguage = 1;
    } else if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && shiftPress !== 1) {
      shiftPress = 1;
      event.preventDefault();
      key.classList.add('active');
      if (language === 'english') {
        language = 'shift-english';
        changeKeySimbol(language);
      } else if (language === 'russian') {
        language = 'shift-russian';
        changeKeySimbol(language);
      } else if (language === 'shift-english') {
        language = 'english';
        changeKeySimbol(language);
      } else if (language === 'shift-russian') {
        language = 'russian';
        changeKeySimbol(language);
      }
    } else {
      key.classList.add('active');
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      shiftPress = 0;
      let key = document.querySelector(`.${event.code}`);
      key.classList.remove('active');
      if (language === 'shift-english') {
        language = 'english';
        changeKeySimbol(language);
      } else if (language === 'shift-russian') {
        language = 'russian';
        changeKeySimbol(language);
      } else if (language === 'english') {
        language = 'shift-english';
        changeKeySimbol(language);
      } else if (language === 'russian') {
        language = 'shift-russian';
        changeKeySimbol(language);
      }
    } else if (event.code !== 'CapsLock') {
      let key = document.querySelector(`.${event.code}`);
      key.classList.remove('active');
    }
    indicatorForChangeLanguage = 0;
  });

  textArea.addEventListener('focus', getCaretPos);

  function getCaretPos() {
    var obj = document.querySelector('.textArea');
    obj.focus();
    if (document.selection) { // IE
      console.log
      var sel = document.selection.createRange();
      var clone = sel.duplicate();
      sel.collapse(true);
      clone.moveToElementText(obj);
      clone.setEndPoint('EndToEnd', sel);
      console.log(clone.text.length);
      return clone.text.length;
    } else if (obj.selectionStart!==false) {
      console.log(obj.selectionStart);
      return obj.selectionStart;
     } // Gecko
     else return 0;
    }
};
