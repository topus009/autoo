import map from './map';
import getData from './getData';

document.addEventListener('DOMContentLoaded', () => {
  const ver = '2.1';
  const language = 'ru_Ru';
  const coordorder = 'longlat';
  const mode = 'debug';
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/${ver}/?lang=${language}&coordorder=${coordorder}&mode=${mode}`;
  document.body.appendChild(script);

  const map_boxes = document.querySelectorAll('.map');
  const titles = document.querySelectorAll('.items .item h3');
  const toggles = document.querySelectorAll('.items .item label');
  const articles = document.querySelectorAll('.items .item p');
  const query_arr = ['Вилгуд', 'Белый сервис', 'Гараж сервис'];
  // ===================== MAP CONTENT ===================
  script.addEventListener('load', () => {
    /* global ymaps */
    ymaps.ready(() => {
      map_boxes.forEach((e, i) => {
        const id = 'map_' + i;
        titles[i].innerHTML = query_arr[i];
        articles[i].innerHTML = 'Lorem ipsum — классическая панграмма, условный, зачастую бессмысленный текст-заполнитель, вставляемый в макет страницы. Используется в качестве заполнителя по крайней мере с XVI века[1]. Является искажённым отрывком из философского трактата Марка Туллия Цицерона «О пределах добра и зла», написанного в 45 году до н. э. на латинском языке, обнаружение сходства атрибутируется Ричарду МакКлинтоку[1].';
        toggles[i].innerHTML = 'Показать карту';
        map_boxes[i].id = id;
        getData(query_arr[i]).then((data) => {
          map(id, data.result.items);
        });
      });
    });
    // ===================== YMAPS END ==============
    // ===================== TOGGLE MAP ===================
    toggles.forEach((e, i) => {
      toggles[i].addEventListener('click', () => {
        if (map_boxes[i].classList.contains('hidden')) {
          map_boxes.forEach((x, index) => {
            x.classList.add('hidden');
            toggles[index].innerHTML = 'Показать карту';
          });
          map_boxes[i].classList.remove('hidden');
          toggles[i].innerHTML = 'Cкрыть карту';
        } else {
          map_boxes[i].classList.add('hidden');
          toggles[i].innerHTML = 'Показать карту';
        }
      });
    });
    // ==================== TOGGLE MAP end ===================
  });
});
