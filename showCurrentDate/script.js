document.addEventListener('DOMContentLoaded', function() {

    function showCurrentDate() {
        const   divCurrentDate = document.createElement('div');

        let     partOfDay,
                dayOfWeek,
                currentTime,
                timeToNewYear,
                date = new Date('10 MARCH 1998 21:32:22'),
                hours = date.getHours(),
                day = date.getDay(),
                year = date.getFullYear();

        partOfDay = (hours > 4 && hours < 11) ? 'утро' : (hours > 10 && hours < 16) ? 'день' : (hours > 15 && hours < 22) ? 'вечер' : 'ночь';
        switch(day) {
            case 0:
                dayOfWeek = 'Воскресенье';
                break;
            case 1:
                dayOfWeek = 'Понедельник';
                break;
            case 2:
                dayOfWeek = 'Вторник';
                break;
            case 3:
                dayOfWeek = 'Среда';
                break;
            case 4:
                dayOfWeek = 'Четверг';
                break;
            case 5:
                dayOfWeek = 'Пятница';
                break;
            case 6:
                dayOfWeek = 'Суббота';
                break;          
        }
        currentTime = date.toLocaleTimeString('en');
        timeToNewYear = Math.floor((new Date(`1 January ${year + 1}`) - date) / (3600 * 1000 * 24));

        divCurrentDate.innerHTML = `<p>Добрый ${partOfDay}</p>
                                    <p>Сегодня: ${dayOfWeek}</p>
                                    <p>Текущее время: ${currentTime}</p>
                                    <p>До нового года осталось ${timeToNewYear} дней</p>`;

        document.body.append(divCurrentDate);
    };

    showCurrentDate();

});