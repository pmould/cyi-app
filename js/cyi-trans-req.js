(function($){
$.getJSON("http://localhost:8080/int_sms/webapi/translation/getdetails", function(response){
 $(function(){
    
   // response = '[{ "trans_order_id" : 1,   "doc_type" : "birth certificate",   "client_name" : "Kaiser Permanente",    "lang" : "German",  "timestamp" : "2015-03-02 00:00:00",    "due_date" : "2015-03-10", "notes" : "please hurry up!!!", "cust_email" : "test@yahoo.com",   "nbr_of_pages" : 200,  "cust_phone" : "019900",  "cust_fax" : 0,  "notoring_rqd" : "N", "cust_name" : "Kofi Anane"},{  "trans_order_id" : 2,   "doc_type" : "death certificate",   "client_name" : "Dromadaire Silicon",    "lang" : "French",  "timestamp" : "2015-01-02 00:00:00",    "due_date" : "2015-05-06",  "cust_name" : "Eric Holders", "notes" : "You can take your time....", "cust_email" : "info@test.com",    "nbr_of_pages" : 50,  "cust_phone" : 404789074,  "cust_fax" : 23222345689,  "notoring_rqd" : "Y"},{  "trans_order_id" : 3,   "doc_type" : "marriage certificate",    "client_name" : "Shark Auto LLC",  "lang" : "Spanish", "timestamp" : "2015-02-14 00:00:00",  "due_date" : "2015-03-18",  "cust_name" : "Sepp Blatter", "notes" : "How I love her....", "cust_email" : "bruh@email.org",    "nbr_of_pages" : 20,  "cust_phone" : 5689096,  "cust_fax" : 0,  "notoring_rqd" : "Y"}]';

    response= JSON.stringify(response);
    response= escape(response);
    var data = $.parseJSON(response);
    var row1 = {};
            var row2 = {};
            //console.log('');
            $.each(data, function(i, v){
                row1[v.trans_order_id] ={trans_order_id:v.trans_order_id,client_name:v.client_name,submit_date:v.timestamp,due_date:v.due_date,lang:v.lang,nbr_of_pages:v.nbr_of_pages,email:v.cust_email,name:v.cust_name};
                row2[v.trans_order_id] ={doc_type:v.doc_type,phone_num:v.cust_phone,fax_num:v.cust_fax,notes:v.notes,rate:v.rate,notoring_rqd:v.notoring_rqd};
            });
            undf(row1);  
            undf(row2);
            var tbC = "transreq"; 
            printrows(row1,tbC);
            $('.transreq tbody tr').click(function(e){
                var thistr = $(this);
                if (!$(this).hasClass('active'))
                {
                    $(this).addClass('active');
                    var id  = $(this).attr("id").replace('post-','');
                    var strout = "";
                    strout +="<tr class='trdrp'><td colspan='10'>";
                    strout +="<div class='dropdown'>";
                    strout +="<fieldset>";
                    strout +="<label><span>Document Type </span><span class='add'>"+row2[id].doc_type+"</span></label>";
                    strout +="<label><span>Notoring Rqd? (Y/N) </span><span class='add'>"+row2[id].notoring_rqd+"</span></label>";        
                    strout +="<label><span>Phone Number </span><span class='add'>"+row2[id].phone_num+"</span></label>";
                    strout +="<label><span>Fax Number </span><span class='add'>"+row2[id].fax_num+"</span></label>";
                    strout +="</fieldset>";
                    strout +="<fieldset>";        
                    strout +="<label><span>Rate</span><span class='zc'>"+row2[id].rate+"</span></label>";        
                    strout +="<label><span>Notes </span><span class='zc'>"+row2[id].notes+"</span></label>";
                    strout +="</fieldset>";
                    strout +="</div></td></tr>";
                    $(this).showRow(strout);
                }
                else $(this).hideRow();
            });

        $('.transreq tbody .table-actions .edit').click(function(){
        
        var children = $(this).parent().parent().children(); //return array of child elements of table row
        tbId = $($(this).parent().parent().children()[0]).text();  //get value of first child element(ID table row)

        //iterate through object to find match for id of current table row
        $.each(data, function(i, v){

            if (tbId == v.trans_order_id)
            tr={trans_order_id:v.trans_order_id,client_name:v.client_name,submit_date:v.timestamp,due_date:v.due_date,
                lang:v.lang,nbr_of_pages:v.nbr_of_pages,email:v.cust_email,name:v.cust_name,doc_type:v.doc_type,phone_num:v.cust_phone,
                fax_num:v.cust_fax,notes:v.notes,rate:v.rate,notoring_rqd:v.notoring_rqd};

        });//console.log(tr.inter_request_id);

        //display contents of current table row in edit form
        var formOutput = "<div><input name='inter_request_id' hidden='true' value='"+tr.trans_order_id+"'></div>"
        formOutput += "<div class='ui-front'></label>Client<label><input name='client_name' type='text' placeholder='"+tr.client_name+"'></div>";
        formOutput += "<div><label>Date Due</label><input name='due_date' type='date' value='"+tr.due_date+"'></div>";
        formOutput += "<div><label>Document Type</label><input name='doc_type' placeholder='"+tr.doc_type+"'></div>";
        formOutput += "<div><label>Number Of Pages</label><input name='nbr_of_pages' type='number' placeholder='"+tr.nbr_of_pages+"'></div>";
        formOutput += "<div><label>Contact Name</label><input name='cust_name' type='text' placeholder='"+tr.cust_name+"'></div>";
        formOutput += "<div><label>Phone Number</label><input name='cust_phone' placeholder='"+tr.cust_phone+"'></div>";
        formOutput += "<div><label>Fax</label><input name='cust_fax' placeholder='"+tr.cust_fax+"'></div>";
        formOutput += "<div><label>Email</label><input name='cust_email' placeholder='"+tr.cust_email+"'></div>";
        formOutput += "<div><label>Language</label><input name='lang' placeholder='"+tr.lang+"'></div>";
        formOutput += "<div><label>Notoring Required?(Y/N)</label><input name='notoring_rqd' placeholder='"+tr.notoring_rqd+"'></div>";
        formOutput += "<div><label>Rate</label><input name='rate' placeholder='"+tr.rate+"'></div>";
        formOutput += "<div><label>Notes</label><textarea name='notes' placeholder='"+tr.notes+"'></textarea></div>";
        

        formOutput += "<div><input type='button' value='CANCEL' class='request cancel'><input type='submit' value='SUBMIT' class='request'></div>";


        // display empty modal box
        $('body').append( $('.modal-holder').css('display','block') );       

        //display edit form
        $('.editBox').css('display','block');
        $('.editBox p').html(formOutput);
    });

        
        });
    });

})(jQuery);
