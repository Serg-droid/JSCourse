//  Получение элементов со страницы
const book = document.querySelectorAll(".book"),
  listOfBooks = document.querySelector(".books"),
  body = document.querySelector("body"),
  thirdHead = book[4].querySelector('h2>a'),
  advertise = document.querySelector('.adv'),
  chaptersSecondBook = book[0].querySelectorAll('li');
  chaptersFifthBook = book[5].querySelectorAll('li');
  chaptersSixthBook = book[2].querySelectorAll('li');

// Восстановление порядка книг
listOfBooks.prepend(book[1]);
book[1].after(book[0]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);
book[5].after(book[2]);

// Замена фоновой картинки
body.classList.add('background-image')

// Исправление текста в заголовке
thirdHead.textContent = 'Книга 3. this и Прототипы Объектов';

// Удаление рекламы
advertise.remove();

// Восстановление порядка глав 2ой книги
chaptersSecondBook[1].after(chaptersSecondBook[3]);
chaptersSecondBook[3].after(chaptersSecondBook[6]);
chaptersSecondBook[6].after(chaptersSecondBook[8]);
chaptersSecondBook[8].after(chaptersSecondBook[4]);
chaptersSecondBook[4].after(chaptersSecondBook[5]);
chaptersSecondBook[5].after(chaptersSecondBook[7]);
chaptersSecondBook[7].after(chaptersSecondBook[9]);
chaptersSecondBook[9].after(chaptersSecondBook[2]);
chaptersSecondBook[2].after(chaptersSecondBook[10]);

// Восстановление порядка глав 3ей книги
chaptersFifthBook[1].after(chaptersFifthBook[9]);
chaptersFifthBook[9].after(chaptersFifthBook[3]);
chaptersFifthBook[3].after(chaptersFifthBook[4]);
chaptersFifthBook[4].after(chaptersFifthBook[2]);
chaptersFifthBook[2].after(chaptersFifthBook[6]);
chaptersFifthBook[6].after(chaptersFifthBook[7]);
chaptersFifthBook[7].after(chaptersFifthBook[5]);
chaptersFifthBook[5].after(chaptersFifthBook[8]);
chaptersFifthBook[8].after(chaptersFifthBook[10]);

// Добавление новой главы в 6ую книгу
const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
chaptersSixthBook[8].after(newChapter);



