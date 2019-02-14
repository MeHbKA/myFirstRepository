'use strict';
$('document').ready(function (){
  loadPage();
});

let tasks = [];

function loadPage(){
  $.getJSON('priority.json', function (data){
  if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }else{
    tasks.push(data.defaultTasks);
  }
    writePage ();
  });           
}

$('#add').on('click', function(){
  let name = $('#task')[0].value;
  let priority = $('input[name = "priority"]:checked').val();
  let newTask = {
    "name" : name,
    "priority" : priority
  }
  tasks.push(newTask);
  writePage ();
})

function writePage () {
  let low = '';
  let minor = '';
  let major = '';
  let high = '';
  if (tasks == ''){
    let out = '<div>No Tasks</div>';
    $('#itemList').html(out);
  }else {
    for (let i = 0; i < tasks.length; i++){
      if (tasks[i].priority == 'high'){
        high += drawPage(i, high);
        $('#high').html(high);
      }else if (tasks[i].priority == 'major'){
        major += drawPage(i, major);
        $('#major').html(major);
      }else if (tasks[i].priority == 'minor'){
        minor += drawPage(i, minor);
        $('#minor').html(minor);
      }else if (tasks[i].priority == 'low'){
        low += drawPage(i, low);
        $('#low').html(low);
      }
    }
  }
  
let checkBox = $('input[type = "checkbox"]');
checkBox.change(function () {
  $(this.parentNode).toggleClass('checked');
  for(let i = 0; i < checkBox.length; i++){
    let index = this.getAttribute('data-index');
    let name = checkBox[i].name;
    if (checkBox[i].checked){
      localStorage.setItem(name, 'checked');
      console.log(checkBox[i].name);
    }else {
      localStorage.removeItem(name);
    }
  }
});

  $('.edit').on('click',function (){
    let out = '';
    let index = this.getAttribute('data-index');
    out += '<div>Name: ' + tasks[index].name + '</div>';
    out += '<div>Priority: ' + tasks[index].priority + '</div>';
    $(this.parentNode).html(out);
  })
  
  $('.remove').on('click',function (){
    let index = this.getAttribute('data-index');
    tasks.splice(index,1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    writePage();
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function drawPage(i, out){
  out = '';
  out += '<div>';
  out += '<input type = "checkbox" data-index = "'+ i +'"name = "'+ tasks[i].name +'">';
  out += tasks[i].name;
  out += ' <button class = "edit" data-index = "'+ i +'"><img src = "img/edit.png"></button>';
  out += ' <button class = "remove" hidden data-index = "'+ i +'"><img src = "img/remove.png"></button>';
  out += '</div>';
  return out;
}