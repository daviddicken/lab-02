'use strict';
// use ajax to GET info from the .JSON file
// need to send each object through a constructor


// create prototype to get info to fill template
// use info to fill in the template
// display imgs on page

// global array of collection of all the animals
//forEach on that collection, add all options to menu

// ajax:
$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(data => {
    // run each object through constructor
    data.forEach(objectInArray => {
      new HornedAnimals(objectInArray).animalImageBuilder();
    })

    //Chance Harmon & Andrew Casper helped us with the below

    $('select').on('change', function(){
      $('section').hide();
      $('section').each((index, element) => {
        if (this.value === $(element).find('h2').text()){

          $(element).show();
        }
      });
    })
  })

// create constructor:

function HornedAnimals(obj){
  this.name = obj.title;
  this.image = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

// create protoType:

HornedAnimals.prototype.animalImageBuilder = function(){
// need to get template from html, fill template w/data info
// append to DOM
  const template = $('#photo-template').html();
  const $newSection = $(`<section>${template}</section>`);

  $newSection.find('h2').text(this.keyword);
  $newSection.find('img').attr('src', this.image);
  $newSection.find('img').attr('alt', this.description);
  $('main').append($newSection);

  const $newOption = $(`<option value="${this.keyword}">${this.keyword}</option>`);
  $('select').append($newOption);

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



