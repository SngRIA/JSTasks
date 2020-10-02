document.addEventListener('DOMContentLoaded', function() { // Вызовет обработчик после загрузки DOM
    fillYear(); // Заполняем года
});

// Функция заполняет год на форме
function fillYear() {
    var yearElement = $('select[name=year]'); // Ищем элемент года

    if(yearElement == null) { // Проверка
        console.log('yearElement is null');
        return;
    }

    const currentYear = new Date().getFullYear(); // Получаем текущий год

    for (var index = 0; index < 20; index++) {
        yearElement.append("<option>" + (currentYear - index) + "</option>") // Вставляем элемент года
    }
}