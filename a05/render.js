/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
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
    // TODO: Copy your code from a04 to render the hero card
    let heroMonth = hero.firstSeen.getMonth() + 1;
    console.log("Hero Background = " + hero.backgroundColor);
    console.log("Hero Foreground = " + hero.color);
    return '<div id="' + hero.last + '"' + ' > <div class = "heroCard" style="background-color:' + hero.backgroundColor +'"> <img src="' + hero.img + '" alt="Hero Image"> <p>' + hero.first + ' <br>' +  hero.last + ' <br> <span style="color:' + hero.color +'">' + hero.name +'</span> </p> <br> <p>' + hero.description +'</p> <br> <span>' + heroMonth + '/' + hero.firstSeen.getDate() + '/' + hero.firstSeen.getFullYear() +'</span> <br> <button class="edit" id = "' +hero.last+ '"' +'>Edit</button> </div> </div>';

};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    let monthOfHero = hero.firstSeen.getMonth() + 1;
    let dayOfHero = hero.firstSeen.getDate();
    console.log("Month of Hero is: " + monthOfHero);
    if(monthOfHero < 10) {
        monthOfHero = "0" + monthOfHero;
    }
    if(dayOfHero < 10) {
        dayOfHero = "0" + dayOfHero;
    }
    return '<div id="' + hero.last + '"' + ' ><form id="' + hero.last + 'form"' + '>First Name: <input type="text" name="first" value="' + hero.first + '"> <br> Last Name: <input type="text" name="last" value="' + hero.last+ '"> <br> Hero Name: <input type="text" name="heroName" value="' + hero.name+ '"> <br>Hero Description: <textarea name = "description">' + hero.description + '</textarea> <br> Hero First Seen: <input type="date" name="firstSeen" value="' + hero.firstSeen.getFullYear() + '-' + monthOfHero + '-' + dayOfHero + '"> <br> <button class="save" id = "' + hero.last + '"' + 'type="submit">Save</button> <button class = "cancel" id = "' + hero.last + '"' + '>Cancel</button> </form></div>';

};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    console.log("Pressed Edit Button!!!");
    
    // console.log("Value of event: " + event);
    let name = event.currentTarget.id;
    console.log("Name = " + name);
    // console.log("Heroic Data Test: " + heroicData[0].name);
    let indexOfHero = findIndexOfHero(name);
    let heroEditFormHTML = renderHeroEditForm(heroicData[indexOfHero]);
    console.log("Form HTML = " + heroEditFormHTML);
    let nameIDString = "#" + name;
    // let elementToReplace = document.querySelector(nameIDString);
    // let newElement = document.createElement("div");
    // newElement.innerHTML = heroEditFormHTML;
    // elementToReplace.parentNode.replaceChild(newElement, elementToReplace);
    $(nameIDString).replaceWith(heroEditFormHTML);
    // $(nameIDString).detach();
};

export const findIndexOfHero = function (name) {
    console.log("Searcing for index of hero");
    console.log("Search term is: " + name);
    for(let i = 0; i < heroicData.length; i++) {
        if(heroicData[i].last == name) {
            return i;
        }
    }
    console.log("Failed to find Index of hero")
    return -1;
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    event.preventDefault();
    console.log("Cancel Pressed!!!");
    
    let name = event.currentTarget.id;
    console.log("Name = " + name);
    let indexOfHero = findIndexOfHero(name);
    let heroCardHTML = renderHeroCard(heroicData[indexOfHero]);
    console.log("Card HTML = " + heroCardHTML);
    let nameIDString = "#" + name;
    $(nameIDString).replaceWith(heroCardHTML);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    console.log("Save Pressed!!!!");
    let name = event.currentTarget.id;
    console.log("Name = " + name);
    let indexOfHero = findIndexOfHero(name);
    let idOfForm = "#" + name + "form";
    // document.getElementById("myform").elements["foo"]
    // console.log("Form Field Test: " + document.getElementById(idOfForm).elements.length);
    // document.querySelector("#Starkform").elements[0].value;
    let formElements = document.querySelector(idOfForm);
    // console.log("Value of First Name Field: " + formElements.elements[0].value);
    let heroToEdit = heroicData[indexOfHero];
    // Hero Fields:
        // first
        // last
        // heroName
        // description
            // this is a text area. Any difference?
        // firstSeen
            // must be saved as a date object. How to do.
    heroToEdit.first = formElements.elements[0].value;
    heroToEdit.last = formElements.elements[1].value;
    heroToEdit.name = formElements.elements[2].value;
    heroToEdit.description = formElements.elements[3].value;
    let dateString = formElements.elements[4].value;
    console.log("Date String: " + dateString);
    let newDateObj = stringToDate(dateString);
    heroToEdit.firstSeen = newDateObj;

    // re render hero card:
    let heroCardHTML = renderHeroCard(heroicData[indexOfHero]);
    console.log("card HTML = " + heroCardHTML);
    let nameIDString = "#" + name;
    $(nameIDString).replaceWith(heroCardHTML);

};

export const stringToDate = function(string) {
    let splitArray = string.split('-');
    console.log("Splitting Date String Y M D: ");
    let year = splitArray[0];
    console.log(year);
    let month = splitArray[1] -1;
    console.log(month);
    let day = splitArray[2] -0;
    console.log(day);

    return new Date(year, month);

};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    var arrayOfDivs = [];
    for(let i = 0 ; i < heroes.length; i++) {
        arrayOfDivs.push(renderHeroCard(heroes[i]))
    }

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    // This code generates heroes and appends them.
    for(let i = 0; i < heroes.length; i++) {
        console.log("I's value is: " + i);
        // $($root).append(renderHeroCard(heroes[i]));
        $($root).append(arrayOfDivs[i]);

    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $(document).on("click", ".edit", handleEditButtonPress)

    
    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $(document).on("click", ".save", handleEditFormSubmit)


    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $(document).on("click", ".cancel", handleCancelButtonPress)
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
