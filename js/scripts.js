          const element1 = document.getElementById("myBar1");
		  const element2 = document.getElementById("hiddenElement");
          let width = 0 , intervalIds = []  ;
		  let str_1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:", 
			  str_2="2449", 
			  str_3=":STOCK&quote=1" 
			  ajaxURL= str_1 + str_2 + str_3
			  s01_val="0" ; 				  
          window.addEventListener('load',function(){
	    // document.getElementById('hiddenElement').classList.add('displayElementYN');
		  if (!element2.style.displayElementYN ) { 
				console.log("NNN") ;
			  //  element2.classList.add('displayElementYN');
				element2.style.display = 'none';
				console.log(element2.style.display) ;
			   }
            else 
			{ 
              // console.log(element2.style.display) ;
		    }
		  getDATA();
          getWDATA();
          element1.style.width = '0%';  
          document.getElementById("s01").addEventListener("change", refreshTime); 
          document.getElementById("s02").addEventListener("change", optionSel); 			  
          });
		                              
          function refreshTime() {
             switch ( $(this).val()) {
                      case "0": 
                          width = 100;
						  refSec = 99999 ;
                       	  element1.style.width = '0%'; 
                          break;
                      case "1": 
                      	  refSec = 3000 ;
                           break;
                      case "2":
                           refSec = 5000 ;
                           break;
                      case "3": 
                           refSec = 10000 ;
                           break;
                      case "4": 
                      	   refSec = 20000 ;
                           break;
                      case "5": 
                      	   refSec = 30000 ;
                           break;
                      case "6": 
                    	   refSec = 60000 ;
                           break;
                      case "7": 
                   	      refSec = 600000 ;
                           break; 
                      case "8": 
                          refSec = 900000 ;
                           break;
                      case "9": 
                    	   refSec = 1200000 ;
                           break;
                      case "10": 
                   	      refSec = 1800000 ;
                          break;                                     
                      default:
                         return;
                    } 
                   str_2=document.getElementById("s02").value ;
				   while(intervalIds.length){
                          clearInterval(intervalIds.pop());
                    }
				   if  (refSec != 99999 ) {
				       id = setInterval(getDATA,refSec);
				       intervalIds.push(id); 
					 }
					 else 
					 {
				        while(intervalIds.length){
                          clearInterval(intervalIds.pop());
                        }
						
					 }

            }
			
          function optionSel() {
			 s01_val=document.getElementById("s01").value ;
			 switch ( s01_val ) {
                      case "0": 
                          width = 100;
						  refSec = 99999 ;
                       	  element1.style.width = '0%'; 
                          break;
                      case "1": 
                      	  refSec = 3000 ;
                           break;
                      case "2":
                           refSec = 5000 ;
                           break;
                      case "3": 
                           refSec = 10000 ;
                           break;
                      case "4": 
                      	   refSec = 20000 ;
                           break;
                      case "5": 
                      	   refSec = 30000 ;
                           break;
                      case "6": 
                    	   refSec = 60000 ;
                           break;
                      case "7": 
                   	      refSec = 600000 ;
                           break; 
                      case "8": 
                          refSec = 900000 ;
                           break;
                      case "9": 
                    	   refSec = 1200000 ;
                           break;
                      case "10": 
                   	      refSec = 1800000 ;
                          break;                                     
                      default:
                         return;
                    } 
					
                   str_2= $(this).val() ;
				   getDATA();
                 //  str_2=document.getElementById("s02").value ;
				   while(intervalIds.length){
                          clearInterval(intervalIds.pop());
                    }
				   if  (refSec != 99999 ) {
				       id = setInterval(getDATA,refSec);
				       intervalIds.push(id); 
					 }
					 else 
					 {
				        while(intervalIds.length){
                          clearInterval(intervalIds.pop());
                        }
						
					 }

            }			
			
                     
          function getDATA() {
           	   var d = new Date();
               $('#date1').html((d.getMonth()+1) + '/' + d.getDate() + '&nbsp;' + d.getHours() + ':'  + d.getMinutes());
               if (width === 100 ) {
				   width = 0; 
                   } else {
                    width += 7 ;
                   if (width > 95) width = width-95 ; 
                      element1.style.width = width + '%'; 
                   } 
				           	
                $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:2330:STOCK&quote=1',function(data){
                    // console.log('success');
                  $.each(data,function(key1,item1){
                     if (key1 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');
                    var itemData = item1 , span_rpt="<span class='span_rpt'>(<button onclick='showElement();'>M</button>)</span><span class='span_rpt'>(<a href='./revenueS.json'>S</a>)</span><span class='span_rpt'>(<a href='./revenueY.json'>Y</a>)</span>" ; 	          
                    $.each(itemData,function(key2,item2){
                    	if (key2  === 'quote' ) {
                    		  var itemData2 = item2;
                    		//  console.log(itemData2); 	
                    		  $.each(itemData2,function(key3,item3){  
                             if (key3 === '200009') {
                 	           $("#span11").html(item3 + span_rpt); 
                             }
                             if (key3 === '6') {
                 	           $("#span12").html(item3);}
                             if (key3 === '11') {
                             	  if (item3> 0) 
                             	      {
                             	       	$("#span12").addClass("risePrice"); 
                             	       	$("#span13").addClass("risePrice"); 
                             	       // $("#span13").html("???" +???item3); 	
                             	      } 
                             	  else {
                             	  	 if (item3 === 0){ 
                             	  	 	 $("#span12").addClass("flatPrice"); 
                             	       $("#span13").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#span12").addClass("fellPrice"); 
                             	       $("#span13").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#span13").html(item3); 
                             } 
                             if (key3 === '12') {
                 	               $("#span14").html(item3); 
                             }
                             if (key3 === '13') {
                 	               $("#span15").html(item3); 
                             } 
                        }) ;                 		
                    	}
                     });
                   //  console.log(item1[0]);
                       if ($("#span14").html() >= $("#span12").html() - $("#span13").html())
                       {
                       	  $("#span14").addClass("highestPrice");
                       }  
                       else {
                       	  $("#span14").addClass("lowestPrice");
                       }
                       if ($("#span15").html() >= $("#span12").html() - $("#span13").html())
                       {
                       	  $("#span15").addClass("highestPrice");
                       }  
                       else {
                       	  $("#span15").addClass("lowestPrice");
                       }                  
                  }
                 });
                });     
                     
              //  2nd stock section  
                 $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:2317:STOCK&quote=1',function(data){
                    // console.log('success');
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');                   	
                    var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;
                    		 // console.log(itemData21); 	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
                 	              $("#span21").html(item31); 
                             }
                             if (key31 === '6') {
                 	              $("#span22").html(item31); 
                             }
                             if (key31 === '11') {
                             	  if (item31> 0) 
                             	      {
                             	       	$("#span22").addClass("risePrice"); 
                             	       	$("#span23").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item31 === 0){ 
                             	  	 	  $("#span22").addClass("flatPrice"); 
                             	        $("#span23").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#span22").addClass("fellPrice"); 
                             	       $("#span23").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#span23").html(item31); 
                             } 
                             if (key31 === '12') {
                 	               $("#span24").html(item31); 
                             }
                             if (key31 === '13') {
                 	               $("#span25").html(item31); 
                             } 
                        }) ;                 		
                    	}
                     });
                   //  console.log(item1[0]);
                       if ($("#span24").html() >= $("#span22").html() - $("#span23").html())
                          {
                       	    $("#span24").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span24").addClass("lowestPrice");
                          }
                       if ($("#span25").html() >= $("#span22").html() - $("#span23").html())
                          {
                       	  $("#span25").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span25").addClass("lowestPrice");
                       }                  
                  }
                 });
                });    
            //  Ending 2nd stock section 
            //  3rd stock section   
                 $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:2347:STOCK&quote=1',function(data){
                    // console.log('success');
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');                   	
                    var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;
                    		 // console.log(itemData21); 	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
                 	              $("#span31").html(item31); 	
                             }
                             if (key31 === '6') {
                 	              $("#span32").html(item31); 
                             }
                             if (key31 === '11') {
                             	  if (item31> 0) 
                             	      {
                             	       	$("#span32").addClass("risePrice"); 
                             	       	$("#span33").addClass("risePrice"); 
                             	       // $("#span13").html("???" +???item3); 	
                             	      } 
                             	  else {
                             	  	 if (item31 === 0){ 
                             	  	 	  $("#span32").addClass("flatPrice"); 
                             	        $("#span33").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#span32").addClass("fellPrice"); 
                             	       $("#span33").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#span33").html(item31); 
                             } 
                             if (key31 === '12') {
                 	               $("#span34").html(item31); 
                             }
                             if (key31 === '13') {
                 	               $("#span35").html(item31); 
                             } 
                        }) ;                 		
                    	}
                     });
                   //  console.log(item1[0]);
                       if ($("#span34").html() >= $("#span32").html() - $("#span33").html())
                          {
                       	    $("#span34").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span34").addClass("lowestPrice");
                          }
                       if ($("#span35").html() >= $("#span32").html() - $("#span33").html())
                          {
                       	  $("#span35").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span35").addClass("lowestPrice");
                       }                  
                  }
                 });
                });    
              //  Ending 3rd stock section 
              //  4th stock section   
                 $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:2330:STOCK&quote=1',function(data){
                    // console.log('success');
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');                   	
                    var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;
                    		 // console.log(itemData21); 	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
                 	              $("#tsmc1").html(item31); 	
                             }
                             if (key31 === '6') {
                 	              $("#tsmc2").html(item31); 
                             }
                             if (key31 === '11') {
                             	  if (item31> 0) 
                             	      {
                             	       	$("#tsmc2").addClass("risePrice"); 
                             	       	$("#tsmc3").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item31 === 0){ 
                             	  	 	$("#tsmc2").addClass("flatPrice"); 
                             	        $("#tsmc3").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	   $("#tsmc2").addClass("wi-fellPrice"); 
                             	       $("#tsmc3").addClass("wi-fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#tsmc3").html(item31); 
                             } 
                             if (key31 === '12') {
                 	               $("#tsmc4").html(item31); 
                             }
                             if (key31 === '13') {
                 	               $("#tsmc5").html(item31); 
                             } 
                        }) ;                 		
                    	}
                     });
                   //  console.log(item1[0]);
                       if ($("#tsmc4").html() >= $("#tsmc2").html() - $("#tsmc3").html())
                          {
                       	    $("#tsmc4").addClass("highestPrice");
                          }  
                       else {
                       	  $("#tsmc4").addClass("lowestPrice");
                          }
                       if ($("#tsmc5").html() >= $("#tsmc2").html() - $("#tsmc3").html())
                          {
                       	  $("#tsmc5").addClass("highestPrice");
                          }  
                       else {
                       	  $("#tsmc5").addClass("lowestPrice");
                       }                  
                  }
                 });
                });    
              //  Ending 4th stock section                            
              //  Weighed index  section   
                 $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN',function(data){
                    // console.log('success');
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');                   	
                    var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
                      if (key21  === 'o' ){
                    	   $("#wi-o").html(item21 + 'O' ); 
                      	}
                    	if (key21  === 'h' ){
                    	   $("#wi-h").html(item21 + 'H' ); 
                    	 	}
                    	if (key21  === 'l' ){
                    	   $("#wi-l").html(item21 + 'L'); 
                    	 	}
                    	if (key21  === 'c' ){
                    	   $("#wi-c").html(item21 + 'C' );                     	                   	 	
                    	}
                    	
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;
                    		 // console.log(itemData21); 	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
                             //		$("#wi-t").addClass("wi-t"); 
                 	           //   $("#wi-t").html(item31); 
                             }
                             if (key31 === '11') {
                             	  if (item31> 0) 
                             	      {
                             	       	$("#wi-d").addClass("wi-risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item31 === 0){ 
                              	  	  $("#wi-d").addClass("wi-flatPrice");                             	  	 		
                             	  	 }
                             	  	 else {

                             	       $("#wi-d").addClass("wi-fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#wi-d").html(item31); 
                             } 
                        }) ;                 		
                    	}
                     });
                   //  console.log(item1[0]);
                       if ($("#span24").html() >= $("#span22").html() - $("#span23").html())
                          {
                       	    $("#span24").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span24").addClass("lowestPrice");
                          }
                       if ($("#span25").html() >= $("#span22").html() - $("#span23").html())
                          {
                       	  $("#span25").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span25").addClass("lowestPrice");
                       }                  
                  }
                 });
                });    
              //  Ending Weighed index section   
              //  Option selected index  section
			 if (str_2 !="0") {
				 ajaxURL=str_1 + str_2 + str_3 ;
              //  console.log(ajaxURL);		 
                 $.getJSON(ajaxURL,function(data){
                    // console.log('success');
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');                   	
                    var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;
                    		 // console.log(itemData21); 	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
                 	              $("#op11").html(item31); 
                             }
                             if (key31 === '6') {
                 	              $("#op12").html(item31); 
                             }
                             if (key31 === '11') {
                             	  if (item31> 0) 
                             	      {
                             	       	$("#op12").addClass("risePrice"); 
                             	       	$("#op13").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item31 === 0){ 
                             	  	 	$("#op12").addClass("flatPrice"); 
                             	        $("#op13").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	  $("#op12").addClass("fellPrice"); 
                             	       $("#op13").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#op13").html(item31); 
                             } 
                             if (key31 === '12') {
                 	               $("#op14").html(item31); 
                             }
                             if (key31 === '13') {
                 	               $("#op15").html(item31); 
                             } 
                        }) ;                 		
                    	}
                     });
                   //  console.log(item1[0]);
                       if ($("#op14").html() >= $("#op12").html() - $("#op13").html())
                          {
                       	    $("#op14").addClass("highestPrice");
                          }  
                       else {
                       	  $("#op14").addClass("lowestPrice");
                          }
                       if ($("#op15").html() >= $("#op12").html() - $("#op13").html())
                          {
                       	  $("op15").addClass("highestPrice");
                          }  
                       else {
                       	  $("#op15").addClass("lowestPrice");
                       }                  
                  }
                 });
                });  					
				}			
              //  Ending Option selected index section  
               };  
               
                   
          function getWDATA() {
               /*
                if (firstVisit === false) {
                   document.getElementById("s01").addEventListener("change", myFunction);   
                } 
               */              	
                $.getJSON('https://ws.api.cnyes.com/ws/api/v3/universal/quote?type=IDXMAJOR&column=B&page=2&limit=10',function(data){
                    // console.log('success');
                  $.each(data,function(key1,item1){
                     if (key1 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');
                    var itemData = item1; 	          
                    $.each(itemData,function(key2,item2){
                    	if (key2  === 'items' ) {
                    		  var itemData2 = item2;
                    		  var itemDataTemp ;
                    		//  Dowjon - starting
                    		  $.each(itemData2[3],function(key3,item3){
                            if (key3 === '6') {
                 	           itemDataTemp = item3 ;
                 	            }
                    		if (key3 === '200009') {
                    		  	$("#dowjon").html(item3 + '<BR>' + itemDataTemp );
                             }   
                             if (key3 === '11') {
                 	              $("#dowjon-p").html(item3);                             	
                             	  if (item3> 0) 
                             	      {
                             	       	$("#dowjon-p").addClass("risePrice"); 
                             	       	$("#dowjon-p").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item3 === 0){ 
                             	  	 	 $("#dowjon-p").addClass("flatPrice"); 
                             	       $("#dowjon-p").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#dowjon-p").addClass("fellPrice"); 
                             	       $("#dowjon-p").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             } 
                        }) ; 
                    		//  Dowjon - Ending  
                    		//  Nasdaq - starting
                    		  $.each(itemData2[5],function(key3,item3){
                    		  	if (key3 === '6') {
                 	              itemDataTemp = item3 ;
                 	            }
                    		  	if (key3 === '200009') {
                    		  		  $("#nasdaq").html(item3 + '<BR>' + itemDataTemp );
                             }   
                            if (key3 === '11') {
                  	            $("#nasdaq-p").html(item3);                              	
                             	  if (item3> 0) 
                             	      {
                             	       	$("#nasdaq-p").addClass("risePrice"); 
                             	       	$("#nasdaq-p").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item3 === 0){ 
                             	  	 	 $("#nasdaq-p").addClass("flatPrice"); 
                             	       $("#nasdaq-p").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#nasdaq-p").addClass("fellPrice"); 
                             	       $("#nasdaq-p").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             } 
                        }) ; 
                    		//  Nasdaq - Ending  
                    		//  Sp500 - starting
                    		  $.each(itemData2[5],function(key3,item3){
                    		  	 if (key3 === '6') {
                 	              itemDataTemp = item3 ;
                 	            }
                    		  	 if (key3 === '200009') {
                    		  		  $("#sp500").html(item3 + itemDataTemp );
                             } 
                             if (key3 === '11') {
                  	            $("#sp500-p").html(item3);                              	
                             	  if (item3> 0) 
                             	      {
                             	       	$("#sp500-p").addClass("risePrice"); 
                             	       	$("#sp500-p").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item3 === 0){ 
                             	  	 	 $("#sp500-p").addClass("flatPrice"); 
                             	       $("#sp500-p").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#sp500-p").addClass("fellPrice"); 
                             	       $("#sp500-p").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             } 
                        }) ; 
                    		//  Sp500 - Ending  
                    		//  pdpsc - starting
                    		  $.each(itemData2[7],function(key3,item3){  
                    		  	 if (key3 === '6') {
                 	              itemDataTemp = item3 ;
                 	            }
                    		  	 if (key3 === '200009') {
                    		  		  $("#pdpsc").html(item3 + itemDataTemp );
                             } 
                             if (key3 === '11') {
                  	            $("#pdpsc-p").html(item3);                              	
                             	  if (item3> 0) 
                             	      {
                             	       	$("#pdpsc-p").addClass("risePrice"); 
                             	       	$("#pdpsc-p").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item3 === 0){ 
                             	  	 	 $("#pdpsc-p").addClass("flatPrice"); 
                             	       $("#pdpsc-p").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#pdpsc-p").addClass("fellPrice"); 
                             	       $("#pdpsc-p").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             } 
                        }) ; 
                    		//  pdpsc - Ending                 		                    		                         		              		
                    	}
                     });               
                  }
                 });
                }); 
               };  
			   
			   
	    function showElement() {
			while(intervalIds.length){
                  clearInterval(intervalIds.pop());
             }
			 if (element2.style.display == "none" ) 
                 element2.style.display = "block"  // Change display to block to make it visible
             else
      		     element2.style.display = "none" ;	
            console.log(element2.style.display) ;
		//	console.log (element.style.display) ;

	    }		 