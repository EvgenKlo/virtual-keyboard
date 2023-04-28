/* import { electron } from 'webpack'; */
import exampleJsonFile from '../keyboard.json';
import { Key } from './script/Key';

// Выбранный язык клавиатуры
let language = 'english';

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
  languageChange.innerText = 'Для переключения языка комбинация: левыe ctrl + shift';
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
    let selector = item.className;
    item.className = `${item.className} ${keyObject.item.class}`;
    item.innerText = `${keyObject.item[type]}`;
  }
}

function chabgeKeySimbol(type) {
  let item = document.querySelectorAll('.key');
  item.forEach(element => {
    let keyObject = new Key(exampleJsonFile[element.classList[1]]);
    element.innerText = `${keyObject.item[type]}`;
  });
}

function removeActivSelectorOnKey() {
  if (!this.classList.contains('CapsLock')) {
    this.classList.remove('active');
  }
}

function addActivSelectorOnKey() {
  if (this.classList.contains('CapsLock') && this.classList.contains('active')) {
    this.classList.remove('active');
    if (language === 'english') {
      language = 'shift-english';
      chabgeKeySimbol(language);
    } else if (language === 'shift-english') {
      language = 'english';
      chabgeKeySimbol(language);
    }
  } else {
    this.classList.add('active');
    this.addEventListener('mouseup', removeActivSelectorOnKey);
    let textArea = document.querySelector('.textArea');
    if (this.classList.contains('Backspace')) {
      if (textArea.value !== '') {
        textArea.value = `${textArea.value.slice(0, -1)}`;
      }
    } else if (this.classList.contains('CapsLock')) {
      if (language === 'english') {
        language = 'shift-english';
        chabgeKeySimbol(language);
      } else if (language === 'shift-english') {
        language = 'english';
        chabgeKeySimbol(language);
      }
    } else if (this.classList.contains('Space')) {
      textArea.value = `${textArea.value} `;
    } else if (this.classList.contains('Tab')) {
      textArea.value = `${textArea.value}    `;
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

window.onload = function () {
  createContainer();

  buildKeys(language);

  addPressHandlerOnKeys();

  document.addEventListener('keydown', (event) => {
    let key = document.querySelector(`.${event.code}`);
    let textArea = document.querySelector('.textArea');
    if (event.code === 'CapsLock') {
      if (key.classList.contains('active')) {
        language = language.split('-')[1];
        chabgeKeySimbol(language);
        key.classList.remove('active');
      } else {
        key.classList.add('active');
        language = `shift-${language}`;
        chabgeKeySimbol(language);
      }
    } else if (event.code === 'Tab') {
      textArea.focus();
      textArea.value = `${textArea.value}    `;
    } else {
      key.classList.add('active');
    }
    textArea.focus();
  });
  document.addEventListener('keyup', (event) => {
    if (event.code !== 'CapsLock') {
      let key = document.querySelector(`.${event.code}`);
      key.classList.remove('active');
    }
  });
};
