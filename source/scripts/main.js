'use strict';

const detect = new MobileDetect(window.navigator.userAgent);

const modalAddNote = document.forms.addNote;

const modalFilter  = document.querySelector('.options__filter-modal');
const addNoteBtn   = document.querySelector('.add-note__btn')
const noteList     = document.querySelector('.note-list');

const countNoteFooter = document.getElementById('count-note__item');
const templateNote    = document.getElementById('note-layout')
const filterBtn       = document.getElementById('filter-btn');

//Вывод содержимого localStorage, если оно есть
if(window.localStorage.length > 0){

    for (let i = 0; i < window.localStorage.length; i++) {

     
        let a = localStorage.getItem(localStorage.key(i));

        a =  JSON.parse(a);

        newNoteToDOM(a, templateNote, noteList);

        countNoteFooter.innerText = `${localStorage.length}`;
    } 

   
}

if(detect.mobile() == null){

    window.addEventListener('pointerover', (event)=>{

        if(event.target.closest('.jsBtnAnimation')){

            if(!event.target.closest('.options__filter-modal__btn__arrow--active')){

                gsap.to(event.target.closest('.jsBtnAnimation'), {
                    duration: .7, 
                    backgroundColor: '#d8d7d7',
                });

            }
        }

        if(event.target.closest('.note-list__item__btns__btn')){

            gsap.to(event.target.closest('.note-list__item__btns__btn'), {
                duration: .7,
                backgroundColor: '#d8d7d7',
            });
        }

    });

    window.addEventListener('pointerout', (event)=>{

        if(event.target.closest('.jsBtnAnimation')){

            if(!event.target.closest('.options__filter-modal__btn__arrow--active')){

                gsap.to(event.target.closest('.jsBtnAnimation'), {
                    duration: .7, 
                    backgroundColor: '#ffffff',
                });
    
            }
        }

        if(event.target.closest('.note-list__item__btns__btn')){

            gsap.to(event.target.closest('.note-list__item__btns__btn'), {
                duration: .7, 
                backgroundColor: '#ffffff',
            });

        }

    });

} else{

    window.addEventListener('click', (event)=>{

        if(event.target.closest('.jsBtnAnimation')){

            gsap.to(event.target.closest('.jsBtnAnimation'), {
                duration: .7, 
                backgroundColor: '#fff',
            });
        
            setTimeout(()=>{
        
                gsap.to(event.target.closest('.jsBtnAnimation'), {
                    duration: .7, 
                    backgroundColor: '#ffffff',
                })
        
            }, 1800);
        }

        if(event.target.closest('.note-list__item__btns__btn')){
            
            gsap.to(event.target.closest('.note-list__item__btns__btn'), {
                duration: .7, 
                backgroundColor: '#fff',
            });
        
            setTimeout(()=>{
        
                gsap.to(event.target.closest('.note-list__item__btns__btn'), {
                    duration: .7, 
                    backgroundColor: '#ffffff',
                })
        
            }, 1800);
        }


    });
}

window.addEventListener('click', (event)=>{

    //Работа с модальными окнами
    //Вызов модального окна с фильтром 
    if(event.target.closest('#filter-btn') && !event.target.closest('.options__filter-modal')){

        modalMove(modalFilter, filterBtn);

    } else if (!event.target.closest('#filter-btn') && !event.target.closest('.options__filter-modal')){
        
        if(filterBtn.classList.contains('active')){
            modalClose(modalFilter, filterBtn);
        }
    }

    //Вызов модального окна с добавление заметки 
    if(event.target.closest('.add-note__btn') && !event.target.closest('.add-note__modal')){

        modalMove(modalAddNote, addNoteBtn);

    } else if (!event.target.closest('.add-note__btn') && !event.target.closest('.add-note__modal')){

        if(addNoteBtn.classList.contains('active')){
            modalClose(modalAddNote, addNoteBtn);
        }
    }

    //Работа с кнопка "удалить" и "изменить" заметки
    if(event.target.closest('.note__list__item__btns-delete')){

        let title = event.target.closest('.note__list__item__btns-delete').parentNode.parentNode.children[0].children[0].innerText; //Получаем закаголовок элемента
        
        if (searchItemToStorage.getItemName(title) == title) {

            for (let i = 0; i < noteList.children.length; i++) {

                if(noteList.children[i].children[0].innerText == title){

                    noteList.children[i].remove();

                }                
            }

            localStorage.removeItem(title);
            countNoteFooter.innerText = `${localStorage.length}`;

        }

    };

    if(event.target.closest('.note__list__item__btns-edit')){
        
        console.log('edit');

    };

});

modalAddNote.addEventListener('click', (event)=>{

    if(event.target.closest('.add-note__modal__btn')){
        if(modalAddNote.elements.addNoteTitle.value != ''){

            if(window.localStorage.length == 0){

                addNoteToStorage(templateNote, noteList, modalAddNote.elements.addNoteTitle.value, modalAddNote.elements.addNoteSubTitle.value);
                    
                modalAddNote.elements.addNoteTitle.value = '';
                modalAddNote.elements.addNoteSubTitle.value = '';

            } else{

                if(searchItemToStorage.getItem(modalAddNote.elements.addNoteTitle.value)){

                    addNoteToStorage(templateNote, noteList, modalAddNote.elements.addNoteTitle.value, modalAddNote.elements.addNoteSubTitle.value);
                    
                    countNoteFooter.innerText = `${localStorage.length}`;
                
                } else {

                    modalAddNote.elements.addNoteTitle.setAttribute('placeholder', 'Заметка уже существует!')

                    gsap.to(modalAddNote.elements.addNoteTitle, {
                        borderColor: 'red',
                        boxShadow: '1px 1px red, 1px -1px red, -1px 1px red, -1px -1px red',
                    });
                }

                modalAddNote.elements.addNoteTitle.value = '';
                modalAddNote.elements.addNoteSubTitle.value = '';
            }
        }
        else{

            gsap.to(modalAddNote.elements.addNoteTitle, {
                borderColor: 'red',
                boxShadow: '1px 1px red, 1px -1px red, -1px 1px red, -1px -1px red',
            });

        };
    };

    if(event.target.closest('.add-note__modal__input')){

        modalAddNote.elements.addNoteTitle.setAttribute('placeholder', 'Название')

        gsap.to(modalAddNote.elements.addNoteTitle, {
            borderColor: 'black',
            boxShadow: 'none',
        });
    }


});

//Работа с фильтрами
modalFilter.addEventListener('click', (event)=>{

    //Анимация для radion btn
    if(event.target.closest('.options__filter-modal__btn__arrow')){
        
        if(event.target.classList.contains('options__filter-modal__btn__arrow--up')){

            event.target.classList.add('options__filter-modal__btn__arrow--active');

            document.querySelector('#arrowUp').setAttribute('checked', 'checked');
            document.querySelector('#arrowDown').removeAttribute('checked');

            document.querySelector('.options__filter-modal__btn__arrow--down').classList.remove('options__filter-modal__btn__arrow--active');
            document.querySelector('.options__filter-modal__btn__arrow--down').style.backgroundColor = '#fff';
        
        }

        if(event.target.classList.contains('options__filter-modal__btn__arrow--down')){

            event.target.classList.add('options__filter-modal__btn__arrow--active');

            document.querySelector('#arrowDown').setAttribute('checked', 'checked')
            document.querySelector('#arrowUp').removeAttribute('checked');
            
            document.querySelector('.options__filter-modal__btn__arrow--up').classList.remove('options__filter-modal__btn__arrow--active');
            document.querySelector('.options__filter-modal__btn__arrow--up').style.backgroundColor = '#fff';
       
        }
    }
    
    //Сортировка по заголовку
    if(event.target.closest('#filter-modal-name')){

        if(document.querySelector('#arrowUp').getAttribute('checked')){

            let newCollectionHTML = arraySortName(document.querySelector('.note-list').children, true);
            
            document.querySelector('.note-list').innerHTML = '';

            for (let i = 0; i < newCollectionHTML.length; i++) {
                document.querySelector('.note-list').appendChild(newCollectionHTML[i]);
            }

        }

        if(document.querySelector('#arrowDown').getAttribute('checked')){

            let newCollectionHTML = arraySortName(document.querySelector('.note-list').children, false);
            
            document.querySelector('.note-list').innerHTML = '';

            for (let i = 0; i < newCollectionHTML.length; i++) {
                document.querySelector('.note-list').appendChild(newCollectionHTML[i]);
            }
        }
    

    }

    //функция для сортировки по заголовку
    function arraySortName(collectionHTML, boolean){
        
        let newCollectionHTML = [];
        let arrayTitle = [];

        for(let i = 0; i < collectionHTML.length; i++){
            arrayTitle.push(collectionHTML[i].children[0].innerText.toUpperCase());
        }

        arrayTitle.sort();

        for (let i = 0; i <= collectionHTML.length - 1; i++) {
            for (let j = 0; j <= arrayTitle.length - 1; j++) {
                if(arrayTitle[i] === collectionHTML[j].children[0].innerText.toUpperCase()){

                    if(boolean){

                        newCollectionHTML.unshift(collectionHTML[j])

                    } 

                    if(!boolean){

                        newCollectionHTML.push(collectionHTML[j])

                    }
                }
            }
        }

        return newCollectionHTML;
    }

});

function modalMove(modal, id){

    if(id.classList.contains('no-active')){

        id.classList.remove('no-active');

        id.classList.add('active');

        modal.style.display = 'flex';

        gsap.to(modal, {
            delay: .4,
            opacity: 1,
            y: 10,
            duration: 1,
            zIndex: 8,
            ease: 'back.out(3)',
        });

    } else{

        id.classList.remove('active');

        id.classList.add('no-active');

        gsap.to(modal, {
            opacity: 0,
            y: -10,
            zIndex: 1,
            duration: 1,
            ease: 'back.in(3)',
        });

        setTimeout(()=>{
            modal.style.display = 'none';
        }, 1100);
    };
};

function modalClose(modal, id){

    id.classList.remove('active');

    id.classList.add('no-active');

    gsap.to(modal, {
        opacity: 0,
        y: -10,
        zIndex: 1,
        duration: 1,
        ease: 'back.in(3)',
    });

    setTimeout(()=>{
        modal.style.display = 'none';
    }, 1100);

};

class Note{
    constructor(title, subtitle, dateAdd, dateEdit){
        this.title = title;
        this.subtitle = subtitle;
        this.dateAdd = dateAdd;
        this.dateEdit = dateEdit;
    }

    content = {
        element: '',
    };

    addContent(item) {
        this.content.element = `${item}`;
    }

    deleteContent(){
        this.content.element = '';
    }
}

//Создание нового объекта на основе класса Note
function addNoteToStorage(template, block, title, subtitle){

    let newNotes = new Note(`${title}`, `${subtitle}`, 'dateAdd', 'dateEdit');

    localStorage.setItem(newNotes.title, JSON.stringify(newNotes));

    newNoteToDOM(newNotes, template, block);
}

//Добавление нового элемента в список
function newNoteToDOM(note, template, block){

    template.content.querySelector('.note-list__item__subtitle').textContent = note.subtitle;
    template.content.querySelector('.note-list__item__title').textContent    = note.title;
    template.content.querySelector('.note-list__item__date').textContent     = note.dateEdit;

    let li = template.content.cloneNode(true); //копируем все содержимое template

    block.append(li);
}

//Поиск элемента в localStorage
let searchItemToStorage = {

    getItem: (title)=>{
        let boolVal = true; //если true, то в коллекции нет элемента с таким названием, если false, то есть
    
        for (let i = 0; i < window.localStorage.length; i++) {
    
            let item = window.localStorage.getItem(window.localStorage.key(i));
    
            item = JSON.parse(item);
    
            if(item.title == title){
    
                boolVal = false;
    
                break;
    
            } else {
    
                boolVal = true;
    
            }
        }
    
        return boolVal;
    },

    getItemName: (title) =>{
    
        for (let i = 0; i < window.localStorage.length; i++) {
    
            let item = window.localStorage.getItem(window.localStorage.key(i));
    
            item = JSON.parse(item);
    
            if(item.title == title){
    
               return  item.title
    
            } 
        }
    }
}