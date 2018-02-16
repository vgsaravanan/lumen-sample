/* Script imported from http://www.destinationxl.com/ver-20171228190945/media/global/scripts/locateStore.js */
aFeoOverrideAttrRead("script","src");var map;var storeLocatorMap;var infoWindow;var markersArray=[];var geocoder;var fromPDPPage=false;function load(latlng,requestType){$("#brands-wrap").removeClass("sticky-wrap");$("#brands").removeClass("sticky");$("#miniCart").removeClass("sticky-cart");$("#header-block").removeClass("sticky-block");$("#headerContent").removeClass("sticky-content-background");if(document.getElementById){geocoder=new google.maps.Geocoder();var bounds=new google.maps.LatLngBounds();var mapCenter=new google.maps.LatLng(52,-115);var zoomLevel=4;if(!latlng){}else{zoomLevel=8;mapCenter=new google.maps.LatLng(latlng.lat(),latlng.lng());if(requestType=="ISPU"){$("#ispu_storeInventorySearchOptions").css("display","none");$("#ispu_storeInventorySideBar").css("display","inline");}else{if(requestType=="ISPUModal"){$("#storeLocatorSearchOptions").css("display","none");$("#storeLocatorSideBar").css("display","inline");$("#storeLocatorMap").css("display","inline");}else{$("#storeInventorySearchOptions").css("display","none");$("#storeInventorySideBar").css("display","inline");$("#storeInventoryItemDisplay").css("display","none");$("#storeInventoryMap").css("display","inline");}}$("#horizontalSeparator").css("display","none");if($("#map").length>0){google.maps.event.trigger(map,"resize");}if($("#storeLocator_map").length>0){google.maps.event.trigger(storeLocatorMap,"resize");}}createInitialMap(mapCenter,zoomLevel,requestType,requestType);}}function createInitialMap(mapCenter,zoomLevel){var myOptions={zoom:zoomLevel,center:mapCenter,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.ROADMAP};if($("#map").length>0){map=new google.maps.Map(document.getElementById("map"),myOptions);}if($("#storeLocator_map").length>0){storeLocatorMap=new google.maps.Map(document.getElementById("storeLocator_map"),myOptions);}infoWindow=new google.maps.InfoWindow();}function setPDPModelSkuAttributeText(){var skuAttrSelected="";var skuAttributesString=$("#skuAttributesSpanStrInv").text();var arr=skuAttributesString.split("@");if(arr.length>0){var i;for(i=0;i<arr.length;++i){var currentAttr=arr[i].split("=");if(currentAttr.length>0&&currentAttr[0]!=""){if(currentAttr[0]=="pantLength"){var currentId="#"+currentAttr[0]+"_text";$(currentId).remove();skuAttrSelected=skuAttrSelected+"<span id='"+currentAttr[0]+"_text' class='noTextWrap'><span class='ispuModalAttributeMargin'>INSEAM:</span><span class='ispuModalAttributeValue'>"+currentAttr[1]+"</span></span>";}else{if(currentAttr[0]=="color"){}else{var currentId="#"+currentAttr[0]+"_text";$(currentId).remove();skuAttrSelected=skuAttrSelected+"<span id='"+currentAttr[0]+"_text' class='noTextWrap'><span class='ispuModalAttributeMargin'>"+currentAttr[0]+":</span><span class='ispuModalAttributeValue'>"+currentAttr[1]+"</span></span>";}}}}}skuAttrSelected="<span id='ispuModalSkuAttrFirstLine'>"+$("#ispuModalSkuAttrFirstLine").html()+skuAttrSelected+"</span>";$("#ispuModalSkuAttributesHeader").html(skuAttrSelected);}function validateSelectedSkuAttributes(requestType){var skuAttributesString=$("#skuAttributesSpanStrInv").text();var hemmingLengthString=$("#hemmingLengthStrInv").val();var requiredAttributesString=$("#requiredAttributes").val();var productId=$("#productId").val();$.ajax({async:false,type:"POST",url:"/mens-big-and-tall-store/catalog/includes/checkSkuSelectedAttributes.jsp",data:{productId:productId,skuAttributes:skuAttributesString,hemmingLength:hemmingLengthString,requiredAttributes:requiredAttributesString},success:function(data){if(data==null||data.missingAttributes==undefined){if(data.skuId!=undefined){$("#storeCartSkuId").text(data.skuId);if(requestType=="ISPU"){$("#addToCartErrorMessage").text("");setPDPModelSkuAttributeText();$("#fb_pdp_storelocator_verify_link").click();return true;}}}else{$("#storeCartSkuId").text("");if(requestType=="ISPU"){if((data.missingAttributes=="inseam, color"||data.missingAttributes=="inseam")&&$("#hemmingLength").val()!=""){$(".inStock").hide();$(".outOfStock").hide();$('input[name="shipToStore"]').attr("disabled",true);setPDPModelSkuAttributeText();$("#fb_pdp_storelocator_verify_link").click();return true;}else{if(data.missingAttributes=="color"){$(".inStock").hide();$(".outOfStock").hide();$('input[name="shipToStore"]').attr("disabled",true);setPDPModelSkuAttributeText();$("#fb_pdp_storelocator_verify_link").click();return true;}else{var missingAttr=data.missingAttributes;missingAttr=missingAttr.replace("color","");if(missingAttr.substring(missingAttr.length-2,missingAttr.length-1)==","){missingAttr=missingAttr.substring(0,missingAttr.length-2);}var errorMessage="<b><font color='red'>Please select "+missingAttr+"</b></font>";$("#addToCartErrorMessage").html(errorMessage);$("#addToCartErrorMessage").show();}}}else{var errorMessage="Please select "+data.missingAttributes;$("#pqv-errorMessages").text(errorMessage);$("#pqv-errors").css("visibility","visible");$("#pqv-errorMessages").css("visibility","visible");}return false;}},dataType:"json"});if((!$("#storeCartSkuId").text().length)){return false;}return true;}function validateStoreLocatorFieldsForStoreInventory(){var status=validateSelectedSkuAttributes();if(status==false){return false;}validateStoreLocatorFields();}function validateStoreLocatorFieldsForInStorePickupInventory(){validateStoreLocatorFields("ISPU");}function validateSelectedStore(requestType){var selectedstore="";if(requestType=="ISPU"){if($("#ispu_dxl").is(":checked")){var dxlstore=document.getElementById("ispu_dxl");dxlstore.value="Destination XL";selectedstore="Destination XL";}if($("#ispu_rbt").is(":checked")){var rbtstore=document.getElementById("ispu_rbt");rbtstore.value="Rochester Clothing";if(selectedstore){selectedstore=selectedstore+","+"Rochester Clothing";}else{selectedstore="Rochester Clothing";}}if($("#ispu_cmxl").is(":checked")){var cmxlstore=document.getElementById("ispu_cmxl");cmxlstore.value="Casual Male XL";if(selectedstore){selectedstore=selectedstore+","+"Casual Male XL";}else{selectedstore="Casual Male XL";}}}else{if(requestType=="ISPUModal"){if($("#ispu_modal_dxl").is(":checked")){var dxlstore=document.getElementById("ispu_modal_dxl");dxlstore.value="Destination XL";selectedstore="Destination XL";}if($("#ispu_modal_rbt").is(":checked")){var rbtstore=document.getElementById("ispu_modal_rbt");rbtstore.value="Rochester Clothing";if(selectedstore){selectedstore=selectedstore+","+"Rochester Clothing";}else{selectedstore="Rochester Clothing";}}if($("#ispu_modal_cmxl").is(":checked")){var cmxlstore=document.getElementById("ispu_modal_cmxl");cmxlstore.value="Casual Male XL";if(selectedstore){selectedstore=selectedstore+","+"Casual Male XL";}else{selectedstore="Casual Male XL";}}}else{if($("#dxl").is(":checked")){var dxlstore=document.getElementById("dxl");dxlstore.value="Destination XL";selectedstore="Destination XL";}if($("#rbt").is(":checked")){var rbtstore=document.getElementById("rbt");rbtstore.value="Rochester Clothing";if(selectedstore){selectedstore=selectedstore+","+"Rochester Clothing";}else{selectedstore="Rochester Clothing";}}if($("#cmxl").is(":checked")){var cmxlstore=document.getElementById("cmxl");cmxlstore.value="Casual Male XL";if(selectedstore){selectedstore=selectedstore+","+"Casual Male XL";}else{selectedstore="Casual Male XL";}}}}if(requestType=="ISPU"){if($("#guestSelectedStoreType").length>0){$("#guestSelectedStoreType").html(selectedstore);}}else{if(selectedstore==""){selectedstore="Destination XL,Rochester Clothing,Casual Male XL";}}return selectedstore;}function validateStoreLocatorFields(requestType){var selectedstore=validateSelectedStore(requestType);var zipcodeObj=document.getElementById("store_zipcode");var cityObj=document.getElementById("store_city");var stateObj=document.getElementById("store_state");var storedxlObj=document.getElementById("dxl");var storerbtObj=document.getElementById("rbt");var storecmxlObj=document.getElementById("cmxl");if(requestType=="ISPU"){zipcodeObj=document.getElementById("ispu_store_zipcode");cityObj=document.getElementById("ispu_store_city");stateObj=document.getElementById("ispu_store_state");storedxlObj=document.getElementById("ispu_dxl");storerbtObj=document.getElementById("ispu_rbt");storecmxlObj=document.getElementById("ispu_cmxl");}else{if(requestType=="ISPUModal"){zipcodeObj=document.getElementById("ispu_modal_store_zipcode");cityObj=document.getElementById("ispu_modal_store_city");stateObj=document.getElementById("ispu_modal_store_state");storedxlObj=document.getElementById("ispu_modal_dxl");storerbtObj=document.getElementById("ispu_modal_rbt");storecmxlObj=document.getElementById("ispu_modal_cmxl");}}var errorMsg="";var zipcode="";var city="";var state="";if((null!=zipcodeObj)&&(zipcodeObj.value=="Enter a ZIP Code"||zipcodeObj.value=="Enter your City & State or ZIP Code"||zipcodeObj.value=="")){if(((null!=cityObj)&&(cityObj.value!=""&&cityObj.value!="Enter a City"))&&((null!=stateObj)&&stateObj.value!=""&&stateObj.value!="Select a State")){}else{if(requestType=="ISPU"){$("#ispu_pqv-errorMessages").text($("#ispu_zipcodeOrCity_empty_msg").text());$("#ispu_pqv-errors").css("visibility","visible");$("#ispu_pqv-errors").css("display","block");}else{if(requestType=="ISPUModal"){$("#ispu_modal_pqv-errorMessages").text("Please enter a valid Zip Code with 5 digits");$("#ispu_modal_pqv-errors").css("visibility","visible");}else{if($("#pqv-errorMessages").length>0){$("#pqv-errorMessages").text("Please enter a valid Zip Code with 5 digits");$("#pqv-errors").css("visibility","visible");}else{alert("Please enter the Zip Code or City and State fields.");}}}return false;}}if(requestType!="ISPU"){if((null!=zipcodeObj)&&((zipcodeObj.value!="Enter a ZIP Code")&&zipcodeObj.value&&isNaN(zipcodeObj.value))){if(requestType=="ISPUModal"){$("#ispu_modal_pqv-errorMessages").text("Please enter Only Numeric values for Zip Code");$("#ispu_modal_pqv-errors").css("visibility","visible");}else{if($("#pqv-errorMessages").length>0){$("#pqv-errorMessages").text("Please enter Only Numeric values for Zip Code");$("#pqv-errors").css("visibility","visible");}else{alert("Please enter Only Numeric values for Zip Code");}}return false;}else{if((null!=zipcodeObj)&&((zipcodeObj.value!="Enter a ZIP Code")&&(zipcodeObj.value.length)!=5&&zipcodeObj.value)){if(requestType=="ISPUModal"){$("#ispu_modal_pqv-errorMessages").text("Please enter a valid Zip Code with 5 digits");$("#ispu_modal_pqv-errors").css("visibility","visible");}else{if($("#pqv-errorMessages").length>0){$("#pqv-errorMessages").text("Please enter a valid Zip Code with 5 digits");$("#pqv-errors").css("visibility","visible");}else{alert("Please enter a valid Zip Code with 5 digits.");}}return false;}}if((null!=cityObj&&cityObj.value==""&&cityObj.value=="Enter a City")||(null!=stateObj&&stateObj.value==""&&stateObj.value=="Select a State")){if(requestType=="ISPUModal"){$("#ispu_modal_pqv-errorMessages").text("Please enter the Address fields");$("#ispu_modal_pqv-errors").css("visibility","visible");}else{if($("#pqv-errorMessages").length>0){$("#pqv-errorMessages").text("Please enter the Address fields");$("#pqv-errors").css("visibility","visible");}else{alert("Please enter the Address fields.");}}return false;}}if(null!=zipcodeObj){zipcode=zipcodeObj.value;}if(null!=cityObj){city=cityObj.value;}if(null!=stateObj){state=stateObj.value;}if(requestType=="ISPU"){if($("#guestSelectedZipCode").length>0){$("#guestSelectedZipCode").html(zipcode);}if((null!=zipcodeObj)&&((zipcodeObj.value!="Enter your City & State or ZIP Code")&&zipcodeObj.value&&isNaN(zipcodeObj.value))){var arr=zipcodeObj.value.split(",");if((arr!="null"&&arr.length!=2)){$("#ispu_pqv-errorMessages").text("Please enter a valid City, State");$("#ispu_pqv-errors").css("visibility","visible");$("#ispu_pqv-errors").css("display","block");return false;}else{zipcode="Enter a ZIP Code";city=arr[0];state=arr[1];}}else{if((null!=zipcodeObj)&&((zipcodeObj.value!="Enter your City & State or ZIP Code")&&(zipcodeObj.value.length)!=5&&zipcodeObj.value)){$("#ispu_pqv-errorMessages").text("Please enter a valid Zip Code with 5 digits");$("#ispu_pqv-errors").css("visibility","visible");$("#ispu_pqv-errors").css("display","block");return false;}}}$("#marketing").hide();$("#storeLocatorSideBar").find("#checkout-continue").show();$("#checkout-continue-bottom").show();searchLocations(zipcode,city,state,selectedstore,requestType);}function searchLocations(zipcode,city,state,selectedstore,requestType){if(zipcode!="Enter a ZIP Code"){var address1=zipcode;}else{var address1=city+" , "+state;}geocoder.geocode({"address":address1},function(response,param2){if(!response||response.length<1){addressNotFound(address1);if(requestType=="ISPUModal"){$("#ispu_modal_pqv-errorMessages").text("Unable to find your address: "+address1);$("#ispu_modal_pqv-errors").css("visibility","visible");$("#ispu_modal_pqv-errors").show();}else{if(requestType=="ISPU"){$("#ispu_pqv-errorMessages").text("Unable to find your address: "+address1);$("#ispu_pqv-errors").css("visibility","visible");$("#ispu_pqv-errors").show();}else{alert(address1+" not found");return false;}}}else{if(requestType=="ISPU"){$("#ispu_pqv-errorMessages").html("");$("#ispu_pqv-errors").css("visibility","hidden");}else{if(requestType=="ISPUModal"){$("#storeLocator_googlemap").show();$("#ispu_modal_pqv-errorMessages").html("");$("#ispu_modal_pqv-errors").css("visibility","hidden");}else{$("#googlemap").show();$("#pqv-errorMessages").html("");$("#pqv-errors").css("visibility","hidden");}}load(response[0].geometry.location,requestType);var storeSkuId="";if(requestType==undefined){if($("#storeCartSkuId").length>0){if($.trim($("#storeCartSkuId").html())!=""){storeSkuId=$("#storeCartSkuId").html();}}}else{if(requestType=="ISPU"){if($("#ispuCartSkuId").length>0){if($.trim($("#ispuCartSkuId").html())!=""){storeSkuId=$("#ispuCartSkuId").html();}}}else{if($("#reqSkuId").length>0){if($.trim($("#reqSkuId").val())!=""){storeSkuId=$("#reqSkuId").val();}}}}var showOutOfStockStores="false";if(null!=storeSkuId&&$.trim(storeSkuId)!=""){showOutOfStockStores="true";}searchLocationsNear(response[0].geometry.location,address1,selectedstore,storeSkuId,requestType,"false",showOutOfStockStores);}});}function initializeMapLocation(address1,requestType,bounds,markers,skuId,startaddress,isFromShipping,sidebar){geocoder.geocode({"address":address1},function(response,param2){if(!response||response.length<1){}else{load(response[0].geometry.location,requestType);return(response[0].geometry.location);}});}function searchInUserPreferedStoreList(skuId,searchFromProfile){var selectedstore=validateSelectedStore();searchLocationsNear("","",selectedstore,skuId,"ISPU",searchFromProfile,"true");}function searchFromUserSelectedStoreList(skuId,searchFromProfile){var selectedstore=validateSelectedStore();searchLocationsNear("","",selectedstore,"","ISPUModal","true","true");}function searchInUserSelectedSearchCriteria(skuId,searchFromProfile){if($("#guestSelectedZipCode").length>0&&$.trim($("#guestSelectedZipCode").html())!=""){var zipcode=$.trim($("#guestSelectedZipCode").html());var storeTypes=$.trim($("#guestSelectedStoreType").html());var userSelectedRadius=$.trim($("#guestSelectedRadius").html());var selectedstore=$.trim($("#guestSelectedStoreType").html());var latitude=$("#guestSelectedLatitude").html();var longitude=$("#guestSelectedLongitude").html();searchLocationsNear("",zipcode,selectedstore,skuId,"ISPU",searchFromProfile,"true",userSelectedRadius,latitude,longitude);}}function searchLocationsNear(center,startaddress,selectedstore,skuId,requestType,searchFromProfile,showOutOfStockStores,userSelectedRadius,latitude,longitude){var radius="200";var radiusSelect="";if(requestType=="ISPU"){radiusSelect=document.getElementById("ispu_radiusSelect").value;}else{if(requestType=="ISPUModal"){radiusSelect=document.getElementById("ispu_modal_radiusSelect").value;}else{radiusSelect=document.getElementById("radiusSelect").value;}}if(radiusSelect!=""&&radiusSelect!="Select Distance"){radius=radiusSelect;}if(requestType=="ISPU"){if(null!=userSelectedRadius&&userSelectedRadius!=""){radius=userSelectedRadius;}if($("#guestSelectedRadius").length>0){$("#guestSelectedRadius").html(radius);}}var fromShipping=window.location.href;var isFromShipping=false;if((fromShipping.indexOf("?fromShipping=1")>0)||(fromShipping.indexOf("shippingAddress_single")>0)){var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+center.lat()+"&lng="+center.lng()+"&radius="+radius+"&selectedstore="+selectedstore+"&fromShipping=1";isFromShipping=true;}else{if(fromShipping.indexOf("?fromShipping=2")>0||(fromShipping.indexOf("shippingAddress_multiple")>0)){var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+center.lat()+"&lng="+center.lng()+"&radius="+radius+"&selectedstore="+selectedstore+"&fromShipping=2";isFromShipping=true;}else{if(fromShipping.indexOf("?fromShipping=3")>0||(fromShipping.indexOf("expressCheckout")>0)){var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+center.lat()+"&lng="+center.lng()+"&radius="+radius+"&selectedstore="+selectedstore+"&fromShipping=3";isFromShipping=true;}else{if(requestType=="ISPU"){if(searchFromProfile==undefined){searchFromProfile="false";}if(center==""){if(null!=latitude&&latitude!=""){var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+latitude+" &lng="+longitude+" &radius="+radius+"&selectedstore="+selectedstore+"&requestType="+requestType+"&searchFromProfile="+searchFromProfile;}else{var userSelectedLatitude=0;var userSelectedLongitude=0;if($("#guestSelectedLatitude").length>0){var userSelectedLatitude=$("#guestSelectedLatitude").text();var userSelectedLongitude=$("#guestSelectedLongitude").text();if(userSelectedLatitude==""||userSelectedLatitude==undefined||userSelectedLongitude==""||userSelectedLongitude==undefined){userSelectedLatitude=0;userSelectedLongitude=0;}}var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+userSelectedLatitude+"&lng="+userSelectedLongitude+"&radius="+radius+"&selectedstore="+selectedstore+"&requestType="+requestType+"&searchFromProfile="+searchFromProfile;}}else{var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+center.lat()+"&lng="+center.lng()+"&radius="+radius+"&selectedstore="+selectedstore+"&requestType="+requestType+"&searchFromProfile="+searchFromProfile;if($("#guestSelectedLatitude").length>0){$("#guestSelectedLatitude").html(center.lat());$("#guestSelectedLongitude").html(center.lng());}}}else{if(null!=requestType&&requestType!=""&&((fromShipping.indexOf("product")>0)||(fromShipping.indexOf("cat")>0)||(fromShipping.indexOf("search")>0))){if(center==""){var userSelectedLatitude=$("#guestSelectedLatitude").text();var userSelectedLongitude=$("#guestSelectedLongitude").text();if(userSelectedLatitude==""||userSelectedLatitude==undefined||userSelectedLongitude==""||userSelectedLongitude==undefined){userSelectedLatitude=0;userSelectedLongitude=0;}var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+userSelectedLatitude+"&lng="+userSelectedLongitude+"&radius="+radius+"&selectedstore="+selectedstore+"&requestType="+requestType+"&searchFromProfile="+searchFromProfile+"&fromISPUModal=true";fromPDPPage=true;}else{var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+center.lat()+"&lng="+center.lng()+"&radius="+radius+"&selectedstore="+selectedstore+"&requestType="+requestType+"&fromISPUModal=true";fromPDPPage=true;}}else{var searchUrl=CONTEXT_ROOT+"/storelocator/storeList.jsp?lat="+center.lat()+"&lng="+center.lng()+"&radius="+radius+"&selectedstore="+selectedstore+"&requestType="+requestType;}}}}}if(skuId!=undefined&&skuId.length>0){searchUrl=searchUrl+"&skuId="+skuId;if(requestType=="ISPU"){}else{if(requestType=="ISPUModal"){storeLocatorMap.setCenter(new google.maps.LatLng(center.lat(),center.lng()),8);mapToUse=storeLocatorMap;}else{map.setCenter(new google.maps.LatLng(center.lat(),center.lng()),8);}}}$.ajax({async:false,type:"POST",url:searchUrl,cache:false,"success":function(data){jQuery(data).find("marker");var markers=jQuery(data).find("marker");var isStockAvailableInStore="false";var storesAvailability=jQuery(data).find("storesAvailability");if(storesAvailability!=null&&storesAvailability.size()>0){isStockAvailableInStore=storesAvailability[0].getAttribute("isStockAvailableInStore");}clearOverlays();var sidebar=document.getElementById("sidebar");var mapToUse=map;if(requestType=="ISPU"){sidebar=document.getElementById("ispu_sidebar");}else{if(requestType=="ISPUModal"){sidebar=document.getElementById("ispu_modal_sidebar");}else{sidebar=document.getElementById("sidebar");}}sidebar.innerHTML="";sidebar.style.fontSize="11px";if(markers.length==0){if(requestType=="ISPU"){$("#ispu_storeInventorySearchOptions").css("display","inline");if(skuId!=undefined&&skuId.length){$("#ispu_pqv-errorMessages").text("Unavailable at stores near you.");}else{$("#ispu_pqv-errorMessages").text("No stores were found near you. ");}$("#ispu_pqv-errors").css("visibility","visible");$("#ispu_pqv-errors").show();$("#availabilityMessage").css("display","none");$("#ispu_sidebar").css("display","none");$("#skuAttrNotSelectedError").css("display","none");$("#ispu_storeInventorySideBar").css("display","none");$("#ispuModalYourStoreHeader").hide();}else{if(requestType=="ISPUModal"){$("#storeLocatorSearchOptions").css("display","inline");if(skuId!=undefined&&skuId.length){$("#ispu_modal_pqv-errorMessages").text("Unavailable at stores near you.");}else{$("#ispu_modal_pqv-errorMessages").text("No stores were found near you.");}$("#ispu_modal_pqv-errors").css("visibility","visible");$("#ispu_modal_pqv-errors").show();$("#availabilityMessage").css("display","none");$("#storeLocatorSideBar").css("display","none");$("#storeLocatorMap").css("display","none");}else{if($("#pqv-errorMessages").length>0){if(null!=startaddress&&startaddress!=""){$("#searchLocationSpan").html("No stores were found near <b>"+startaddress+":</b>");}else{$("#searchLocationSpan").html("No stores were found near you.");}$("#sidebar").css("display","none");}else{$("#sidebar").html("No results found.");$("#sidebar").css("border-bottom","5px solid #D4D0C8");$("#sidebar").css("color","#000000");$("#sidebar").css("font-size","14px");$("#sidebar").css("margin-bottom","10px");$("#sidebar").css("overflow","auto");$("#sidebar").css("padding-bottom","5px");$("#sidebar").css("padding-top","5px");$("#sidebar").show();}$("#availabilityMessage").css("display","none");$("#storeInventorySideBar").css("display","inline");$("#storeInventoryMap").css("display","inline");}}return;}else{if(requestType=="ISPU"){$("#ispu_pqv-errors").css("display","none");$("#skuAttrNotSelectedError").css("display","none");$("#ispu_storeInventorySearchOptions").css("display","none");$("#ispu_storeInventorySideBar").css("display","inline");if(markers.length<3){$("#ispu_sidebar").css("height","auto");}else{$("#ispu_sidebar").css("height","165px");}$("#ispu_sidebar").css("display","inline");$("#ispuModalYourStoreHeader").show();}else{if(requestType=="ISPUModal"){$("#ispu_modal_searchLocationSpan").text($("#ispu_modal_searchLocation_HeaderMsg").text());if(null!=startaddress&&startaddress!=""){$("#ispu_modal_searchLocationSpan").append("<b>"+startaddress+"</b>:");}}else{$("#searchLocationSpan").text("The following stores were found near ");$("#searchLocationSpan").append("<b>"+startaddress+"</b>:");}}}if(requestType!="ISPU"){if(null!=center&&center!=""){var searchPoint=new google.maps.LatLng(center.lat(),center.lng());var purpleIconImage=HOSTED_MEDIA_URL+"/media/global/images/icons/marker_purple.png";if((fromShipping.indexOf("shippingAddress")>0)||(fromShipping.indexOf("express")>0)){$("#fancybox-content").css("height","auto");}var searchMarker=new google.maps.Marker({position:searchPoint,map:mapToUse,icon:purpleIconImage});markersArray.push(searchMarker);google.maps.event.addListener(searchMarker,"click",function(){infoWindow.setContent("You searched for: <b>"+startaddress+"</b>");infoWindow.open(mapToUse,searchMarker);});}var bounds=new google.maps.LatLngBounds();}if(requestType=="ISPUModal"&&center==""&&markers.length>0){var pincode=markers[0].getAttribute("postalcode");$("#ispu_modal_sidebar").html("<b>Please wait. Retrieving store results.</b>");initializeMapLocation(pincode,requestType,bounds,markers,skuId,startaddress,isFromShipping,sidebar);setTimeout(function(){$("#ispu_modal_sidebar").html("");parseStoreXML(requestType,bounds,markers,skuId,startaddress,isFromShipping,sidebar);},2800);}else{if((requestType=="ISPU"&&showOutOfStockStores!="true")){parseStoreXML(requestType,bounds,markers,skuId,startaddress,isFromShipping,sidebar,false);}else{parseStoreXML(requestType,bounds,markers,skuId,startaddress,isFromShipping,sidebar,true);}}}});}function parseStoreXML(requestType,bounds,markers,skuId,startaddress,isFromShipping,sidebar,showAvailability){var storeNumberList="";for(var i=0;i<markers.length;i++){var number=markers[i].getAttribute("number");var name=markers[i].getAttribute("name");var address=markers[i].getAttribute("address");var address2=markers[i].getAttribute("address2");var city=markers[i].getAttribute("city");var state=markers[i].getAttribute("state");var distance=parseFloat(markers[i].getAttribute("distance"));if(requestType!="ISPU"){var point=new google.maps.LatLng(parseFloat(markers[i].getAttribute("lat")),parseFloat(markers[i].getAttribute("lng")));}var postalcode=markers[i].getAttribute("postalcode");var phoneNumber=markers[i].getAttribute("phoneNumber");var hours=markers[i].getAttribute("hours");var available=markers[i].getAttribute("available");if(requestType==undefined&&!skuId.length){available="invalid";}if(requestType!="ISPU"){var marker=createMarker(point,number,name,startaddress,address,address2,city,state,postalcode,phoneNumber,hours,requestType);}var sidebarEntry="";sidebarEntry=createSidebarEntry(sidebar,marker,number,name,address,address2,city,state,distance,postalcode,phoneNumber,hours,available,isFromShipping,requestType);if(requestType!="ISPU"){bounds.extend(point);}storeNumberList=storeNumberList+","+number;}if(requestType=="ISPU"){if($("#changeSelectionMsg").length>0){if($("input[name=shipToStore]:enabled").length>0){$("#changeSelectionMsg").hide();}else{$("#changeSelectionMsg").show();}}if(storeNumberList!=""){$("#userPreferedStoreList").html(storeNumberList);}if($("#ispuCartSkuId").text()==""){$(".inStock").hide();$(".outOfStock").hide();$('input[name="shipToStore"]').attr("disabled",true);}}}function createMarker(point,number,name,startaddress,address,address2,city,state,postalcode,phoneNumber,hours,requestType){var mapToUse=map;if(requestType=="ISPUModal"){mapToUse=storeLocatorMap;}var markerOptions={position:point,map:mapToUse};var marker=new google.maps.Marker(markerOptions);markersArray.push(marker);var prettyHours=URLDecode(hours).replace(/, /gi,"<br />");var html='<div style="padding: 5px;"><b>'+URLDecode(number)+"</b> <br/>"+URLDecode(address)+", "+(address2?URLDecode(address2)+", ":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br />"+getPrettyPhoneNumber(phoneNumber)+"<br/>"+"<br /><b>Hours:</b>"+"<br/>"+prettyHours+"<br/><br/>"+'<a href="http://maps.google.com/maps?saddr='+startaddress+"&daddr="+address+'" target="_blank" style="color:#717930; font-size:10px;text-decoration:underline;font-weight:bold;">Get Directions</a><div>';google.maps.event.addListener(marker,"click",function(){infoWindow.setContent(html);infoWindow.open(mapToUse,marker);});return marker;}function addressNotFound(address){var div=document.createElement("div");var html="Unable to find your address: <b>"+address+"</b>";div.innerHTML=html;return div;}function createSidebarEntryForInstorePickUp(parentElement,marker,number,name,address,address2,city,state,distance,postalcode,phoneNumber,available,showAvailability){var parentDiv=document.createElement("div");parentDiv.style.cssText="cursor: pointer; margin-bottom: 15px; width: 100%; float: left; position: relative;";var itemprop=document.createAttribute("itemprop");itemprop.nodeValue="ClothingStore";parentDiv.setAttributeNode(itemprop);var div=document.createElement("div");div.style.cssText="float: left; width: 60%;margin-top: 3px";var html="";if(null!=distance&&distance!=""&&!isNaN(distance)){html="<b>"+URLDecode(number)+"</b> ("+distance.toFixed(1)+" mi)<br/>"+URLDecode(address)+"<br/>"+(address2?URLDecode(address2)+"<br/>":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br/>"+getPrettyPhoneNumber(phoneNumber);}else{html="<b>"+URLDecode(number)+"</b><br/>"+URLDecode(address)+"<br/>"+(address2?URLDecode(address2)+"<br/>":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br/>"+getPrettyPhoneNumber(phoneNumber);}div.innerHTML=html;parentDiv.appendChild(div);if(showAvailability){var quantityDiv=document.createElement("div");quantityDiv.style.cssText="margin-top: 8px;";if(available=="true"){quantityDiv.innerHTML+='<span class="inStock">In Stock</span>';}else{quantityDiv.innerHTML+='<span class="outOfStock">Out of Stock</span>';}parentDiv.appendChild(quantityDiv);}parentElement.appendChild(parentDiv);}function createSidebarEntry(parentElement,marker,number,name,address,address2,city,state,distance,postalcode,phoneNumber,hours,available,isFromShipping,requestType){if(available=="invalid"){var parentDiv=document.createElement("div");parentDiv.style.cssText="cursor: pointer; margin-bottom: 15px; width: 100%; float: left;";var itemprop=document.createAttribute("itemprop");itemprop.nodeValue="ClothingStore";parentDiv.setAttributeNode(itemprop);var div=document.createElement("div");if(isFromShipping||(fromPDPPage&&requestType=="ISPUModal")){div.style.cssText="float: left; width: 51%";}else{div.style.cssText="float: left; width: 34%";}var html="";if(null!=distance&&distance!=""&&!isNaN(distance)){html="<b>"+URLDecode(number)+"</b> ("+distance.toFixed(1)+" mi)<br/>"+URLDecode(address)+"<br/>"+(address2?URLDecode(address2)+"<br/>":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br/>"+getPrettyPhoneNumber(phoneNumber);}else{html="<b>"+URLDecode(number)+"</b><br/>"+URLDecode(address)+"<br/>"+(address2?URLDecode(address2)+"<br/>":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br/>"+getPrettyPhoneNumber(phoneNumber);}div.innerHTML=html;var hoursDiv=document.createElement("div");var prettyHours=URLDecode(hours).replace(/, /gi,"<br />");hoursDiv.innerHTML="<b>Hours:</b>"+"<br/>"+prettyHours;if(isFromShipping||(fromPDPPage&&requestType=="ISPUModal")){hoursDiv.style.cssText="float: left; width: 49%";}else{hoursDiv.style.cssText="float: left; width: 33%";}if(!isFromShipping){if(!fromPDPPage){var storeDetailsDiv=document.createElement("div");var storeNumber=number.replace(/\D/g,"");storeDetailsDiv.innerHTML='<a href="storeDetails.jsp?storeNumber='+storeNumber+'" style="color: #000000;"><b>More Information</b></a>';storeDetailsDiv.style.cssText="float: right; width: 33%; text-decoration: underline;";}}google.maps.event.addDomListener(parentDiv,"click",function(){google.maps.event.trigger(marker,"click");$(this).find("input[type=radio]").click();});google.maps.event.addDomListener(parentDiv,"mouseover",function(){parentDiv.style.backgroundColor="#ccc";});google.maps.event.addDomListener(parentDiv,"mouseout",function(){parentDiv.style.backgroundColor="#fff";});parentDiv.appendChild(div);parentDiv.appendChild(hoursDiv);if(!isFromShipping){if(!fromPDPPage){parentDiv.appendChild(storeDetailsDiv);}}parentElement.appendChild(parentDiv);}else{var parentDiv=document.createElement("div");if(requestType=="ISPU"){parentDiv.style.cssText="cursor: pointer;padding-top: 5px; margin-bottom: 20px; width: 100%; float: left; position: relative;";}else{parentDiv.style.cssText="cursor: pointer; margin-bottom: 15px; width: 100%; float: left; position: relative;";}var itemprop=document.createAttribute("itemprop");itemprop.nodeValue="ClothingStore";parentDiv.setAttributeNode(itemprop);var div=document.createElement("div");var hoursDiv=document.createElement("div");var prettyHours=URLDecode(hours).replace(/, /gi,"<br />");var html="";if(requestType=="ISPU"){div.style.cssText="float: left; width: 40%";if(null!=distance&&distance!=""&&!isNaN(distance)){html=URLDecode(number)+" ("+distance.toFixed(1)+" mi)";}else{html=URLDecode(number);}div.innerHTML=html;hoursDiv.style.cssText="float: left; width: 30%";hoursDiv.innerHTML=URLDecode(address)+"<br/>"+(address2?URLDecode(address2)+"<br/>":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br/>"+getPrettyPhoneNumber(phoneNumber);parentDiv.appendChild(div);parentDiv.appendChild(hoursDiv);}else{div.style.cssText="float: left; width: 50%";if(null!=distance&&distance!=""&&!isNaN(distance)){html="<b>"+URLDecode(number)+"</b> ("+distance.toFixed(1)+" mi)<br/>"+URLDecode(address)+"<br/>"+(address2?URLDecode(address2)+"<br/>":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br/>"+getPrettyPhoneNumber(phoneNumber);}else{html="<b>"+URLDecode(number)+"</b><br/>"+URLDecode(address)+"<br/>"+(address2?URLDecode(address2)+"<br/>":"")+URLDecode(city)+", "+URLDecode(state)+" "+URLDecode(postalcode)+"<br/>"+getPrettyPhoneNumber(phoneNumber);}hoursDiv.innerHTML="<b>Hours:</b>"+"<br/>"+prettyHours;hoursDiv.style.cssText="display: inline-block; width: 35%";google.maps.event.addDomListener(parentDiv,"click",function(){google.maps.event.trigger(marker,"click");$(this).find("input[type=radio]").click();});google.maps.event.addDomListener(parentDiv,"mouseover",function(){parentDiv.style.backgroundColor="#ccc";});google.maps.event.addDomListener(parentDiv,"mouseout",function(){parentDiv.style.backgroundColor="#fff";});div.innerHTML=html;parentDiv.appendChild(div);parentDiv.appendChild(hoursDiv);}if(requestType==undefined||(requestType!=undefined&&requestType=="ISPU")){var quantityDiv=document.createElement("div");if(requestType!="ISPU"){quantityDiv.innerHTML="<b>Availability:</b>"+"<br/>";quantityDiv.style.cssText="position: absolute; width: 15%; top: 0; right: 10px;";}else{quantityDiv.style.cssText="float: left; width: 15%; top: 0; text-align:center;";}if(available=="true"){quantityDiv.innerHTML+='<span class="inStock">In Stock</span>';}else{quantityDiv.innerHTML+='<span class="outOfStock">Out of Stock</span>';}parentDiv.appendChild(quantityDiv);}parentElement.appendChild(parentDiv);}}function restartStoreInventorySearch(){$("#storeInventorySideBar").css("display","none");$("#storeInventoryMap").css("display","none");$("#f1SelectedErrorMessage").css("display","none");$("#pqv-errors").css("visibility","hidden");$("#horizontalSeparator").css("display","inline");$("#storeInventoryItemDisplay").css("display","inline");$("#storeInventorySearchOptions").css("display","inline");$("#sidebar").css("display","inline");$("#fancybox-content").css("height","auto");}function restartStoreLocatorSearch(){$("#storeLocatorSideBar").css("display","none");$("#storeLocatorMap").css("display","none");$("#f1SelectedErrorMessage").css("display","none");$("#ispu_modal_pqv-errors").css("visibility","hidden");$("#storeLocatorSearchOptions").css("display","inline");$("#ispu_modal_sidebar").css("display","inline");$("#fancybox-content").css("height","auto");}function restartInstorePickupSearch(){$("#ispu_storeInventorySideBar").css("display","none");$("#f1SelectedErrorMessage").css("display","none");$("#ispu_pqv-errors").css("visibility","hidden");$("#ispu_storeInventorySearchOptions").css("display","inline");$("#ispu_sidebar").css("display","inline");$("#skuAttrNotSelectedError").css("display","none");$("#fancybox-content").css("height","auto");}function getPrettyPhoneNumber(phoneNumber){if(phoneNumber.length==10){return"("+URLDecode(phoneNumber.substr(0,3))+") "+URLDecode(phoneNumber.substr(3,3))+"-"+URLDecode(phoneNumber.substr(6,4));}else{return"("+URLDecode(phoneNumber.substr(0,3))+") "+URLDecode(phoneNumber.substr(4,3))+"-"+URLDecode(phoneNumber.substr(8,4));}}function URLDecode(psEncodeString){var lsRegExp=/\+/g;return unescape(String(psEncodeString).replace(lsRegExp," "));}function clearOverlays(){if(markersArray){for(i in markersArray){markersArray[i].setMap(null);}}}function clearOverlaysAndRestoreHeader(){$("#brands-wrap").addClass("sticky-wrap");$("#brands").addClass("sticky");$("#miniCart").addClass("sticky-cart");$("#header-block").addClass("sticky-block");$("#headerContent").addClass("sticky-content-background");if(markersArray){for(i in markersArray){markersArray[i].setMap(null);}}}function setStoreNumberAndEnableAddToBagButton(radio){$("#inStorePickupStoreNumber").val(radio.value);$("#storeNumber").val(radio.value);$(".addISPUSubmit").show();}function constructRedirectURL(){var parentPageURL=window.location.href;parentPageURL=parentPageURL.replace("#","");parentPageURL=parentPageURL.replace("itemAdded=true","itemAdded=false");parentPageURL=parentPageURL.replace("skuId=","oskuId=");if($("#reqSkuId").length>0&&$.trim($("#reqSkuId").val())!=""){$("#redirectISPUSuccessURL").val(parentPageURL+"&skuId="+$("#reqSkuId").val());}else{$("#redirectISPUSuccessURL").val(parentPageURL);$("#ispu_shopByInstorePickup").val("true");}$("#ispu_modal_sidebar input:checked").each(function(){if(this.checked){if($.trim($("#ispu_selectedStore").val())!=""){var selectedStoreList=$("#ispu_selectedStore").val();if(selectedStoreList.indexOf(this.value)<0){$("#ispu_selectedStore").val(selectedStoreList+"@"+this.value);}}else{$("#ispu_selectedStore").val(this.value);}}});}function setRequiredfieldsAndSubmit(){if(($("#ispuCartSkuId").length>0)&&($.trim($("#ispuCartSkuId").html())=="")){$("#ispu_pqv-errorMessages").text("Please select a color");$("#ispu_pqv-errors").css("visibility","visible");$("#ispu_pqv-errors").css("display","block");}else{if($("#inStorePickupStoreNumber").val()==""){$("#ispu_pqv-errorMessages").text("Please select a store");$("#ispu_pqv-errors").css("visibility","visible");$("#ispu_pqv-errors").css("display","block");}else{$("#ispu_pqv-errorMessages").text("");$("#ispu_pqv-errors").css("visibility","hidden");$("#skuAttributesSpan").text($("#skuAttributesSpanStrInv").html());$("#reqSkuId").val($("#ispuCartSkuId").html());$("#add-cart-ispu-submit").click();}}}function refreshSearchResults(){$("#ispu_modal_find-submit").click();}