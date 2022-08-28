"use strict";

const formSearch = document.forms.formSearch

formSearch.addEventListener('click', function(event){
    if(event.target.closest('.form-search__btn')){
        event.preventDefault();
    }
})