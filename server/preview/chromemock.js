var data = {};
var widget;
var colorbox;//jshint ignore:line
var currentColorProp = '';

if(window.location.href.indexOf("DESIGN_MODE=TRUE") === -1) {
  //var propertyBank = PropertyBank();//jshint ignore:line
  function submitColor() {//jshint ignore:line
    var color = '#000000';
    if ($('#colorinput').val().length == 7) {
      color = $('#colorinput').val();
    }

    ds_propertyValuesChanged([currentColorProp], [color]);//jshint ignore:line
    $('#colorcontainer').hide();
  }

  // Update component

  ds_propertyValuesChanged = function(aPropertyNames, aPropertyValues) { //jshint ignore:line
    var instance = sap.designstudio.sdk.PropertyPage.instance;
    for (var i = 0; i < aPropertyNames.length; i++) {
      var property = [aPropertyNames[i]];
      var value = aPropertyValues[i];

        if (widget[property]  && instance[property] && property!="result") {
          if (value != 'true' && value != 'false') {
            widget[property](value);
            if(widget.oControlProperties.type === "sdkdatasource") {
              widget.oControlProperties[property] = value;
            }              
          } else if (value == 'true') {
            widget[property](true);
            if(widget.oControlProperties.type === "sdkdatasource") {
              widget.oControlProperties[property] = true;
            }              
          } else if (value == 'false') {
            widget[property](false);
            if(widget.oControlProperties.type === "sdkdatasource") {
              widget.oControlProperties[property] = false;
            }              
          }
          
        }
    }
    if(aPropertyNames.length > 0 && aPropertyNames.indexOf('result') === -1) {
      if(widget.oControlProperties.type === "sdkdatasource") {
        widget.afterUpdate();
      } else{
        widget.updateProperties(aPropertyNames);
      }
    }

  };
  
  ds_setPropertyValues = function(aProperties) {//jshint ignore:line
    var instance = sap.designstudio.sdk.PropertyPage.instance;
    _.each(aProperties,function(value,property){
        if (typeof instance !=='undefined' && instance[property] ) {
          if (value != 'true' && value != 'false') {
            instance[property](value);
          } else if (value == 'true') {
            instance[property](true);
          } else if (value == 'false') {
            instance[property](false);
          }
          instance.afterUpdate();
        }
    });
  };

  $(document.body).append('<div id=\'colorcontainer\' style=\'left: 0px;top: 0px;position: absolute;width:400px;z-index: 1000;\'><input id=\'colorinput\' type=\'text\' value=\'#000000\'/><input value=\'submit\' type=\'button\' value=\'#000000\' onclick=\'submitColor()\'/></div>');
  $('#colorcontainer').hide();

  //mimic callRuntimeHandler
  ds_callComponentHandler = function() {//jshint ignore:line
    var parameters = '';
    var returnVal;
    for (var j = 1; j < arguments.length; j++) {
      if (isNaN(arguments[j])) {
        parameters += '"' + arguments[j] + '"';
      }else {
        parameters +=  arguments[j];
      }

      if (j != arguments.length - 1){
       parameters += ',';
      }
    }

    if (widget[arguments[0]]) {
      if (arguments.length > 1) {
        returnVal = eval('widget[arguments[0]](' + parameters + ')');//jshint ignore:line
      }else {
        returnVal = widget[arguments[0]]();
      }

      return returnVal;
    }else {
      // console.log(arguments[0]);
    }
  };

  if (window['angular'] === undefined) {
    sap.designstudio.sdk.PropertyPage.instance.init();
  }
  
  /*ds_openPropertyDialog = function(propertyName) {//jshint ignore:line
    var type = propertyBank[propertyName].type;
    if (type == 'colorpicker' || type == 'dynamiccolorpicker') {
      currentColorProp = propertyName;
      $('#colorcontainer').show();
    }
  };*/

  receive = function( value) {//jshint ignore:line
    data = value;
    // setTimeout(setInitialValues, 1000);
    setInitialValues();
  };

  var initialvaluesTriggered = false;
  function setInitialValues() {//jshint ignore:line
  //  if (data.id == sap.designstudio.sdk.PropertyPage.instance.sid + '_1_control') {
      if (!initialvaluesTriggered) {
        if(data.result){
          delete data.result;
        }
        //dataDup.result= JSON.parse(JSON.stringify(data.result).replace('-','').replace('&',''))
        //_.each(data,function(property,value){
          
           ds_setPropertyValues(data); //jshint ignore:line
        //});
       //jshint ignore:line
        initialvaluesTriggered = true;
      }
    }
 }
