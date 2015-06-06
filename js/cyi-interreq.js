(function($){
	  var endpts = {
		  		request: 'http://cyinterpreting.elasticbeanstalk.com/webapi/interpreting',
		  		assign: 'http://cyinterpreting.elasticbeanstalk.com/webapi/interpreters?lang='   
		  	}; 	
$(function(){ 
$.getJSON(endpts.request, function(response){
                /*response = '[{ "inter_request_id" : 1, "timestamp" : "2015-04-24 02:21:42","app_date" : "2015-03-15",'+
                '"start_time" : "15:30:00.0","duration" : 2, "lang" : "French",  "lep_name" : "Romaric Sall",'+
                '"contact_one" : "Mitch Arnold", "assigned_to":"Fon Akenji", '+
                ' "contact_two" : "Phil Cameron", "contact_three" : "",   "inter_gender" : "M",   "client_name" : "Ron Stewart",'+  
                '"location_id" : 3,  "location_notes" : "far away",  "request_notes" : "please be polite", "onsite_phone":"770-596-1305",'+
                '"called" : "N", "rate" : 25.00,"location" : "5444 Barwyn Dr Rex"},'+
                '{"location" : "5444 Barwyn Dr Rex",  "onsite_phone":"770-596-1305", "inter_request_id" : 2, '+
                '"timestamp" : "2015-04-24 02:28:54",    "app_date" : "2015-03-21",'+' "start_time" : "08:16:00.0",'+
                '"duration" : 4, "lang" : "Chinese", "lep_name" : "SaoKung Lee", "lep_phone" : "6788000000", "contact_one" : "Dr. Roosevelt", '+
                '   "contact_two" : "Kofi Mensah","assigned_to":"David Nnkansah", "contact_three" : "",   "inter_gender" : "F",   "client_name" : "Nicholas Brett",    "location_id" : 3,'+
                ' "location_notes" : "close to the mall", "request_notes" : "please be clean","called" : "N", "rate" : 35.00}]';*/
   response= JSON.stringify(response);
    response= escape(response);
    var data = $.parseJSON(response);
    var row1 = {};
    var row2 = {};
    var ass_select;

    $.each(data, function(i, v){

        var url =endpts.assign;
        url += v.lang;
        $.ajax({
          async:false,
          url:url,
           success: function(intrlistlang){*/
        var intrlistlang = JSON.stringify(intrlistlang);
        //var intrlistlang = '[{"interpreter_id": 1, "full_name": "Paul Mould"},{"interpreter_id": 2, "full_name": "Yaw Asare"},{"interpreter_id": 3, "full_name": "Fon Akenji"},{"interpreter_id": 4, "full_name": "Sam Johnson"}]';

        intrlistlang = escape(intrlistlang);
        var data2 = $.parseJSON(intrlistlang);  
         
        ass_select = "<select class='select_ass' name='assignee'> <option value=''></option>";
        $.each(data2, function(i, v){
         ass_select+="<option value='"+v.interpreter_id+"'>"+v.full_name+"</option>";
        }); 
        ass_select+="</select>";
        console.log("Inside Select Tag "+i+": \n"+ass_select);
     
       }});
        console.log("Outside Select Tag "+i+": \n"+ass_select);
        row1[v.inter_request_id] ={inter_request_id:v.inter_request_id,assign:ass_select,app_date:v.app_date, start_time:v.start_time,duration:v.duration,lang:v.lang,assigned_to:v.assigned_to, client_name:v.contact_one,called:v.called};
        row2[v.inter_request_id] ={timestamp:v.timestamp, lep_name:v.lep_name,onsite_phone:v.onsite_phone,contact_two:v.contact_two,inter_gender:v.inter_gender,location:v.location, location_notes:v.location_notes,request_notes:v.request_notes,rate:v.rate, adress:v.location};
   });
   undf(row1); 
   undf(row2);
      var tbC = "interreq"; 
      printrows(row1,tbC);
      $(".select_ass").change(function(){
      
        console.log("Selected ID: " + $(this).val());
        var assignee = $(this).find("option:selected").html();
        var trans_id = $(this).parent().prev().html();
            jsonData = {
                "inter_request_id":  Number(trans_id),
                "interpreter_id": Number($(this).val())
            };
        jConfirm("Are you sure you want to make this changes?\n\nThis would assign "
                      +assignee
                      +" to the request record with ID "+ trans_id+"\n", 'Confirmation Dialog', function(r) 
        { if (r){
            jsonData = JSON.stringify(jsonData);
               console.log("name: "+jsonData.request_id+", id:"+jsonData.interpreter_id);
               console.log(jsonData);
            $.ajax({
                url:endpts.request,
                type:"put",
                data: jsonData,
                async: true,
                contentType: 'application/json; charset=utf-8',
                success: function(){
                location.reload();   
                },
                error: function(jqXHR,textStatus, errorThrown){

                        jAlert('Failed to load resource: \n'+'Status: '+textStatus+'\nerrorThrown: '+ errorThrown);
                }
            }); 

          }

       });
 


      });
	$('.interreq tbody td:not(.aSS)').click(function(){
		var thistr = $(this);
        var tbr = thistr.parent();
		if (!tbr.hasClass('active'))
		{
		tbr.addClass('active');
		var id  = tbr.attr("id").replace('post-','');
     	var strout = "";
        strout +="<tr class='trdrp'><td colspan='12'>";
        strout +="<div class='dropdown'>";
        strout +="<fieldset>";
        strout +="<label><span>LEP Name</span><span class='name'>"+row2[id].lep_name+"</span></label>";
        strout +="<label><span>Onsite Number</span><span class='add'>"+row2[id].onsite_phone+"</span></label>";        
        strout +="<label><span>Contact 2</span><span class='cell'>"+row2[id].contact_two+"</span></label>";
        strout +="<label><span>Request Date/Time </span><span class='cell'>"+row2[id].timestamp+"</span></label>";
      
        strout +="</fieldset>";
        strout +="<fieldset>";
        strout +="<label><span>Rate</span><span class='rate'>"+row2[id].rate+"</span></label>";
        strout +="<label><span>Location</span><span class='cell'>"+row2[id].adress+"</span></label>";
        strout +="<label><span>Location Notes</span><span class='phone'>"+row2[id].location_notes+"</span></label>";
        strout +="<label><span>Request Notes</span><span class='phone'>"+row2[id].request_notes+"</span></label>";
        strout +="</fieldset>";
        strout +="</div></td></tr>";
    	tbr.showRow(strout);
    	}
    	else
    	{
    		tbr.hideRow();
    	}
     });


 });
});

})(jQuery);
