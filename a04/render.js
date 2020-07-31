/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <David Moore>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    let heroMonth = hero.firstSeen.getMonth() + 1;
    console.log("Hero Background = " + hero.backgroundColor);
    console.log("Hero Foreground = " + hero.color);
    return '<div style="background-color:' + hero.backgroundColor +'"> <img src="' + hero.img + '" alt="Hero Image"> <p>' + hero.first + ' <br>' +  hero.last + ' <br> <span style="color:' + hero.color +'">' + hero.name +'</span> </p> <br> <p>' + hero.description +'</p> <br> <span>' + heroMonth + '/' + hero.firstSeen.getDate() + '/' + hero.firstSeen.getFullYear() +'</span> <br> <button>Edit</button> </div>';
    
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    let monthOfHero = hero.firstSeen.getMonth() + 1;
    let dayOfHero = hero.firstSeen.getDate();
    console.log("Month of Hero is: " + monthOfHero);
    if(monthOfHero < 10) {
        monthOfHero = "0" + monthOfHero;
    }
    if(dayOfHero < 10) {
        dayOfHero = "0" + dayOfHero;
    }
    return '<form>First Name: <input type="text" name="first" value="' + hero.first + '"> <br> Last Name: <input type="text" name="last" value="' + hero.last+ '"> <br> Hero Name: <input type="text" name="heroName" value="' + hero.name+ '"> <br>Hero Description: <textarea>' + hero.description + '</textarea> <br> Hero First Seen: <input type="date" name="firstSeen" value="' + hero.firstSeen.getFullYear() + '-' + monthOfHero + '-' + dayOfHero + '"> <br> <button type="submit">Save</button> <button>Cancel</button> </form>';
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()

    // TODO: Append the hero cards to the $root element
    for(let i = 0; i < heroes.length; i++) {
        console.log("I's value is: " + i);
        $($root).append(renderHeroCard(heroes[i]));
    }

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    // console.log("randomHero Index = " + randomHero);

    // TODO: Generate the hero edit form using renderHeroEditForm()
    let heroEditFormHTML = renderHeroEditForm(randomHero);

    // TODO: Append the hero edit form to the $root element
    $($root).append(heroEditFormHTML);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
// $(document).ready(loadHeroesIntoDOM(heroicData));
// $(document).ready(console.log("Hello World"));
$(function() {
    loadHeroesIntoDOM(heroicData);
});
