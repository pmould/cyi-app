(function($){
	$.getJSON("http://cyinterpreting.elasticbeanstalk.com/webapi/clients", function(response){
		$(function(){

			//response = '[{ "trans_order_id" : 1,   "doc_type" : "birth certificate",   "client_id" : 1,    "lang" : "German",  "timestamp" : "2015-03-02 00:00:00",    "due_date" : "2015-03-10",  "cust_name" : "20", "notes" : "please hurry up!!!", "cust_email" : NULL,    "nbr_of_pages" : NULL,  "cust_phone" : "",  "cust_fax" : NULL,  "notoring_rqd" : ""},{  "trans_order_id" : 2,   "doc_type" : "death certificate",   "client_id" : 1,    "lang" : "french",  "timestamp" : "2015-01-02 00:00:00",    "due_date" : "2015-05-06",  "cust_name" : "20", "notes" : "You can take your time....", "cust_email" : NULL,    "nbr_of_pages" : NULL,  "cust_phone" : "",  "cust_fax" : NULL,  "notoring_rqd" : ""},{  "trans_order_id" : 3,   "doc_type" : "marriage certificate",    "client_id" : 1,    "lang" : "Spanish", "timestamp" : "2015-02-14 00:00:00",    "due_date" : "2015-03-18",  "cust_name" : "20", "notes" : "How I love her....", "cust_email" : NULL,    "nbr_of_pages" : NULL,  "cust_phone" : "",  "cust_fax" : NULL,  "notoring_rqd" : ""}]';

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
			$('.clients tbody tr').click(function(e){
				var thistr = $(this);         
				if (!$(this).hasClass('active'))
				{
					$(this).addClass('active');
					var id  = $(this).attr("id").replace('post-','');
					var strout = "";
					strout +="<tr class='trdrp'><td colspan='6'>";
					strout +="<div class='dropdown'>";
					strout +="<fieldset>";
					strout +="<label><span>Address </span><span class='cell'>"+row2[id].adress+"</span></label>";
					strout +="<label><span>Zipcode </span><span class='phone'>"+row2[id].zipcode+"</span></label>";
					strout +="<label><span>Other Number</span><span class='phone'>"+row2[id].other_num+"</span></label>";
					strout +="<label><span>Contact Name</span><span class='eM'>"+row2[id].contact+"</span></label>";
					strout +="</fieldset>"
						strout +="<fieldset>";
					strout +="<label><span>Email</span><span class='eM'>"+row2[id].email+"</span></label>";
					strout +="<label><span>Marketer</span><span class='eM'>"+row2[id].marketer+"</span></label>";
					strout +="<label><span>Website </span><span class='add'>"+row2[id].website+"</span></label>";
					strout +="<label><span>Notes</span><span class='email'>"+row2[id].notes+"</span></label>"; 
					strout +="<fieldset>";
					strout +="</div><td></tr>";
					$(this).showRow(strout);
				}
				else
				{
					$(this).hideRow();
				}
			});


		});
	});

})(jQuery);