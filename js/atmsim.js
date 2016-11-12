/*
	============================================
	 The globally visible main object with the different 'layers'
	============================================
*/
var atm = {
	name: 'atm',
	presentation: {},
	service: {},
	business: {},
	persistence: {}
};

var logThis = function (obj) {
	console.log(obj.name);
}

var log = function(txt) {
	console.log(txt);
}

/*
	============================================
	 Presentation layer
	============================================
*/
atm.presentation.name = 'atm.presentation';

atm.presentation.newPage = function (pageName, inner){
	var name = "atm.presentation.newPage("+"'"+pageName+"'"+")";
	//logThis(this);
	log(name);
	var el = document.createElement('section');
	el.setAttribute('id',pageName);
	el.innerHTML=inner;
	return el;
}

atm.presentation.initializePages = function() {
	var name = 'atm.presentation.initializePages()';
	//logThis(this);
	log(name);
	// this == atm.presentation
	this.main=document.querySelector('main');
	this.shadow=document.createElement('div');
	this.pages=[];
	this.pages.startup=this.newPage('startup', '<h1>Meccano ATMs</h1><p>Starting up</p>');
	this.pages.insertcard=this.newPage('insertcard', '<h1>Meccano ATMs</h1><p>Please insert card...</p>');
	this.pages.dialpin=this.newPage('dialpin', '<input type="password" class="input-lg" maxlength="4" pattern="\d{4}"/><button id="button_verify_pin" type="button" class="btn btn-lg btn-default">OK</button>');
}

atm.presentation.activatePage = function (page) {
	var name = 'atm.presentation.activatePage('+ "'" + page +"')";
	//logThis(this);
	log(name);
	// this == atm.presentation


	//make all pages inactive
	for (var current_page in this.pages) {
    	if (this.pages.hasOwnProperty(current_page)) {
    		//console.log(page);
        	this.shadow.appendChild(this.pages[current_page]);
    	}
	}

	// activate the right page
	this.main.appendChild(this.pages[page]);
}



/*
	============================================
	 Service layer
	============================================
*/

atm.service.name='atm.service';

atm.service.init = function () {
	// initialize the app
	
	var name = 'atm.service.init()';
	//logThis(this);
	log(name);

	// initialize all the pages
	atm.presentation.initializePages();
	
	// first activate the startup page
	atm.presentation.activatePage('startup');
	
	// activate dialpin page after 3 seconds
	window.setTimeout(function(){atm.presentation.activatePage('dialpin');},3000);
}

/*
	============================================
	 Business layer
	============================================
*/

atm.business.name='atm.business';

/*
	============================================
	 Persistence layer
	============================================
*/
atm.persistence.name='atm.persistence';

window.addEventListener('load',atm.service.init,false);