"use strict"

// В колекции formSearchTextAreas не все элементы являются textarea
// Элемент formSearchTextAreas[1] - div

const body                  = document.body;

const instructionBtn        = document.querySelector('.instruction-btn');

const formSearch            = document.forms.formSearch,
      formSearchTextAreas   = document.querySelectorAll('.form-search__textarea'),
      formSearchBtns        = document.querySelectorAll('.form-search__btn');

const modalChange           = document.querySelector('.modal-change'),
      modalChangeBtns       = document.querySelectorAll('.modal-change__btn'),
      modalChangeInput      = document.getElementById('modal-change__input'),
      modalChangeBtnConfirm = document.getElementById('modal-change__btn-confirm'),
      modalChangeBtnCancel  = document.getElementById('modal-change__btn-cancel');


let   symbolToSearch, // Слово/слова для замены
      firstOldText,   // Текст перед словом/словами для замены
      lastOldText;    // Текст после словом/словами для замены

let mainText; //Основной текст в котором будет производиться замена
let countInstruction       = 0; //счетски найденных символов/слов
let arrayIndexText         = [];//массив индексо

fromInputResultStyle();

function fromInputResultStyle(){
    if(formSearchTextAreas[2].value.length == 0){
       formSearchTextAreas[1].style.color  = 'gray';
       formSearchTextAreas[1].innerText    = 'Result';
    }
    else{
       formSearchTextAreas[1].style.color  = 'black';
    }   
}

instructionBtn.addEventListener('mouseout', instructionMouseOut);
instructionBtn.addEventListener('mouseover', instructionMouseOver);

//Анимации для кнопок при срабатывании инструкции
addMouseOver(instructionBtn, '#71AAFF');

addMouseOut(instructionBtn, '#000');

formSearchBtns.forEach(function(item){
    item.addEventListener('mouseover', function(){
        gsap.to(item, {duration: .7, background: '#71AAFF', ease: 'power4.out'})
    });

    item.addEventListener('mouseout', function(){
        gsap.to(item, {duration: .7, background: '#fff', ease: 'power4.out'})
    });
});

modalChangeBtns.forEach(function(item){
    item.addEventListener('mouseover', function(){
        gsap.to(item, {duration: .7, background: '#71AAFF', ease: 'power4.out'})
    });

    item.addEventListener('mouseout', function(){
        gsap.to(item, {duration: .7, background: '#fff', ease: 'power4.out'})
    });
});

//Поиск слова в тексте и вывод их в одельном окне
formSearch.addEventListener('click', function(event){

    if(event.target.closest('.form-search__btn')){
       event.preventDefault();
    }

    if(event.target.closest('#formSearch__btn-search')){
        if(formSearchTextAreas[2].value == ''){
           alert('Enter text');
           fromInputResultStyle();
        }
        else{

           formSearchTextAreas[1].innerText = ''

           let textSearch = formSearchTextAreas[2].value;

           let regExp = new RegExp(`${textSearch}`, 'gi');
    
           const list         = addListToFormSearch(); //создание списка результатов поиска
            
           formSearchTextAreas[1].appendChild(list); //добавление списка в поле с результатом поиска

           while(mainText = regExp.exec(formSearchTextAreas[0].value)){
                 countInstruction++;
                 arrayIndexText.push(regExp.lastIndex);
                 list.appendChild(addItemListToFormSearch(mainText, countInstruction));
           };

           fromInputResultStyle();

           function mouveOut(event){
                gsap.to(event, {duration: 1, background: 'transparent', color: '#000', ease: 'power4.out'});
           };

           function mouveOver(event){
                gsap.to(event, {duration: 1, background: '#f0f0f0', ease: 'power4.out'});
           };

           const itemList = document.querySelectorAll('.list-result li'); //коллекция созданных элементов списка результата поиска


           list.addEventListener('mouseover', function(event){

                if(event.target.closest('li').classList.contains('active')){
                   return false;
                }
                else{
                   mouveOver(event.target.closest('li'));
                }
           });

           list.addEventListener('mouseout', function(event){

                if(event.target.closest('li').classList.contains('active')){
                   return false;
                }
                else{
                   mouveOut(event.target.closest('li'));
                }
           });

           //Поиск слова/слов для замены
           list.addEventListener('click', function(event){
                if(event.target.closest('li').classList.contains('active')){
                   event.target.closest('li').classList.remove('active')
                   gsap.to(event.target.closest('li'), {duration: 1, background: 'transparent', color: '#000', ease: 'power4.out'});
                }

                else{
                   event.target.closest('li').classList.add('active');

                   itemList.forEach(function(item, index){
                        if(item.classList.contains('active')){
                           regExp.lastIndex = arrayIndexText[index - 1];

                           symbolToSearch   = regExp.exec(formSearchTextAreas[0].value);

                           firstOldText     = formSearchTextAreas[0].value.substring(0, regExp.lastIndex - symbolToSearch[0].length);
  
                           lastOldText      = formSearchTextAreas[0].value.substring(regExp.lastIndex, formSearchTextAreas[0].value.length);
                        }
                   });

                   gsap.to(event.target.closest('li'), {duration: 1, background: '#71AAFF', color: '#fff', ease: 'power4.out'});
                }
            });
        }
    }

    if(event.target.closest('#formSearch__btn-change')){
        if(!formSearchTextAreas[1].innerText == 'Result' || !formSearchTextAreas[1].innerText == 'Результат'){
            gsap.to([body, formSearchTextAreas, formSearchBtns], {duration: 2, background:'#D8D8D8', ease: 'power4.out', userSelect: 'none'});
        
            instructionBtn.removeEventListener('click', instructionAnimation);
    
            gsap.to(instructionBtn, {cursor: 'default', color: 'gray'});
    
            formSearchBtns.forEach(item =>{
                 item.style.cursor = 'default';
                 item.setAttribute('disabled', 'disabled');
            });
     
            formSearchTextAreas.forEach(item =>{
                 item.setAttribute('readonly', 'readonly');
            });
    
            modalChange.style.display = 'flex';
            setTimeout(function() {
                gsap.to(modalChange, { opacity: 1, duration: 2.5, ease: "back.out(3)", y: -120})
                body.addEventListener('click', modalHidden);
            }, 1000);
        }
    };
});

//События для модального окна
modalChange.addEventListener('click', function(event){
    
    if(event.target.closest('.modal-change__btn')){
        event.preventDefault();

        if(event.target.closest('#modal-change__btn-confirm')){
            modalChangeInput.value;
            formSearchTextAreas[0].value = `${firstOldText}${modalChangeInput.value}${lastOldText}`;
        }

        if(event.target.closest('#modal-change__btn-cancel')){
            gsap.to(instructionBtn, {cursor: 'pointer', color: '#000'});

            gsap.to(modalChange, {duration: 2.5, y: 120, ease: 'back.in(3)', opacity: 0, });
            setTimeout(function(){
                modalChange.style.display = 'flex';
                gsap.to([body, formSearchTextAreas, formSearchBtns], {duration: 2, background:'#fff', ease: 'power4.out'});
    
            formSearchBtns.forEach(item =>{
                 item.style.cursor = 'pointer';
                 item.removeAttribute('disabled');
     
                 item.addEventListener('mouseover', function(){
                     gsap.to(item, {duration: .7, background: '#71AAFF', ease: 'power4.out'})
                 });
     
                 item.addEventListener('mouseout', function(){
                     gsap.to(item, {duration: .7, background: '#fff', ease: 'power4.out'})
                 })
            });
     
            formSearchTextAreas[0].removeAttribute('readonly');
            formSearchTextAreas[2].removeAttribute('readonly');
     
            if(valueIputsForm.length != 0){
                 formSearchTextAreas.forEach(function(item, index){   
                     try {
                         item.value = valueIputsForm[index];
                     } catch (error) {
                         item.innerText = valueIputsForm[index];
                     };
                 });
            };   
            valueIputsForm = [];
            modalChange.classList.remove('jsModal-active')
            }, 3000);;

            setTimeout(function(){
                body.removeEventListener('click', modalHidden);
            }, 10);
        }
    }
});
function modalHidden(event){
    if(!event.target.closest('.modal-change .modal-change__container')){

        gsap.to(instructionBtn, {cursor: 'pointer', color: '#000'});

        gsap.to(modalChange, {duration: 2.5, y: 120, ease: 'back.in(3)', opacity: 0, });
        setTimeout(function(){
            modalChange.style.display = 'flex';
            gsap.to([body, formSearchTextAreas, formSearchBtns], {duration: 2, background:'#fff', ease: 'power4.out'});

        formSearchBtns.forEach(item =>{
             item.style.cursor = 'pointer';
             item.removeAttribute('disabled');
 
             item.addEventListener('mouseover', function(){
                 gsap.to(item, {duration: .7, background: '#71AAFF', ease: 'power4.out'})
             });
 
             item.addEventListener('mouseout', function(){
                 gsap.to(item, {duration: .7, background: '#fff', ease: 'power4.out'})
             })
        });
 
        formSearchTextAreas[0].removeAttribute('readonly');
        formSearchTextAreas[2].removeAttribute('readonly');
 
        if(valueIputsForm.length != 0){
             formSearchTextAreas.forEach(function(item, index){   
                 try {
                     item.value = valueIputsForm[index];
                 } catch (error) {
                     item.innerText = valueIputsForm[index];
                 };
             });
        };   
        valueIputsForm = [];
        modalChange.classList.remove('jsModal-active')
        }, 3000);
    };

    setTimeout(function(){
        body.removeEventListener('click', modalHidden);
    }, 10);
};

function addSpanToFormSearch(content){
    let span              = document.createElement('span');
    span.style.background = '#71AAFF';
    span.innerText        = `${content}`;
    return span;
}


function addListToFormSearch(){
    let ul                  = document.createElement('ul');
    ul.style.display        = 'flex';
    ul.style.flexDirection  = 'column';
    ul.style.justifyContent = 'flex-start';
    ul.style.width          = '100%';
    ul.setAttribute('class', 'list-result');
    return ul;
}

function addItemListToFormSearch(content, countInstruction){
    let li             = document.createElement('li');
    li.style.width     = '100%';
    li.style.listStyle = 'none';
    li.style.cursor    = 'pointer';
    li.innerText       = `${countInstruction}: ${content}`;
    return li;
}

function instructionMouseOut(){
    gsap.to(instructionBtn, {color: '#000', duration: .3, ease: 'power1.out'});
}


function instructionMouseOver(){
    gsap.to(instructionBtn, {color: '#71AAFF', duration: .3, ease: 'power1.out'});
}


let countPart = 0;



let valueIputsForm = [];

function instructionAnimation(){
    countPart++;

    addMouseOver(instructionBtn, '#0029FF');

    addMouseOut(instructionBtn, '#0029FF');
    

    if(countPart == 1){

       formSearchTextAreas.forEach(function(item){   
            try {
                if(item.value != null || item.value.length != 0){
                   valueIputsForm.push(item.value)
                   item.value = '';
                }
            } catch (error) {
                if(item.innerText != null || item.innerText.length != 0){
                   valueIputsForm.push(item.innerText)
                   item.innerText = '';
                }
            }
       });

       gsap.to(instructionBtn, {textDecoration: 'none', color: '#0029FF', ease: 'power4.out'});

       gsap.to([body, formSearchTextAreas[1], formSearchTextAreas[2], formSearchBtns], {duration: 2, background:'#D8D8D8', ease: 'power4.out', userSelect: 'none'});

       formSearchBtns.forEach(item =>{
            item.style.cursor = 'default';
            item.setAttribute('disabled', 'disabled');
       });

       formSearchTextAreas.forEach(item =>{
            item.setAttribute('readonly', 'readonly');
       });

       instructionBtn.innerText = 'In this field, you must enter the text in which the search will be performed.';
    
       instructionBtn.appendChild(addSpanToInstruction());
    }

    if(countPart == 2){

       gsap.to(formSearchTextAreas[0], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
       gsap.to(formSearchTextAreas[1], {duration: 1, background: '#fff', ease: 'power4.out'})

       instructionBtn.innerText = 'In this field, you must enter the text that we will search for.';
    
       instructionBtn.appendChild(addSpanToInstruction());
    }

    if(countPart == 3){

       gsap.to(formSearchTextAreas[1], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
       gsap.to(formSearchTextAreas[2], {duration: 1, background: '#fff', ease: 'power4.out'})

       instructionBtn.innerText = 'This field displays the final search result.';
    
       instructionBtn.appendChild(addSpanToInstruction());
    }

    if(countPart == 4 ){

       gsap.to(formSearchTextAreas[2], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
       gsap.to(formSearchBtns[0], {duration: 1, background: '#fff', ease: 'power4.out'})

       instructionBtn.innerText = 'Pressing this button will search with an underline for the search word.';
    
       instructionBtn.appendChild(addSpanToInstruction());
    }

    if(countPart == 5 ){

       gsap.to(formSearchBtns[0], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
       gsap.to(formSearchBtns[1], {duration: 1, background: '#fff', ease: 'power4.out'})

       instructionBtn.innerText = 'Pressing this button will replace the word.';
    
       instructionBtn.appendChild(addSpanToInstruction());
    }

    if(countPart == 6){
       countPart = 0;

       instructionBtn.innerText            = 'How to use?';
       instructionBtn.style.textDecoration = 'underline';
       instructionBtn.style.color          = '#000';

       addMouseOver(instructionBtn, '#71AAFF');

       addMouseOut(instructionBtn, '#000');

       gsap.to([body, formSearchTextAreas, formSearchBtns], {duration: 2, background:'#fff', ease: 'power4.out'});

       formSearchBtns.forEach(item =>{
            item.style.cursor = 'pointer';
            item.removeAttribute('disabled');

            item.addEventListener('mouseover', function(){
                gsap.to(item, {duration: .7, background: '#71AAFF', ease: 'power4.out'})
            });

            item.addEventListener('mouseout', function(){
                gsap.to(item, {duration: .7, background: '#fff', ease: 'power4.out'})
            })
       });

       formSearchTextAreas[0].removeAttribute('readonly');
       formSearchTextAreas[2].removeAttribute('readonly');

       if(valueIputsForm.length != 0){
            formSearchTextAreas.forEach(function(item, index){   
                try {
                    item.value = valueIputsForm[index];
                } catch (error) {
                    item.innerText = valueIputsForm[index];
                };
            });
       };   
       valueIputsForm = [];
    }
}

instructionBtn.addEventListener('click', instructionAnimation);

function addSpanToInstruction(){
    let spanOk                  = document.createElement('span');
    spanOk.innerText            = 'ok';
    spanOk.style.textTransform  = 'uppercase';
    spanOk.style.color          = '#71AAFF';
    spanOk.style.textDecoration = 'underline';
    spanOk.style.margin         = '0 0 0 10px';

    addMouseOver(spanOk, '#19478c');

    addMouseOut(spanOk, '#71AAFF');

    return spanOk;
}

function addMouseOver(item, color){
    item.addEventListener('mouseover', itemAnim);

    function itemAnim(){
        gsap.to(item, {duration: .7, color: color, ease: 'power4.out'})
    }
}

function addMouseOut(item, color){
    item.addEventListener('mouseout', itemAnim);

    function itemAnim(){
        gsap.to(item, {duration: .7, color: color, ease: 'power4.out'})
    }
}