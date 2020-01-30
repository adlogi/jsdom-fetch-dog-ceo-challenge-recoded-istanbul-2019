const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {

    const imgContainer = document.querySelector('#dog-image-container');
    const breedsList = document.querySelector('#dog-breeds');
    const breedMenu = document.querySelector('#breed-dropdown');
    let jsonImg = {};
    let jsonBreed = {};

    //<option value="a">a</option>
    breedMenu.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const option = document.createElement('option');
        const char = String.fromCharCode(97 + i);
        option.setAttribute("value", char);
        option.textContent = char;
        breedMenu.append(option);
    }
    
    fetch(imgUrl)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        jsonImg = json;
        
        for(const imgSrc of jsonImg.message) {
            console.log(imgSrc);
            imgTag = document.createElement('img');
            imgTag.setAttribute("src", imgSrc);
            imgContainer.append(imgTag);
        }
    });

    fetch(breedUrl)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        jsonBreed = json;
        for(const breedName in jsonBreed.message) {
            console.log(breedName);
            if (breedMenu.options[breedMenu.selectedIndex].value == breedName[0]) {
                const li = document.createElement('li');
                li.textContent = breedName;
                breedsList.append(li);
            } else {
                break;
            }
        }
    });

    breedMenu.onchange = function () {
        console.log(jsonBreed);
        breedsList.innerHTML = '';
        for(const breedName in jsonBreed.message) {
            if (breedMenu.options[breedMenu.selectedIndex].value == breedName[0]) {
                const li = document.createElement('li');
                li.textContent = breedName;
                breedsList.append(li);
            }
        }
    }

});