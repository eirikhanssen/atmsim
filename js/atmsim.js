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
	this.pages.startup=this.newPage('startup', '<div class="abs_center"><h1>Meccano ATMs</h1><p>Starting up</p></div></div>');
	this.pages.insertcard=this.newPage('insertcard', '<div class="abs_center"><h1>Meccano ATMs</h1><p>Please insert card...</p></div>');
	this.pages.dialpin=this.newPage('dialpin', '<div class="abs_center"><h1>Enter pin</h1><p>Please hide your pin while typing.</p><input type="password" class="input-lg" maxlength="4" pattern="\d{4}"/><button id="button_verify_pin" type="button" class="btn btn-lg btn-default">OK</button></div>');
	this.pages.wrongpin=this.newPage('wrongpin','<div class="abs_center"><h1>Wrong pin. Please try again.</h1><p>Please hide your pin while typing.</p><input type="password" class="input-lg" maxlength="4" pattern="\d{4}"/><button id="button_verify_pin_wrong" type="button" class="btn btn-lg btn-default">OK</button></div>');
	this.pages.timeout=this.newPage('timeout','<div class="abs_center"><h1>Timeout!</h1><p>Please take your card...</p></div>');
	this.pages.goodbye=this.newPage('goodbye','<div class="abs_center"><h1>Goodbye!</h1><p>Exiting...</p>');
	this.pages.cardretained=this.newPage('cardretained','<div class="abs_center"><h1>Card had been pin-blocked and retained by this ATM!</h1><p><strong>Reason:</strong> Too many unsuccessful pin attempts.</p><p>Please contact the bank during the opening hours.</p></div>');
	this.pages.home=this.newPage('home','<button id="btn_home_balance"  class="left top">Balance</button><button id="btn_home_currency_rates" class="left middle">Currency Rates</button><button id="btn_home_quit" class="left bottom">Quit</button><button id="btn_home_withdraw" class="right top">Withdraw</button><button id="btn_home_pay" class="right middle">Payments</button>');
}

atm.presentation.testPages = function() {
	var body = document.querySelector('body');
	var header = document.createElement('header');
	header.innerHTML = '<label>Systems page test:&nbsp;</label>';
	function addPageButton(page) {
		var btn = document.createElement('button');
		btn.innerText = page;
		btn.addEventListener('click',function(){atm.presentation.activatePage(page)}, false);
		return btn;
	} for (var property_name in atm.presentation.pages) {
		header.appendChild(addPageButton(property_name));
	}
	body.insertBefore(header,atm.presentation.main);
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

atm.service.session={

};

atm.service.init = function () {
	// initialize the app

	var name = 'atm.service.init()';
	//logThis(this);
	log(name);

	// initialize all the pages
	atm.presentation.initializePages();

	// load test pages
	atm.presentation.testPages();
	
	// first activate the startup page
	atm.presentation.activatePage('startup');
	
	// activate dialpin page after 3 seconds
	window.setTimeout(function(){atm.presentation.activatePage('insertcard');},3000);
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