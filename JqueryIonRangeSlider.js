
function strpos (haystack, needle, offset) {
  var i = (haystack+'').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}


$(document).ready(function() {
	$(".InputfieldText input[data-enableionrange=1]").each(function() {
		initIonRange($(this));
	}); 
	$(document).on('reloaded opened repeateradd wiretabclick', '.InputfieldText', function() {

		$(this).find("input[data-enableionrange=1]").each(function() {
			initIonRange($(this));
		});
	});
}); 


var initIonRange = function($textField) {

	var thisID = $textField.attr('id');
	var optsID = thisID.split('_repeater')[0];

	var thisOpts = 'JqueryIonRangeSlider.' + optsID;
	eval('var fieldInitString=config.'+thisOpts);
	eval('var fieldInit = {'+fieldInitString+'}')
	var val = $('#'+thisID).val(); 

	var $range = $('#'+thisID);
    $range.ionRangeSlider(fieldInit);
	var slider = $range.data("ionRangeSlider");

	var type = 'single';
	if($(this).data('isrange') == 1) type = 'double';

	// Range Scenario 1: There is a from and to defined, and no values array:
	if( type == 'double'  && strpos(fieldInitString, 'from:') && strpos(fieldInitString, 'to:') && !strpos(fieldInitString, 'values:') && strpos(val,';')) {
		array = val.split(";");
		range_from = array[0];
		range_to = array[1];
		slider.update({
		    from: range_from,
		    to: range_to
		});
		//console.log(1);
	}

	// Range Scenario 2: no "to" defined, no values array:
	if( type == 'double'  && strpos(fieldInitString, 'from:') && !strpos(fieldInitString, 'to:') && !strpos(fieldInitString, 'values:') && strpos(val,';')) {
		array = val.split(";");
		range_from = array[0];
		slider.update({
		    from: range_from
		});
		//console.log(2);
	}

	// Range Scenario 3: There is a from and to defined, and a values array:
	if( type == 'double'  && strpos(fieldInitString, 'from:') && strpos(fieldInitString, 'to:') && strpos(fieldInitString, 'values:') && strpos(val,';')) {
		var valuesArray = fieldInit.values;
		array = val.split(";");
		// double ranges with preset array values would always be numbers
		// Fixed numbers preset...
		var range_from = valuesArray.indexOf(Number(array[0]));
		var range_to = valuesArray.indexOf(Number(array[1]));
		slider.update({
		    from: range_from,
		    to: range_to
		});
		//console.log(3);
	}

	//  Scenario 4: There is a from defined, and a values array:
	if( strpos(fieldInitString, 'from:') && !strpos(fieldInitString, 'to:') && strpos(fieldInitString, 'values:')) {
		var valuesArray = fieldInit.values;
		var range_from = valuesArray.indexOf(val);
		slider.update({
		    from: range_from
		});
		//console.log(4);
	}


	//  Scenario 5: Single, & there is a from defined, and no values array:
	if( type == 'single' && strpos(fieldInitString, 'from:') && !strpos(fieldInitString, 'values:')) {
		slider.update({
		    from: val
		});
		//console.log(5);
	}

}

