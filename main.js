/*  
Задание: (Команды) 
    создаёте пустой массив
    Потом бесконечно начинает работать окно ввода текста
    Вы задаете команду например добавить элемент (добавить элемен, Иван)
    Например:
        add, Иван
    Вы обрабатываете команду add и добавляете в массив строку Иван
    Дальше Вы задаете команду удалить элемент (удалить элемент, Иван)
    Например:
        del, Иван
    И когда Вы напишете команду стоп то окно ввода текста больше не появлятся
    Все результаты добавления и удаления выводятся в console и после остановки выводится конечный результат 
*/
const arr = [];

for(let i = 0; i < Infinity; i++){
    let command = prompt('Введите команду для добавлениея или удаление имён пользователей (add, del, stop)');
    let strArr = command.split(' ');

    if(command == 'stop'){
        break;
    }else if(strArr[0] == 'add'){
        arr.push(strArr[1]);
    }else if(strArr[0] == 'del'){
        for(let x = 0; x < arr.length; x++){
            if(arr[x] == strArr[1]){
                arr.splice(x, 1);
            }
        }
    }
    console.log(arr);
}
console.log(arr);