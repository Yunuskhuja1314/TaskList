const themes = {
  light: {
    '--navbar-bg': '#dadada',
    '--dark': '#191919',
    '--del-btn': '#ad1c1c',
    '--white': '#ffffff',
    '--gray': '#858585',
    '--body-bg': '#ffffff',
  },
  dark: {
    '--navbar-bg': '#444444',
    '--dark': '#ffffff',
    '--del-btn': '#ad1c1c',
    '--white': '#ffffff',
    '--gray': '#858585',
    '--body-bg': '#131313',
  },
}
function idRandom(){
  return Math.round(Math.random() * 10000 + 999)
};

(function(){
  // console.log(objOdTasks);
  const contentCard = document.querySelector('.content');
  const tasksForm = document.taskForm;
  const inpTitle = tasksForm.elements.title;
  const ariaContent = tasksForm.elements.content;
  const selectedTheme = document.getElementById('selectTheme');
  const navbarBtn = document.querySelector('.navbar__btn');
  const navbarContent = document.querySelector('.navbar__content');
  
  // события 
  tasksForm.addEventListener('submit', onFormSubmint);
  selectedTheme.addEventListener('change', onSelectTheme);
  navbarBtn.addEventListener('click', menuOpen);
  document.addEventListener('mouseup', menuClose);
  document.addEventListener('DOMContentLoaded', getTasks);
  document.addEventListener('DOMContentLoaded', selectStoreTheme);
  document.addEventListener('click', deleteTask);

  // генерация карточки
  function createCardTemplate({id, title, content} = {}){
    const cardItem = document.createElement('div');
    cardItem.classList.add('item');
    cardItem.setAttribute('data-id', id);

    const h3 = document.createElement('h3');
    h3.innerHTML = title;

    const p = document.createElement('p');
    p.innerHTML = content;

    const btnDel = document.createElement('button');
    btnDel.classList.add('btn-del');
    btnDel.type = 'button';
    btnDel.innerHTML = 'Удалить';

    cardItem.appendChild(h3);
    cardItem.appendChild(p);
    cardItem.appendChild(btnDel);

    return cardItem;
  }
  // отправка формы
  function  onFormSubmint(event){
    event.preventDefault();
    const valueTitle = inpTitle.value;
    const valueContent = ariaContent.value;
    
    if(!valueTitle || !valueContent){
      alert('Заполните все поля');
      return;
    }
    const task = CreateNewTask(valueTitle, valueContent);
    const newItem = createCardTemplate(task);
    
    contentCard.insertAdjacentElement('afterbegin', newItem);
    taskForm.reset();
  }
  function CreateNewTask(title, content){
    const newTask = {
      title, content, id: idRandom(),
    }
    taskInLocalStore(newTask);
    return newTask;
  }
  // select theme
  function onSelectTheme(){
    const myTheme = selectedTheme.value;
    let theme;
    if(localStorage.getItem('theme') === null){
      theme = 'light';
    }else{
      theme = JSON.parse(localStorage.getItem('theme'))
    }
    theme = myTheme;
    localStorage.setItem('theme', JSON.stringify(theme));
    
    const selectedThemeObj = themes[theme];
    
    let strStyle = '';
    for(const key in selectedThemeObj){
      strStyle += `${key}: ${selectedThemeObj[key]}; `;
    }
    document.documentElement.style = strStyle;
  }
  function selectStoreTheme(){
    let theme;
    if(localStorage.getItem('theme') === null){
      theme = 'light';
    }else{
      theme = JSON.parse(localStorage.getItem('theme'))
    }
    const selectedThemeObj = themes[theme];
    
    let strStyle = '';
    for(const key in selectedThemeObj){
      strStyle += `${key}: ${selectedThemeObj[key]}; `;
    }
    document.documentElement.style = strStyle;
  }
  // responseMenu
  function menuOpen(){
    if(navbarBtn.classList.contains('active') === true){
      navbarBtn.classList.remove('active');
      navbarContent.style = `left: -102%; transition: left 0.5s`;
    }else{
      navbarBtn.classList.add('active');
      navbarContent.style = `left: 0; transition: left 0.5s`;
    }
  }
  function menuClose(event){
    if(event.target.classList.contains('navbar__content')){
      navbarContent.style = `left: -102%; transition: left 0.5s`;
      navbarBtn.classList.remove('active');
    }
  }
  // добавление в локальную историю
  function taskInLocalStore(task){
    let list;
    if(localStorage.getItem('tasks') === null){
      list = [];
    }else{
      list = JSON.parse(localStorage.getItem('tasks'))
    }
    list.push(task);
    localStorage.setItem('tasks', JSON.stringify(list))
  }
  // вывод на экран из локальной истории
  function getTasks(){
    let list;
    if(localStorage.getItem('tasks') === null){
      list = [];
    }else{
      list = JSON.parse(localStorage.getItem('tasks'))
    }
    list.reverse();
    list.forEach(item => {
      contentCard.appendChild(createCardTemplate(item));
    })
  }
  // удаление из локальной истории и со страницы
  function deleteTask({target}){
    if(target.classList.contains('btn-del')){
      const parent = target.closest('.item');
      const parentId = parent.getAttribute('data-id');
      let list;
      if(localStorage.getItem('tasks') === null){
        list = [];
      }else{
        list = JSON.parse(localStorage.getItem('tasks'))
        parent.remove();
      }
      list.forEach((item, num) => {
        if(parentId == item.id){
          list.splice(num, 1);
        }
      })
      localStorage.setItem('tasks', JSON.stringify(list));
    }
  }

})();