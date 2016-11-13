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

atm.presentation.clearActionbuttons = function() {
	var name = "atm.presentation.clearActionbuttons()";
	log(name);
	atm.presentation.shadow.querySelector('#' + 'insertcard .actionbuttons').innerHTML="";
}

atm.presentation.initializePages = function() {
	var name = 'atm.presentation.initializePages()';
	//logThis(this);
	log(name);
	// this == atm.presentation
	this.main=document.querySelector('main');
	this.main.innerHTML="";
	this.shadow=document.createElement('div');
	this.shadow.innerHTML="";
	this.pages=[];
	this.pages.startup=this.newPage('startup', '<div class="abs_center"><h1>Meccano ATMs</h1><p>Starting up</p></div></div>');
	this.pages.insertcard=this.newPage('insertcard', '<div class="actionbuttons"></div><div class="abs_center"><h1>Meccano ATMs!</h1><p>Please insert card... <object class="abs right middle" type="image/svg+xml" data="media/insertcard.svg"></p></div>');
	this.pages.dialpin=this.newPage('dialpin', '<button class="fixed bottom right" id="button_verify_pin_ok" type="button" class="btn btn-lg btn-default">OK</button><button class="fixed bottom left" id="button_verify_pin_quit" type="button" class="btn btn-lg btn-default">Quit</button><div class="abs_center"><h1>Enter pin</h1><p>Please hide your pin while typing.</p><input type="password" class="input-lg" maxlength="4" pattern="\d{4}"/></div>');
	this.pages.wrongpin=this.newPage('wrongpin','<button class="fixed bottom right" id="button_wrongpin_ok" type="button" class="btn btn-lg btn-default">OK</button><button class="fixed bottom left" id="button_wrongpin_quit" type="button" class="btn btn-lg btn-default">Quit</button><div class="abs_center"><h1>Wrong pin. Please try again.</h1><p>Please hide your pin while typing.</p><input type="password" class="input-lg" maxlength="4" pattern="\d{4}"/></div>');
	this.pages.timeout=this.newPage('timeout','<div class="abs_center"><h1>Timeout!</h1><p>Please take your card...</p></div>');
	this.pages.goodbye=this.newPage('goodbye','<div class="abs_center"><h1>Goodbye!</h1><p>Exiting...</p>');
	this.pages.cardretained=this.newPage('cardretained','<div class="abs_center"><h1>Card has been pin-blocked and retained by this ATM!</h1><p><strong>Reason:</strong> Too many unsuccessful pin attempts.</p><p>Please contact the bank during the opening hours.</p></div>');
	this.pages.home=this.newPage('home','<button id="btn_home_balance"  class="fixed left top">Balance</button><button id="btn_home_currency_rates" class="fixed left middle">Currency Rates</button><button id="btn_home_quit" class="fixed left bottom">Quit</button><button id="btn_home_withdraw" class="fixed right top">Withdraw</button><button id="btn_home_pay" class="fixed right middle">Payments</button>');
	this.pages.cash=this.newPage('cash','<button id="btn_cash_200"  class="fixed left top">200</button><button id="btn_cash_500" class="fixed left middle">500</button><button id="btn_cash_cancel" class="fixed left bottom">Cancel</button><button id="btn_cash_1000" class="fixed right top">1000</button><button id="btn_cash_2000" class="fixed right middle">2000</button><button id="btn_cash_other" class="fixed right bottom">Other</button><div class="abs_center"><h1>Withdraw cash</h1><p>Choose desired amount or press "Other".</p></div>');
	this.pages.othercash=this.newPage('othercash','<button for="other_amount_input" id="btn_othercash_confirm" class="fixed right bottom">Confirm</button><button id="btn_othercash_cancel" class="fixed left bottom">Cancel</button><div class="abs_center"><h1>Withdraw cash</h1><output id="cashAmount" data-max="10000" data-min="0" name="cashAmount">0</output><button for="cashAmount" class="cashDiff" value="100">+ 100</button><button for="cashAmount" class="cashDiff" value="200">+ 200</button><button for="cashAmount" class="cashDiff" value="500">+ 500</button><button for="cashAmount" class="cashDiff" value="1000">+1000</button><button for="cashAmount" class="cashDiff clear" value="-100">- 100</button><button for="cashAmount" class="cashDiff" value="-200">- 200</button><button for="cashAmount" class="cashDiff" value="-500">- 500</button><button for="cashAmount" class="cashDiff" value="-1000">-1000</button></div>');
	this.pages.balance=this.newPage('balance','<button id="btn_balance_go_back" class="fixed left bottom">Go back</button><div class="abs_center"><h1>Current balance</h1><output id="showBalance" name="showBalance">0</output></div>');
	this.pages.paybill=this.newPage('paybill','<button id="btn_paybills_cancel" class="fixed left bottom">Cancel</button><button id="btn_paybills_confirm" class="fixed right bottom">Confirm</button><div class="abs_center"><h1>Make a payment</h1><fieldset><label id="paybill_showBalance_label">Current balance: <output id="paybill_showBalance" name="paybill_showBalance">0</output></label><label>Recipient account: <input id="paybill_recipient_account_number" name="paybill_recipient_account_number" type="text"/></label><label>Amount: <input id="paybill_amount" type="number"/></label></fieldset></div>');
	this.pages.confirmpayment=this.newPage('confirmpayment','<button for="other_amount_input" id="btn_confirm_payment_confirm" class="fixed right bottom">Confirm</button><button id="btn_confirm_payment_cancel" class="fixed left bottom">Cancel</button><div class="abs_center"><h1>Dial pin to confirm the transaction</h1><p>Please hide your pin while typing.</p><input id="input_pin_confirm_transaction" type="password" class="input-lg" maxlength="4" pattern="\d{4}"/></div>');
	this.pages.currencies=this.newPage('currencies','<button id="btn_currency_go_back" class="fixed left bottom">Go back</button><div class="abs_center"><h1>Currency Rates</h1><p>Last updated: <span id="currency_updated_date"></span></p><div id="currency_container"></div></div>');
	// add all pages to shadow
	this.inactivateAllPages();

	var buttons = this.shadow.querySelectorAll('button');

	for (var j = 0; j < buttons.length; j++) {
		// make buttons loose focus on mouseup event
		buttons[j].addEventListener('mouseup', function (event) {
			target = event.target;
			target.blur();
		}, false);
	}

	// action to log into different accounts

	function createLoginActionElement(accnum) {
		var name = 'createLoginActionElement(' + accnum +')';
		console.log(name);
		var el = document.createElement('button');
		el.id="action_acc_login_" + accnum;
		el.innerText="insert card: [" + accnum + "]";
		el.setAttribute('data-account', accnum);
		el.setAttribute('class','actionButton');
		el.addEventListener('click', function(event){
			var target = event.target;
			atm.service.session.setCurrentSessionAccount(target.getAttribute("data-account"));
			atm.presentation.activatePage('dialpin');
		},false);
		return el;
	}

	var accounts = atm.business.getAccounts();

	for(var l = 0; l < accounts.length; l++) {
		var currentAccNum = accounts[l];
		this.shadow.querySelector('#' + 'insertcard .actionbuttons').appendChild(createLoginActionElement(currentAccNum));
	}

	// increase/decrease amounts
	function changeCashAmount(el) {
		var diff = parseInt(el.getAttribute('value'));
		var output_el = document.querySelector('#' + el.getAttribute('for'));
		
		var current_value = parseInt(output_el.value);
		var max = parseInt(output_el.getAttribute('data-max'));
		var min = parseInt(output_el.getAttribute('data-min'));
		console.log(min + ' :min and max: ' +  max + 'diff: ' + diff);
		if((current_value + diff) >= min && (current_value + diff) <= max) {
			output_el.value = parseInt(current_value) + diff;	
		} else if ((current_value + diff) > max) {
			output_el.value = max;
		} else if ((current_value + diff) < min) {
			output_el.value = min;
		}
	}

	var cashDiffButtons = this.shadow.querySelectorAll('.cashDiff');
	for (var k=0; k<cashDiffButtons.length; k++) {
		cashDiffButtons[k].addEventListener('click',function(event){
			changeCashAmount(event.target); }, false);
	}

}

atm.presentation.testPages = function() {
	var body = document.querySelector('body');
	var header = document.querySelector('header') || document.createElement('header');
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

atm.presentation.inactivateAllPages = function() {
	// this == atm.presentation

	//make all pages inactive
	for (var current_page in this.pages) {
    	if (this.pages.hasOwnProperty(current_page)) {
    		//console.log(page);
        	this.shadow.appendChild(this.pages[current_page]);
    	}
	}
}

atm.presentation.activatePage = function (page) {
	var name = 'atm.presentation.activatePage('+ "'" + page +"')";
	//logThis(this);
	log(name);

	// inactivate all pages
	this.inactivateAllPages();	

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
	currentAccount: null,
	setCurrentSessionAccount: function(val) {
		this.currentAccount = val;
	},
	getCurrentSessionAccount: function() {
		return this.currentAccount;
	}
};

atm.service.init = function () {
	// start up the persistence layer
	atm.business.init();

	// initialize the app
	var boot_timer = 1000;

	var name = 'atm.service.init()';
	//logThis(this);
	log(name);

	// initialize all the pages
	atm.presentation.initializePages();

	// load test pages
	atm.presentation.testPages();

	// add event listeners for quit buttons
	var quitButtons = atm.presentation.shadow.querySelectorAll('button[id*=quit]');
	
	for (var l=0; l<quitButtons.length; l++) {
		quitButtons[l].addEventListener('click',atm.service.quit,false);
	}

	// verify pin button

	// first activate the startup page
	atm.presentation.activatePage('startup');
	
	// activate dialpin page after 3 seconds
	window.setTimeout(function(){atm.presentation.activatePage('insertcard');},boot_timer);

	
}

atm.service.ejectCard = function () {
	var name = "atm.service.ejectCard()";
	log(name);
}

atm.service.retainCard = function () {
	var name = "atm.service.retainCard()";
	log(name);
}

atm.service.quit = function () {
	var name = "atm.service.quit()";
	atm.presentation.clearActionbuttons();
	log(name);
	atm.presentation.activatePage('goodbye');
	atm.service.ejectCard();
	window.setTimeout(atm.service.init,2000);

}

/*
	============================================
	 Business layer
	============================================
*/

atm.business.name='atm.business';

atm.business.init = function () {
	var name = "atm.business.init()";
	log(name);

	// initialize the persistence layer
	atm.persistence.init();
}

atm.business.getAccounts = function () {
	return atm.persistence.getAccountList();
}

/*
	============================================
	 Persistence layer
	============================================
*/
atm.persistence.name='atm.persistence';
atm.persistence.bankAccounts=[];
atm.persistence.initialized = false;
atm.persistence.getAccountList = function () {
	var name = "atm.persistence.getAccountList()";
	log(name);
	var len = atm.persistence.bankAccounts.length;
	var accountList = [];
	for(var i=0; i<len; i++) {
		accountList[i] = atm.persistence.bankAccounts[i].getAccountNumber();
	}
	return accountList;

}

atm.persistence.init = function() {
		var name = 'atm.persistence.init()';
		log(name);

		// add some user accounts
		// should check if they already exist...
		if(!this.initialized) {
			this.bankAccounts.push(new this.BAcc({accountNumber:'123456789', pin:1234, balance:24500,currency:'NOK'}));
			this.bankAccounts.push(new this.BAcc({accountNumber:'987654321', pin:9876, balance:32500,currency:'NOK'}));
			this.bankAccounts.push(new this.BAcc({accountNumber:'012481632', pin:0124, balance:18500,currency:'NOK'}));
		}
		this.initialized = true;
	}


atm.persistence.BAcc = function (props) {
	var that = this;
	this.blocked = false;
	this.failedattempts = 0;
	this.pin = props.pin;
	this.accountNumber = props.accountNumber;
	this.balance = parseInt(props.balance);
	this.currency = props.currency;
	this.pincodeMistakes = 0;
	console.log('creating account: ', that.accountNumber);
	this.isBlocked = function() {
		return that.blocked;
	};
	this.verifyPin = function(str) {
		if(that.pin === str && that.blocked === false) {
			that.failedattempts = 0;
			return true;
		} else {
			that.failedattempts ++;
			if (that.failedattempts >= 3) {
				that.blocked = true;
			}
			return false;
		}
	};
	this.getAccountNumber = function() {
		return that.accountNumber;
	};
	this.withdrawAmount = function(num) {
		if(num <= that.balance) {
			that.balance = that.balance - num;	
			return num;
		} else {
			// not enough balance!
			return 0;
		}
	};
	this.insertAmount = function(num) {
		that.balance = that.balance + num;
	};
	this.getBalance = function() {
		return that.balance;
	};
	return {
		withdrawAmount: that.withdrawAmount,
		insertAmount: that.insertAmount,
		getBalance: that.getBalance,
		verifyPin: that.verifyPin,
		isBlocked: that.isBlocked,
		getAccountNumber: that.getAccountNumber
	};
}


window.addEventListener('load',atm.service.init,false);