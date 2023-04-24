import exampleJsonFile from '../keyboard.json';
import { Key } from './script/Key';

// Создаем начальные элементы

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
  languageChange.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
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

function buildKeys() {
  let i = 0;
  for (let prop in exampleJsonFile) {
    let item = document.querySelectorAll('.key')[i];
    i += 1;
    let keyObject = new Key(exampleJsonFile[prop]);
    item.className = `${item.className} ${keyObject.item.class}`;
    item.innerText = `${keyObject.item[language]}`;
  }
}

window.onload = function () {
  createContainer();

  buildKeys();
};

// Выбранный язык клавиатуры
const language = 'english';

function keyPress(e) {
  console.log(e.code);
}

document.addEventListener('keypress', keyPress);
