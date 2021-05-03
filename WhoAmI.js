"use strict"
let questions=document.getElementsByClassName('question');
let nextButton=document.getElementById('nextButton');
let statButton=document.getElementById('statButton');
let ul=document.getElementById('test')
let counter=0;
questions[counter].insertAdjacentElement('afterEnd', nextButton);

function lastQuestion(){
    nextButton.style.visibility='hidden';
    statButton.style.visibility='';
    ul.firstElementChild.insertAdjacentElement('afterEnd', statButton);
}


function goNext(){
    counter++;
    if (counter>=questions.length) return lastQuestion();
    questions[counter].style.visibility='';
    for (let i=0;i<questions.length;i++){
        if (i!=counter) questions[i].style.visibility='hidden';
    }
    ul.insertBefore(questions[counter],ul.firstElementChild);
    ul.firstElementChild.insertAdjacentElement('afterEnd', nextButton);
}

function checkResult(answers){
    let result=null;
    cycle: for (let i=0;i<answers.length;i++){
        if(answers[i].checked){
            if (answers[i].getAttribute('data-true')!==null) result=true;
            else {
            result=false;
            break cycle;
            }
        }
    }
    return result;
}

function checkStatOfNumberInPercents(array, number){
    let kolvo=0;
    for (let i=0;i<array.length;i++){
        if(array[i]===number) kolvo++;
    }
    return Math.round((kolvo/array.length)*100);
}

function howManyNumbersInArray(array, number){
    let kolvo=0;
    for (let i=0;i<array.length;i++){
        if(array[i]===number) kolvo++;
    }
    return kolvo;
}

function checkAnswers(){
    let arr=[];
    for (let i=0;i<questions.length;i++){
        arr[i]=checkResult(questions[i].querySelectorAll('input'));
    }
    let noAnswers=howManyNumbersInArray(arr, null);
    let falseAnswers=howManyNumbersInArray(arr, false);
    let truePercent=checkStatOfNumberInPercents(arr,true);
    let trueAnswers=howManyNumbersInArray(arr, true);
    let msg='Правильных ответов: '+ trueAnswers+' '+truePercent+ '%' + '\n'+
    'Неправильных ответов: ' + falseAnswers+ '\n'+
    'Без ответов: ' +noAnswers+ '\n';
    alert(msg);
}