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
const tasks = [
  {
    id: idRandom(),
    title: 'Lorem ipsum dolor sit amet! 1',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet asperiores, eveniet porro dolor consequuntur blanditiis cum facere aperiam quae quis reprehenderit repellendus velit quaerat? Natus cumque quisquam dolor eos.'
  },
  {
    id: idRandom(),
    title: 'Lorem ipsum dolor sit amet Molestiae, quas! 2',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet asperiores, eveniet porro dolor consequuntur blanditiis cum facere aperiam quae quis reprehenderit repellendus velit quaerat? Natus cumque quisquam dolor eos.'
  },
  {
    id: idRandom(),
    title: 'Lorem ipsum dolor sit amet, quas! 3',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet asperiores, eveniet porro dolor consequuntur blanditiis cum facere aperiam quae quis reprehenderit repellendus velit quaerat? Natus cumque quisquam dolor eos.'
  },
]
function idRandom(){
  return Math.round(Math.random() * 10000 + 999)
};

(function(arrTasks){
  const objOdTasks = arrTasks.reduce((i, task)=>{
    i[task.id] = task;
    return i;
  }, {});

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

  function renderOfTask(list){
    // console.log(list);
    Object.values(list).forEach((task, i) => {
      const card = createCardTemplate(task);
      contentCard.appendChild(card);
    })
  }
  renderOfTask(objOdTasks)

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
    objOdTasks[newTask.id] = newTask;
    return newTask;
  }
  // select theme
  function onSelectTheme(){
    const myTheme = selectedTheme.value;
    const selectedThemeObj = themes[myTheme];
    
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
  

})(tasks);