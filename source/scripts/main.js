'use strict';

const detect = new MobileDetect(window.navigator.userAgent);

let countNotes = [];

const modalAddNote = document.forms.addNote;

const modalFilter  = document.querySelector('.options__filter-modal');
const addNoteBtn   = document.querySelector('.add-note__btn')
const noteList     = document.querySelector('.note-list');

const templateNote = document.getElementById('note-layout')
const filterBtn    = document.getElementById('filter-btn');

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

        console.log('del');
       
    };

    if(event.target.closest('.note__list__item__btns-edit')){
        
        console.log('edit');

    };

});

modalAddNote.addEventListener('click', (event)=>{

    if(event.target.closest('.add-note__modal__btn')){
        if(modalAddNote.elements.addNoteTitle.value != ''){
            
            newNote(templateNote, noteList, modalAddNote.elements.addNoteTitle.value, modalAddNote.elements.addNoteSubTitle.value);
           
            //Добавляем id для каждого элемента коллекции списка
            document.querySelector('.note-list').children[countNotes[countNotes.length - 1].id].setAttribute('id', countNotes[countNotes.length - 1].id)

            modalAddNote.elements.addNoteTitle.value = '';
            modalAddNote.elements.addNoteSubTitle.value = '';

        }
        else{

            gsap.to(modalAddNote.elements.addNoteTitle, {
                borderColor: 'red',
                boxShadow: '1px 1px red, 1px -1px red, -1px 1px red, -1px -1px red',
            });

        };

    };

    if(event.target.closest('.add-note__modal__input')){

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

        arrayTitle.sort()

        for (let i = 0; i <= collectionHTML.length - 1; i++) {
            for (let j = 0; j <= arrayTitle.length - 1; j++) {
                if(arrayTitle[i] === collectionHTML[j].children[0].innerText.toUpperCase()){

                    if(boolean){

                        newCollectionHTML.unshift(collectionHTML[j])

                    } else{

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
    constructor(title, subtitle, dateAdd, dateEdit, id){
        this.title = title;
        this.subtitle = subtitle;
        this.dateAdd = dateAdd;
        this.dateEdit = dateEdit;
        this.id = id;
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


function newNote(template, block, title, subtitle){

    let newNotes = new Note(`${title}`, `${subtitle}`, 'dateAdd', 'dateEdit', 'id');

    countNotes.push(newNotes);

    countNotes[countNotes.length - 1].id = countNotes.length - 1; //добавление id

    const noteSubTitle = template.content.querySelector('.note-list__item__subtitle');
    const noteTitle    = template.content.querySelector('.note-list__item__title');
    const noteDate     = template.content.querySelector('.note-list__item__date');

    noteTitle.textContent = newNotes.title;

    noteSubTitle.textContent = newNotes.subtitle;

    noteDate.textContent = newNotes.dateEdit;

    let li = template.content.cloneNode(true); //копируем все содержимое template

    block.append(li);
}