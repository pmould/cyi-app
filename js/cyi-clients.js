(function($){
     $(function(){
        $.getJSON("http://cyinterpreting.elasticbeanstalk.com/webapi/clients", function(response){
       

            //response ='[{"client_id":1,"adress":"689 Mableton Pkwy","marketer":"Donnie Regan","website":"www.masmenidas.com","phone_num":"0","cell_num":"678500412","fax_num":"0","other_num":"0","email":"dine@live.fr","lang_list_id":0,"notes":"","zipcode":30309,"name":"Dromadaire Silicon"},{"client_id":958,"adress":"Brookwood Peachtree Medical Office\n1745 Peachtree ","marketer":"Sylvie Ndiaye","website":"","phone_num":"404","cell_num":"404","fax_num":"0","other_num":"0","email":"kaiser@yahoo.com","lang_list_id":0,"notes":"bananna apple orange","zipcode":30309,"name":"Kaiser Permanente"},{"client_id":959,"adress":"200 Peachtree Industrial Bldvd","marketer":"Nicolas LeBeurre","website":"wwww.sharkauto.com","phone_num":"8004567812","cell_num":"","fax_num":"","other_num":"","email":"manager@shark.com","lang_list_id":0,"notes":"mickey and donald","zipcode":30340,"name":"Shark Auto,LLC"}]';

            response= JSON.stringify(response);
            response= escape(response);

            var data = $.parseJSON(response);
            var row1 = {};
            var row2 = {};

            $.each(data, function(i, v){
                row1[v.client_id] ={client_id:v.client_id,name:v.name,phone_num:v.phone_num,cell_num:v.cell_num,fax_num:v.fax_num};
                row2[v.client_id] ={website:v.website,marketer:v.marketer,adress:v.adress,zipcode:v.zipcode,notes:v.notes,other_num:v.other_num,email:v.email,contact:v.contact};
            });  
            undf(row1); 
            undf(row2); 

            var tbC = "clients"; 
            printrows(row1,tbC);
            $('.clients tbody td:not(.table-actions):not(.aSS)').click(function(){
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
        $('.clients tbody .table-actions .edit').click(function(){
        
        var children = $(this).parent().parent().children(); //return array of child elements of table row
        tbId = $($(this).parent().parent().children()[0]).text();  //get value of first child element(ID table row)

        //iterate through object to find match for id of current table row
        $.each(data, function(i, v){

            if (tbId == v.client_id)
            tr={client_id:v.client_id,name:v.name,phone_num:v.phone_num,cell_num:v.cell_num,fax_num:v.fax_num,
                website:v.website,marketer:v.marketer,adress:v.adress,zipcode:v.zipcode,notes:v.notes,other_num:v.other_num,email:v.email,contact:v.contact};

        });//console.log(tr.inter_request_id);

        //display contents of current table row in edit form
        var formOutput = "<div><input name='inter_request_id' hidden='true' value='"+tr.client_id+"'></div>"
        formOutput += "<div class='ui-front'><label>Client Name<label><input name='name' type='text' value='"+tr.name+"'></div>";
        formOutput += "<div><label>Contact<label><input name='contact' value='"+tr.contact+"'></div>";
        formOutput += "<div><label>Marketer<label><input name='marketer' value='"+tr.marketer+"'></div>";
        formOutput += "<div><label>Address<label><input name='adress' value='"+tr.adress+"'></div>";
        formOutput += "<div><label>Zipcode<label><input name='zipcode' value='"+tr.zipcode+"'></div>";
        formOutput += "<div><label>Email<label><input name='email' value='"+tr.email+"'></div>";
        formOutput += "<div><label>Phone Number<label><input name='phone_num' value='"+tr.phone_num+"'></div>";
        formOutput += "<div><label>Cell Number<label><input name='cell_num' value='"+tr.cell_num+"'></div>";
        formOutput += "<div><label>Alternate Number<label><input name='other_num' value='"+tr.other_num+"'></div>";
        formOutput += "<div><label>Fax<label><input name='fax_num' value='"+tr.fax_num+"'></div>";
        formOutput += "<div><label>Website URL<label><input name='website' value='"+tr.website+"'></div>";
        formOutput += "<div><label>Notes<label><textarea name='notes' value='"+tr.notes+"'></textarea></div>";
        

        formOutput += "<div><input type='button' value='CANCEL' class='request cancel'><input type='submit' value='SUBMIT' class='request'></div>";


        // display empty modal box
        $('body').append( $('.modal-holder').css('display','block') );       

        //display edit form
        $('.editBox').css('display','block');
        $('.editBox p').html(formOutput);
    });

        
        }); //getJSON
    });

})(jQuery);
