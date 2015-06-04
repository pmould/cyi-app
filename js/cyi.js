(function($){
	$.getJSON("http://cyinterpreting.elasticbeanstalk.com/webapi/interpreters", function(response){
		$(function(){

			//response ='[{"interpreter_id" : 1,"last_name" : "Garcia","first_name" : "Jose","adress" : "2300 Walnut Grove Way\nSuwannee, ga","zipcode" : 30024,"phone" : "2147483647","cell" : "2147483647","email" : "Jose.m.garcia@live.com","prim_lang" : "Spanish","secnd_lang" : NULL,"third_lang" : NULL,"cert_one" : NULL,"cert_two" : NULL,"cert_three" : NULL,"avail" : "Y","notes" : "did not complete HIPAA at the interview - was on time -....","hourly_rate" : 23,"work_auth_vrfd" : NULL,"degree" : "BS in Food Science","license" : NULL,"miles_rate" : 0},{"interpreter_id" : 2,"last_name" : "Roland","first_name" : "Pierce","adress" : "3400 Wayne Lee Way\nAustell, ga","zipcode" : 30106,"phone" : "4046780000","cell" : "4046780001","email" : "rpPdej@live.com","prim_lang" : "Finish","secnd_lang" : NULL,"third_lang" : NULL,"cert_one" : NULL,"cert_two" : NULL,"cert_three" : NULL,"avail" : "Y","notes" : NULL,"hourly_rate" : 15,"work_auth_vrfd" : NULL,"degree" : NULL,"license" : NULL,"miles_rate" : 0},{"interpreter_id" : 3,"last_name" : "Dowel","first_name" : "Mawuks","adress" : "600 Comeland Wayne Ct\nDecatur GA","zipcode" : 30884,"phone" : "404125000","cell" : "404684201","email" : "dowmaw@gmail.com","prim_lang" : "German","secnd_lang" : NULL,"third_lang" : NULL,"cert_one" : NULL,"cert_two" : NULL,"cert_three" : NULL,"avail" : "Y","notes" : NULL,"hourly_rate" : 20,"work_auth_vrfd" : NULL,"degree" : NULL,"license" : NULL,"miles_rate" : 0},{"interpreter_id" : 4,"last_name" : "Cerio","first_name" : "Matolini","adress" : "400 Cobb Galeria Pkwy\nSmyrna GA","zipcode" : 30339,"phone" : "4045484000","cell" : "770688601","email" : "c_mat@gmail.com","prim_lang" : "German","secnd_lang" : "Italian","third_lang" : NULL,"cert_one" : NULL,"cert_two" : NULL,"cert_three" : NULL,"avail" : "N","notes" : NULL,"hourly_rate" : 20,"work_auth_vrfd" : NULL,"degree" : NULL,"license" : NULL,"miles_rate" : 0}]';

			response= JSON.stringify(response);
			response= escape(response);
			var data = $.parseJSON(response);
			var row1 = {};
			var row2 = {};

			$.each(data, function(i, v){
				row1[v.interpreter_id] ={interpreter_id:v.interpreter_id, first_name:v.first_name,last_name:v.last_name,prim_lang:v.prim_lang,secnd_lang:v.secnd_lang,third_lang:v.third_lang,fourth_lang:v.fourth_lang, avail:v.avail,cert_one:v.cert_one};
				row2[v.interpreter_id] ={adress:v.adress,zipcode:v.zipcode,hourly_rate:v.hourly_rate,rate2:v.rate2, rate3:v.rate3, rate4:v.rate4, miles_rate:v.miles_rate,cell:v.cell,phone:v.phone,email:v.email,fax:v.fax,country:v.country,work_auth_vrfd:v.work_auth_vrfd};
			});  
			undf(row2);  
			undf(row1); 
			var tbC = "intr";
			printrows(row1,tbC);

			$('.intr tbody tr').click(function(e){
				var thistr = $(this);
				if (!$(this).hasClass('active'))
				{
					$(this).addClass('active');

					var id  = $(this).getId();
					var strout = "";
					strout +="<tr class='trdrp'><td colspan='8'>";
					strout +="<div class='dropdown'>";

					strout +="<fieldset>";
					strout +="<label><span>Address </span><span class='add'>"+row2[id].adress+"</span></label>";
					strout +="<label><span>Phone: </span><span class='phone'>"+row2[id].phone+"</span></label>";
					strout +="<label><span>Cell </span><span class='cell'>"+row2[id].cell+"</span></label>";
					strout +="<label><span>Email </span><span class='email'>"+row2[id].email+"</span></label>"; 
					strout +="<label><span>Zipcode </span><span class='zc'>"+row2[id].zipcode+"</span></label>";
					strout +="<label><span>Fax </span><span class='fax'>"+row2[id].fax+"</span></label>";
					strout +="</fieldset>";

					strout +="<fieldset>";
					strout +="<label><span>Lang 1 Rate:</span><span class='hr'>"+row2[id].hourly_rate+"</span></label>"; 
					strout +="<label><span>Lang 2 Rate:</span><span class='rate2'>"+row2[id].rate2+"</span></label>";
					strout +="<label><span>Lang 3 Rate:</span><span class='rate3'>"+row2[id].rate3+"</span></label>"; 
					strout +="<label><span>Lang 4 Rate:</span><span class='rate4'>"+row2[id].rate4+"</span></label>"; 
					strout +="</fieldset>";

					strout +="<fieldset>";
					strout +="<label><span>Miles Rate:</span><span class='miles'>"+row2[id].miles_rate+"</span></label>"; 
					strout +="<label><span>Work Authorization</span><span class='add'>"+row2[id].work_auth_vrfd+"</span></label>";
					strout +="<label><span>Native Country: </span><span class='country'>"+row2[id].country+"</span></label>";
					strout +="</fieldset>";
					strout +="</div><td></tr>";
					$(this).showRow(strout);    	}
				else
				{
					$(this).hideRow();
				}
			});

		});
	});
})(jQuery);