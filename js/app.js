'use strict';
// use ajax to GET info from the .JSON file
// need to send each object through a constructor


// create prototype to get info to fill template
// use info to fill in the template
// display imgs on page


// ajax:
$.ajax('data/page-1.json', {method: "GET", dataType: "JSON"})
  .then(data => {
    // run each object through constructor
    data.forEach(objectInArray => {
      //console.log('horned animals from forEach...', objectInArray);
      new HornedAnimals(objectInArray).animalImageBuilder();

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

  $newSection.find('h2').text(this.name);
  $newSection.find('img').attr('src', this.image);
  $newSection.find('img').attr('alt', this.description);
  $('main').append($newSection);


  const $newOption = $(`<option>${this.keyword}</option>`);
  $('select').append($newOption);
// https://stackoverflow.com/questions/2822962/jquery-remove-duplicate-elements
// collaberated with Blake and Claudio
  var seen = {};
  $('option').each(function(){
    var txt = $(this).text();
    if (seen[txt])
      $(this).remove();
    else
      seen[txt] = true;

  });
}



// feature #2
// getting keywords to drop down list
// need to target drop down menu from html
// creat option tags to hold keywords from object

