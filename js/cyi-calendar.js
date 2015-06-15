(function($) {

	$(function() {

		/***********************************************************************
		 * Calender Request
		 **********************************************************************/
		var eventSrc = [];
		//$("a[href='#tabs-5']").click(function(e){
	//	$.getJSON("http://cyinterpreting.elasticbeanstalk.com/webapi/interpreting",
					//	function(response) {
			            	response = '[{ "inter_request_id" : 1, "timestamp" : "2015-06-14 02:21:42","app_date" : "2015-06-15","start_time" : "15:30:00.0","duration" : 2, "lang" : "French",  "lep_name" : "Romaric Sall",'+
			                '"contact_one" : "Mitch Arnold", "assigned_to":"Fon Akenji", '+
			                ' "contact_two" : "Phil Cameron", "contact_three" : "",   "inter_gender" : "M",   "client_name" : "Ron Stewart",'+  
			                '"location_id" : 3,  "location_notes" : "far away",  "request_notes" : "please be polite", "onsite_phone":"770-596-1305",'+
			                '"called" : "N", "rate" : 25.00,"location" : "5444 Barwyn Dr Rex"},'+
			                '{"location" : "5444 Barwyn Dr Rex",  "onsite_phone":"770-596-1305", "inter_request_id" : 2, '+
			                '"timestamp" : "2015-05-24 02:28:54",    "app_date" : "2015-06-20",'+' "start_time" : "08:16:00.0",'+
			                '"duration" : 4, "lang" : "Chinese", "lep_name" : "SaoKung Lee", "lep_phone" : "6788000000", "contact_one" : "Dr. Roosevelt", '+
			                '   "contact_two" : "Kofi Mensah","assigned_to":"David Nnkansah", "contact_three" : "",   "inter_gender" : "F",   "client_name" : "Nicholas Brett",    "location_id" : 3,'+
			                ' "location_notes" : "close to the mall", "request_notes" : "please be clean","called" : "N", "rate" : 35.00}]';
							//response = JSON.stringify(response);
							response = escape(response);
							var data = $.parseJSON(response);
							var eventSrc = [];
							$.each(data, function(i, v) {
								var st = v.start_time.substring(0, 8);
								var sd = v.app_date;
								var start = sd + "T" + st;
								var endDate = new Date(start);
								endDate.setHours(endDate.getHours()
										+ v.duration);
								end = endDate.toISOString();
								eventSrc[i] = {
									id : v.inter_request_id,
									inter_id : v.inter_request_id,
									title : v.contact_one,
									start : start,
									end : end,
									assigned_to : v.assigned_to,
									lang : v.lang,
									app_date : v.app_date,
									start_time : v.start_time,
									duration : v.duration,
									lang : v.lang,
									assigned_to : v.assigned_to,
									called : v.called,
									timestamp : v.timestamp,
									lep_name : v.lep_name,
									onsite_phone : v.onsite_phone,
									contact_two : v.contact_two,
									inter_gender : v.inter_gender,
									location_notes : v.location_notes,
									request_notes : v.request_notes,
									rate : v.rate,
									adress : v.location
								};
							});
							// });

							// alert(JSON.stringify(eventSrc[1]));
							/* Impliment FullCalender.io */

							$('#calendar')
									.fullCalendar(
											{
												minTime:"06:00:00",
												maxTime:"21:00:00",
												events : eventSrc,
												height : 300,
												defaultView : "agendaWeek",
												header : {
													left : 'month,agendaWeek,agendaDay',
													center : 'title',
													right : 'today,prev,next'
												},
												eventAfterAllRender : function() {
													document
															.querySelector('#calendar h2').innerText = document
															.querySelector('#calendar h2').innerText
															.replace("â€”", "-");
												},
												eventRender : function(event,
														element) {
													element
															.find('.fc-title')
															.prepend("Client: ");
													element
															.find('.fc-title')
															.append(
																	"<br/>"
																			+ "Assignee: "
																			+ event.assigned_to
																			+ "<br/>"
																			+ "Language: "
																			+ event.lang);
													element
															.qtip({ // Grab all
																// elements
																// with a
																// non-blank
																// data-tooltip
																// attr.
																title : {
																	text : 'About Me',
																},
																position : {
																	target : 'mouse', // Position
																	// it
																	// where
																	// the
																	// click
																	// was...
																	adjust : {
																		mouse : false
																	}
																// ...but don't
																// follow the
																// mouse
																},
																style : {
																	classes : 'qtip-light qtip-bootstrap',
																	def : false,
																},
																content : {
																	text : '<div class="">'
																			+ '<div class="item"><span class="name">ID:</span><span class="value">'
																			+ event.id
																			+ '</span></div>'
																			+'<div class="item"><span class="name">Assigned To: </span><span class="value">' +event.assigned_to+'</span></div>' 
																			+ '<div class="item"><span class="name">Onsite Contact: </span><span class="value">'
																			+ event.title
																			+ '</span></div>'
																			+ '<div class="item"><span class="name">Follow Up Call: </span>'
																			+ event.called
																			+ '</div>'
																			+ '<div class="item"><span class="name">Onsite Number: </span><span class="value">'
																			+ event.onsite_phone
																			+ '</span></div>'
																			+ '<div class="item"><span class="name">Contact 2: </span><span class="value">'
																			+ event.contact_two
																			+ '</span></div>'
																			+ '<div class="item"><span class="name">Request Date/Time: </span><span class="value">'
																			+ event.timestamp
																			+ '</span></div>'
																			+ '<div class="item"><span class="name">Location: </span><span class="value">'
																			+ event.adress
																			+ '</span></div>'
																			+ '<div class="item"><span class="name">Location Notes: </span><span class="value">'
																			+ event.location_notes
																			+ '</span></div>'
																			+ '<div class="item"><span class="name">Request Notes: </span><span class="value">'
																			+ event.request_notes
																			+ '</span></div>'
																			+ '</div>',
																	title : 'Request Details',
																	button : 'Close'

																},
																events : {
																	shown : function(
																			event,
																			api) {
																	}
																},
																hide : {
																	event : false
																}
															})// End of q-tip
													// function-->
												}
											});
							function custom_sort(a, b) {
								return new Date(a.start).getTime()
										- new Date(b.start).getTime();
							}

							eventSrc.sort(custom_sort);

							$('#calendar').fullCalendar('gotoDate',
									eventSrc[0].start);
						});
		
		});			
})(jQuery);
