"use strict"
const body =  document.body;

const formSearch = document.forms.formSearch;

formSearch.addEventListener('click', function(event){
    if(event.target.closest('.form-search__btn')){
        event.preventDefault();
    }
})

const instructionBtn = document.querySelector('.instruction-btn');
const formSearchTextAreas = document.querySelectorAll('.form-search__textarea');
const formSearchBtns = document.querySelectorAll('.form-search__btn');

let countPart = 0;

instructionBtn.addEventListener('click', function(event){
    countPart++;

    gsap.to([body, formSearchTextAreas[1], formSearchTextAreas[2], formSearchBtns], {duration: 2, background:'#D8D8D8'});

    formSearchBtns.forEach(item =>{
        item.style.cursor = 'default';
        item.setAttribute('disabled', 'disabled');
    });

    formSearchTextAreas.forEach(item =>{
        item.setAttribute('readonly', 'readonly');
    });

    if(countPart == 1){
        gsap.to(instructionBtn, {textDecoration: 'none', color: '#0029FF'});

        instructionBtn.innerText = 'In this field, you must enter the text in which the search will be performed.';
    
        instructionBtn.appendChild(createSpan());
    }
    
    console.log(countPart);
})

function createSpan(){
    let spanOk = document.createElement('span');
    spanOk.innerText = 'ok';
    spanOk.style.textTransform = 'uppercase';
    spanOk.style.color = '#71AAFF';
    spanOk.style.textDecoration = 'underline';
    spanOk.style.margin = '0 0 0 10px';

    spanOk.addEventListener('mouseout', function(){
        gsap.to(spanOk, {duration: 1, color: '#71AAFF'})
    });

    spanOk.addEventListener('mouseover', function(){
        gsap.to(spanOk, {duration: 1, color: '#19478c'})
    });

    return spanOk;
}