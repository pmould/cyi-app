(function($){
      var endpts = {
                request: 'http://cyinterpreting.elasticbeanstalk.com/webapi/interpreting',
                assign: 'http://cyinterpreting.elasticbeanstalk.com/webapi/interpreters?lang='   
            }; 
//$.getJSON(endpts.request, function(response){       //comment here...
 $(function(){
    response = '[{ "legal" : "Y", "inter_request_id" : 1, "timestamp" : "2015-04-24 02:21:42", "client" : "Shark Auto,LLC", "app_date" : "2015-03-15",  "start_time" : "15:30:00.0",  "duration" : 2, "lang" : "French", "lep_name" : "Romaric Sall", "lep_phone" : "2147483647", "contact_one" : "Mitch Arnold",   "contact_two" : "", "contact_three" : "",  "inter_gender" : "M", "client_name" : "Ron Stewart", "location_id" : 3, "location_notes" : "far away", "request_notes" : "please be polite", "called" : "N", "rate" : 25.00},{ "legal" : "Y", "inter_request_id" : 2, "timestamp" : "2015-04-24 02:28:54", "client" : "Dromadaire Silicon", "app_date" : "2015-04-11",  "start_time" : "08:16:00.0",    "duration" : 4, "lang" : "Chinese", "lep_name" : "SaoKung Lee", "lep_phone" : "6788000000", "contact_one" : "Dr. Roosevelt", "contact_two" : "", "contact_three" : "", "inter_gender" : "F", "client_name" : "Nicholas Brett", "location_id" : 3, "location_notes" : "close to the mall", "request_notes" : "please be clean", "called" : "N", "rate" : 35.00}]';

   //response= JSON.stringify(response);        //here...
    response= escape(response);
    var data = $.parseJSON(response);
    var row1 = {};
    var row2 = {};
    var ass_select;

    $.each(data, function(i, v){

        var intrlistlang = '[{"interpreter_id": 1, "full_name": "Paul Mould"},{"interpreter_id": 2, "full_name": "Yaw Asare"},{"interpreter_id": 3, "full_name": "Fon Akenji"},{"interpreter_id": 4, "full_name": "Sam Johnson"}]';
        var url =endpts.assign;
        url += v.lang;
        /*$.ajax({
          async:false,
          url:url,
           success: function(intrlistlang){
        var intrlistlang = JSON.stringify(intrlistlang);*/
        intrlistlang = escape(intrlistlang);
        var data2 = $.parseJSON(intrlistlang); 
         
        ass_select = "<select class='select_ass' name='assignee'> <option value=''></option>";
        $.each(data2, function(i, v){
         ass_select+="<option value='"+v.interpreter_id+"'>"+v.full_name+"</option>";
        }); 
        ass_select+="</select>";
        console.log("Inside Select Tag "+i+": \n"+ass_select);
     
       }});              //this function...
        console.log("Outside Select Tag "+i+": \n"+ass_select);
        row1[v.inter_request_id] ={inter_request_id:v.inter_request_id,assign:ass_select,client:v.client,app_date:v.app_date, start_time:v.start_time,duration:v.duration,lang:v.lang,assigned_to:v.assigned_to, client_name:v.contact_one,called:v.called};
        row2[v.inter_request_id] ={timestamp:v.timestamp, lep_name:v.lep_name,onsite_phone:v.onsite_phone,contact_two:v.contact_two,inter_gender:v.inter_gender,location:v.location, location_notes:v.location_notes,request_notes:v.request_notes,rate:v.rate, location:v.location, legal:v.legal};
   });
   undf(row1); 
   undf(row2);
      var tbC = "interreq"; 
      printrows(row1,tbC);

      //on assign value change
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
            /*$.ajax({
                url:endpts.request,
                type:"put",
                dataType: "jsonp",
                data: jsonData,
                async: true,
                contentType: 'application/json; charset=utf-8',
                success: function(){
                location.reload();   
                },
                error: function(jqXHR,textStatus, errorThrown){

                        jAlert('Failed to load resource: \n'+'Status: '+textStatus+'\nerrorThrown: '+ errorThrown);
                }
            });*/        //...and this funtion

          }

       });


      //on table row click, show dropdown row  
      });
    $('.interreq tbody td:not(.table-actions):not(.aSS)').click(function(){
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
        strout +="<label><span>Location</span><span class='cell'>"+row2[id].location+"</span></label>";
        strout +="<label><span>Location Notes</span><span class='phone'>"+row2[id].location_notes+"</span></label>";
        strout +="<label><span>Request Notes</span><span class='phone'>"+row2[id].request_notes+"</span></label>";
        strout +="</fieldset>";

        strout +="<fieldset>";
        strout +="<label><span>Legal</span><span class='rate'>"+row2[id].legal+"</span></label>";
        strout +="</fieldset>";

        strout +="</div></td></tr>";
        tbr.showRow(strout);
        }
        else tbr.hideRow();
     });

/**********EDIT AND SAVE ACTIONS************/

/***EDIT***/
    //on table-action click
    $('.interreq tbody .table-actions .edit').click(function(){
        
        var children = $(this).parent().parent().children(); //return array of child elements of table row
        tbId = $($(this).parent().parent().children()[0]).text();  //get value of first child element(ID table row)

        //iterate through object to find match for id of current table row
        $.each(data, function(i, v){

            if (tbId == v.inter_request_id)
            tr={inter_request_id:v.inter_request_id,assign:ass_select,client:v.client,app_date:v.app_date, start_time:v.start_time,
                duration:v.duration,lang:v.lang,assigned_to:v.assigned_to, client_name:v.contact_one,called:v.called,
                timestamp:v.timestamp, lep_name:v.lep_name,onsite_phone:v.onsite_phone,contact_two:v.contact_two,
                inter_gender:v.inter_gender,location:v.location, location_notes:v.location_notes,request_notes:v.request_notes,rate:v.rate, location:v.location, legal:v.legal};

        });//console.log(tr.start_time.substring(3,5));

        //display contents of current table row in edit form
        var formOutput = "<div><input name='inter_request_id' hidden='true' value='"+tr.inter_request_id+"'></div>"
        formOutput += "<div class='ui-front'><label>Client<label><input name='client' type='text' value='"+tr.client+"'></div>";
        formOutput += "<div><label>Appointment Date<label><input name='app_date' type='date' value='"+tr.app_date+"'></div>";
        formOutput += "<div><label>Start Time<label><input name='start_time_hour' style='width: 11%;display:inline' value='"+tr.start_time.substring(0,2)+"'> :<input name='start_time_min' style='width: 11%;display:inline' value='"+tr.start_time.substring(3,5)+"'></div>";
        formOutput += "<div><label>Duration<label><input name='duration' type='number' value='"+tr.duration+"'></div>";
        formOutput += "<div><label>Language<label><input name='lang' type='text' value='"+tr.lang+"'></div>";
        formOutput += "<div><label>Assigned To<label><input name='assigned_to' value='"+tr.assigned_to+"'></div>";
        formOutput += "<div><label>Gender(M/F)<label><input name='inter_gender' value='"+tr.inter_gender+"'></div>";
        formOutput += "<div><label>Rate<label><input name='rate' value='"+tr.rate+"'></div>";
        formOutput += "<div><label>Legal<label><input name='legal' value='"+tr.legal+"'></div>";
        formOutput += "<div><label>Onsite Contact Name<label><input name='contact_one' value='"+tr.client_name+"'></div>";
        formOutput += "<div><label>Called(Y/N)<label><input name='called' value='"+tr.called+"'></div>";
        formOutput += "<div><label>LEP Name<label><input name='lep_name' value='"+tr.lep_name+"'></div>";
        //formOutput += "<div><label>Onsite Phone<label><input name='onsite_phone' value='"+tr.onsite_phone+"'></div>";
        formOutput += "<div><label>Onsite Contact 2<label><input name='contact_three' value='"+tr.contact_three+"'></div>";
        formOutput += "<div><label>Onsite Number<label><input name='contact_two' value='"+tr.contact_two+"'></div>";
        formOutput += "<div><label>Location<label><input name='location' value='"+tr.location+"'></div>";
        formOutput += "<div><label>Location Notes<label><textarea name='location_notes' value='"+tr.location_notes+"'></textarea></div>";
        formOutput += "<div><label>Request Notes<label><textarea name='request_notes' value='"+tr.request_notes+"'></textarea></div>";
        

        formOutput += "<div><input type='button' value='CANCEL' class='request cancel'><input type='submit' value='SUBMIT' class='request'></div>";


        // display empty modal box
        $('body').append( $('.modal-holder').css('display','block') );       

        //display edit form
        $('.editBox').css('display','block');
        $('.editBox p').html(formOutput);
    });

 });
});  //comment out this too

})(jQuery);
