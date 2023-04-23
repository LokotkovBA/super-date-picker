# super-date-picker
[Storybook со всеми компонентами](https://main--6441bdeb65ebb7e85a8c2a04.chromatic.com/) \
Сделан для тестового задания \
За образец взят https://eui.elastic.co/pr_3350/#/forms/super-date-picker

Итоговый компонент - [DateRangeInput](#DateRangeInput)

Cостоит из: 
- [Calendar](#calendar) 
- [RelativeTime](#relativetime) 
- [SuperDatePicker](#superdatepicker)
- [DateRangeInput](#daterangeinput) 

## Calendar
Выбор даты, времени. Изначально выбрана текущая дата и время.
Состоит из самого календаря, выбора времени, выбора месяцев и выбора года.

![Calendar small screen](https://media.discordapp.net/attachments/833717272794366007/1099808507643052083/image.png)
![Calendar big screen](https://media.discordapp.net/attachments/833717272794366007/1099807612486303836/image.png)

## RelativeTime
Выбор даты относительного какого-то временного промежутка. Введённое значение должно быть числом.

![RelativeTime options selector](https://media.discordapp.net/attachments/833717272794366007/1099810006171398234/image.png)
![Incorrect input](https://media.discordapp.net/attachments/833717272794366007/1099810379271524362/image.png)

## SuperDatePicker
Итоговый компонент-picker

![SuperDatePicker small screen](https://media.discordapp.net/attachments/833717272794366007/1099811806962258032/image.png)
![SuperDatePicker big screen](https://media.discordapp.net/attachments/833717272794366007/1099811211870212196/image.png)

## DateRangeInput
Выбор временного диапазона с помощью SuperDatePicker. Время в input в формате ISO.
![DateRangeInput small screen](https://media.discordapp.net/attachments/833717272794366007/1099814602226806866/image.png)
![DateRangeInput big screen](https://media.discordapp.net/attachments/833717272794366007/1099812880330788945/image.png)
