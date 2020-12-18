const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', () => {
  const input = document.querySelector('#input');
  const text = input.value.trim();

  if (text !== '') {
    ajaxAdd(text);
    input.value = '';
    input.focus();
  }
});

function addToList(text) {
  const list = document.querySelector('#list');

  const newListItem = document.createElement('li');
  const length = list.querySelectorAll('li').length;

  newListItem.classList.add('list-item'); 
  newListItem.setAttribute('id','list'+length);
  newListItem.innerHTML = '<input type="hidden" name="interest" value="'+text+'">'+'<div style="width: 90%;float: left;">' + text + '</div> <div style="width: 10%;float: left; "><button onclick="delete_btn('+length+')">X</button>';
  list.appendChild(newListItem);
}

function delete_btn(num) {
  $('#list'+num).remove();
}

function ajaxAdd(text) {
  $.ajax({
      url: '/interest/ok',
      dataType: 'json',
      type: 'POST',
      data: {'interest':text},
      success: function(result) {
          if (result) {
            if(result.ok)
              addToList(text);
            else
            {
              alert(result.message);
            }
          }
      }
  });
}

function addToMyList(text) {
  const list = document.querySelector('#mylist');

  const newListItem = document.createElement('li');
  const length = list.querySelectorAll('li').length;

  newListItem.classList.add('list-item'); 
  newListItem.setAttribute('id','list'+length);
  newListItem.innerHTML = text;
  list.appendChild(newListItem);
}

let getData = (interest) => {
  return new Promise(resolve => {
    let str = "";
    for(i in interest)
    {
      if(interest[i])
      {
        str += interest[i] + '/';
      }
      if(i == 'keyword10')
      {
        resolve(str.substring(0, str.length - 1))
      }
    }
  })
}

let makeList = async (interests) => {
  for( data in interests)
  {
    let str = await getData(interests[data])
    addToMyList(str);
  }
}

$(document).ready(function(){
  function ajaxList() {
      console.log('ajax func start');
      $.ajax({
          url: '/interest/data',
          dataType: 'json',
          type: 'GET',
          data: '',
          success: function(result) {
              if (result) {
                makeList(result.interests);
              }
          }
      });
      setTimeout(function(){$('#mylist').empty();ajaxList()},20000);
  }
  ajaxList();
});