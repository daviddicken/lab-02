'use strict';
// use ajax to GET info from the .JSON file
// need to send each object through a constructor
// create prototype to get info to fill template
// use info to fill in the template
// display imgs on page
// global array of collection of all the animals
//forEach on that collection, add all options to menu
// ajax:

//=======================
// add event listener to button
// add attr to the section unique to json file it was loaded from
// target attr with button click
// toggle between hide and show of each json img collection
// only need to add attr to one set and use if or if not

let animalHerd = [];

displayPage('data/page-1.json');
let toggle = 0;

$('button').on('click',function(){
  // debugger;
  animalHerd = [];
  $('main').empty();
  $('select:first').empty();
  toggle % 2 === 0 ? displayPage('data/page-2.json') : displayPage('data/page-1.json');
  toggle % 2 === 0 ? $('button').html('Page 1'): $('button').html('Page 2') ;
  toggle++;

})




function displayPage(file)
{
  $.ajax(file, {method: 'GET', dataType: 'JSON'})
  // $.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
    .then(data => {
    // run each object through constructor
      data.forEach(objectInArray => {
        new HornedAnimals(objectInArray);
        // new HornedAnimals(objectInArray).animalImageBuilder();
      })
      animalHerd.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()){
          return 1;
        } else {
          return -1;
        }})

      renderArray()

      //Chance Harmon & Andrew Casper helped us with the below
      //Ron Dunphy helped us with the below as well

      //the below works for sort drop down because we chained next to the selector
      $('select:first').next().on('change', function(){
        console.log('were in select:first');
        $('main').empty();
        $('select:first').empty();

        //target if statement for whichever option is selected
        // console.log(this.value);
        if (this.value === 'name') {
          animalHerd.sort((a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase()){
              return 1;
            } else {
              return -1;
            }
          })
          renderArray();
        }

        if (this.value === 'horns') {
          console.log('were in clicked on horn');
          animalHerd.sort((a, b) => {
            return a.horns - b.horns;

          });
          console.log(animalHerd);

          renderArray();
        }


      })

      //this is our keyword drop down selector
      $('select:first').on('change', function(){
        $('section').hide();
        $('section').each((index, element) => {
          if (this.value === $(element).find('h2').text()){
            $(element).show();
          }
        });
      })
    })
}

function renderArray(){
  for (var i = 0; i < animalHerd.length; i++){
    $('main').append(animalHerd[i].animalImageBuilder());
  }}

// create constructor:

function HornedAnimals(obj){
  this.name = obj.title;
  this.image = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

  animalHerd.push(this)
}

// create protoType:

HornedAnimals.prototype.animalImageBuilder = function(){
// need to get template from html, fill template w/data info
// append to DOM

  //grab template from html
  // use mustache to create new html by merging template with our object
  // return the html from method
  // append it to the DOM
  let template = $('#photo-template').html();
  //using jQuery selector we can set the value of this to empty before rending sorted, set value  .textContent('')
  let html = Mustache.render(template, this);

  $('main').append(html);

  this.dropDownList();
}

//------------------- drop down function ----------------

HornedAnimals.prototype.dropDownList = function(){
  // maybe refactor below
  const $newOption = $(`<option value="${this.keyword}">${this.keyword}</option>`);
  $('select:first').append($newOption);

  // https://stackoverflow.com/questions/2822962/jquery-remove-duplicate-elements
  const seen = {};
  $('option').each(function(){
    let txt = $(this).text();
    if (seen[txt])
      $(this).remove();
    else
      seen[txt] = true;

  });
}

// sort by name function

