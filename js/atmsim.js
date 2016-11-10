window.addEventListener('load',init,false);
var atm = {};

function activatePage(page) {
	console.log('activatePage(' + page + ')');

	//make all pages inactive
	for (var current_page in atm.pages) {
    	if (atm.pages.hasOwnProperty(current_page)) {
    		//console.log(page);
        	atm.shadow.appendChild(atm.pages[current_page]);
    	}
	}

	// activate the right page
	atm.main.appendChild(atm.pages[page]);

}

function newPage(pageName, inner){
	var el = document.createElement('section');
	el.setAttribute('id',pageName);
	el.innerHTML=inner;
	return el;
}

function init () {
	var startupHTML = 
	console.log("atm init");
	atm.main=document.querySelector('main');
	atm.shadow=document.createElement('div');
	atm.pages=[];
	atm.pages.startup=newPage('startup', '<h1>Meccano ATMs</h1><p>Starting up</p>');
	atm.pages.insertcard=newPage('insertcard', '<h1>Meccano ATMs</h1><p>Please insert card...</p>');
	atm.pages.dialpin=newPage('dialpin', '<input type="password" class="input-lg" maxlength="4" pattern="\d{4}"/><button id="button_verify_pin" type="button" class="btn btn-lg btn-default">OK</button>');
	

	activatePage('startup');

	
}

