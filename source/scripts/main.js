"use strict"
const body =  document.body;
const instructionBtn = document.querySelector('.instruction-btn');
const formSearchTextAreas = document.querySelectorAll('.form-search__textarea');
const formSearchBtns = document.querySelectorAll('.form-search__btn');

const formSearch = document.forms.formSearch;

//Поиск слова в тексте и вывод их в одельном окне
formSearch.addEventListener('click', function(event){
    if(event.target.closest('.form-search__btn')){
        event.preventDefault();
    }

    if(event.target.closest('#formSearch__btn-search')){
        formSearchTextAreas[1].value = ''
        let textSearch = formSearchTextAreas[2].value;
        let regExp = new RegExp(`${textSearch}`, 'gi');

        let mainText;
        let countIndex = 0; //счетски найденных символов/слов
        let arrayIndexText = [];//массив индексов

        /* Заменить в  HTML textarea на div и реальзовать добавление в него списка, 
        чтобы затем реализовать подсваетку символов/слов в основном тексте*/

        while(mainText = regExp.exec(formSearchTextAreas[0].value)){
            countIndex++;
            arrayIndexText.push(regExp.lastIndex);
            formSearchTextAreas[1].value += `${countIndex}: ${mainText} \n`;
        };
        console.table(arrayIndexText);
        console.dir(formSearchTextAreas[1]);
    }
})

let countPart = 0;

addMouseOver(instructionBtn, '#71AAFF');

addMouseOut(instructionBtn, '#000');

formSearchBtns.forEach(item =>{
    item.addEventListener('mouseover', function(){
        gsap.to(item, {duration: .7, background: '#71AAFF', ease: 'power4.out'})
    });

    item.addEventListener('mouseout', function(){
        gsap.to(item, {duration: .7, background: '#fff', ease: 'power4.out'})
    });
});

instructionBtn.addEventListener('click', function(event){
    countPart++;

    addMouseOver(instructionBtn, '#0029FF');

    addMouseOut(instructionBtn, '#0029FF');
    

    if(countPart == 1){

        gsap.to(instructionBtn, {textDecoration: 'none', color: '#0029FF', ease: 'power4.out'});

        gsap.to([body, [1], formSearchTextAreas[2], formSearchBtns], {duration: 2, background:'#D8D8D8', ease: 'power4.out'});

        formSearchBtns.forEach(item =>{
            item.style.cursor = 'default';
            item.setAttribute('disabled', 'disabled');
        });

        formSearchTextAreas.forEach(item =>{
            item.setAttribute('readonly', 'readonly');
        });

        instructionBtn.innerText = 'In this field, you must enter the text in which the search will be performed.';
    
        instructionBtn.appendChild(createSpan());
    }

    if(countPart == 2){

        gsap.to(formSearchTextAreas[0], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
        gsap.to(formSearchTextAreas[1], {duration: 1, background: '#fff', ease: 'power4.out'})

        instructionBtn.innerText = 'In this field, you must enter the text that we will search for.';
    
        instructionBtn.appendChild(createSpan());
    }

    if(countPart == 3){

        gsap.to(formSearchTextAreas[1], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
        gsap.to(formSearchTextAreas[2], {duration: 1, background: '#fff', ease: 'power4.out'})

        instructionBtn.innerText = 'This field displays the final search result.';
    
        instructionBtn.appendChild(createSpan());
    }

    if(countPart == 4 ){

        gsap.to(formSearchTextAreas[2], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
        gsap.to(formSearchBtns[0], {duration: 1, background: '#fff', ease: 'power4.out'})

        instructionBtn.innerText = 'Pressing this button will search with an underline for the search word.';
    
        instructionBtn.appendChild(createSpan());
    }

    if(countPart == 5 ){

        gsap.to(formSearchBtns[0], {duration: 1, background:'#D8D8D8', ease: 'power4.out'});
        gsap.to(formSearchBtns[1], {duration: 1, background: '#fff', ease: 'power4.out'})

        instructionBtn.innerText = 'Pressing this button will replace the word.';
    
        instructionBtn.appendChild(createSpan());
    }

    if(countPart == 6){
        countPart = 0;

        instructionBtn.innerText = 'How to use?';
        instructionBtn.style.textDecoration = 'underline';
        instructionBtn.style.color = '#000';

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
}});

function createSpan(){
    let spanOk = document.createElement('span');
    spanOk.innerText = 'ok';
    spanOk.style.textTransform = 'uppercase';
    spanOk.style.color = '#71AAFF';
    spanOk.style.textDecoration = 'underline';
    spanOk.style.margin = '0 0 0 10px';

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