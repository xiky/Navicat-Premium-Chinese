$(document).bind('mobileinit', function(){ 
    $.mobile.metaViewportContent = 'width=device-width'; 
}); 

/*switch(platform) {
    case 'lin':
        var content_section_path = "../linux_manual";
        break;
    case 'win':
        var content_section_path = "../win_manual";
        break;
	case 'mac':
        var content_section_path = "../mac_manual";
        break;
    default:
}*/
var content_section_path = ".";

$(document).ready(function() { 
	//Hashtag changed, run getPages();	
	$(window).bind('hashchange', function() {
		$("head>title").remove();
		var url = window.location.href;
		var lastSegment = url.split('/').pop();
		var finalSegment = lastSegment.replace("_0", "");		
		var a_ele = $("a[id='"+finalSegment+"']");
		if(a_ele.is('[gp_1_ele]')){ 
			if (lastSegment.indexOf("_0")>0){
				$(".menual_menu_ul a").removeClass("menu_selected_bg_color");
				a_ele.addClass("menu_selected_bg_color");
				$.ajax({url: content_section_path+"/"+finalSegment + ".html", success: function(result){
					$(".menual_content").html(result);	
					$(".menual_content").scrollTop("0");
				}});
			}else{
				getPages();
			}
		}else{
			getPages();
		}		
	});
	
	//Get All Menu
	$.ajax({url: "menu_section/main_menu_section.html", success: function(result1){
		$(".menual_menu_ul").html(result1);	
		getPages();
		menuExpand();
		menuEffect();				
	}});
	//Get All Pages Content By Menu
	function getPages() {
		var url = window.location.href;
		var lastSegment = url.split('/').pop();
		var finalSegment = lastSegment.replace("_0", "");
		if (finalSegment == 'index.html') {
			finalSegment = null
		}
		//access at first, no hash
		if(!finalSegment){
			finalSegment = "cover";
		}else{ 
			//Menu Effect
			var target_ele = $("a[id='"+finalSegment+"']");	
			$(".menual_menu_ul a").removeClass("menu_selected_bg_color");
			target_ele.addClass("menu_selected_bg_color");
			target_ele.parents("ul").slideDown();			
			target_ele.parents(".menual_menu_gp, .menual_menu_gp2, .menual_menu_gp3, .menual_menu_gp4").attr("ref","gp_selected");
			if(target_ele.is('[gp_1_ele]')){ 
				target_ele.parent().parent().parent().children("a").addClass("no_border");
			}
		}
		$.ajax({url: content_section_path+"/"+finalSegment + ".html", success: function(result){
			$(".menual_content").html(result);	
			$(".menual_content").scrollTop("0");
		}});
	}
	//Menu Expand
	function menuExpand(){
		$(".menual_menu_gp>a").click(function(){
			$(".menual_menu_ul a").removeClass("no_border");
			var this_obj = $(this).parent();
			var this_ref = this_obj.attr("ref");
			if(this_ref == "gp_selected"){
				this_obj.find(".menual_menu_ul_sib").slideUp("fast");
				this_obj.attr("ref","gp_not_select");
				$(this).removeClass("no_border");
			}else{
				//OPEN 1ST CATE
				var first_child = $(this).parent().children("ul").children("li:first").children("a");
				var first_child_id = first_child.attr("id");
				first_child.click();
				$.ajax({url: content_section_path+"/"+first_child_id + ".html", success: function(result){
					$(".menual_content").html(result);
					$(".menual_content").scrollTop("0");
				}});
				menu_on();
				this_obj.find(".menual_menu_ul_sib").slideDown("fast");	
				this_obj.attr("ref","gp_selected");
				$(this).addClass("no_border");
			}
		});
		$(".menual_menu_gp2>a").click(function(){
			var this_obj = $(this).parent();
			var this_ref = this_obj.attr("ref");
			if(this_ref == "gp_selected"){
				this_obj.find(".menual_menu_ul_sib2").slideUp("fast");
				this_obj.attr("ref","gp_not_select")
				$(this).removeClass("no_border");
			}else{ 
				//OPEN 2ST CATE
				var first_child = $(this).parent().children("ul").children("li:first").children("a");
				var first_child_id = first_child.attr("id");
				first_child.click();
				$.ajax({url: content_section_path+"/"+first_child_id + ".html", success: function(result){
					$(".menual_content").html(result);	
					$(".menual_content").scrollTop("0");
				}});			
				menu_on();
				this_obj.find(".menual_menu_ul_sib2").slideDown("fast");	
				this_obj.attr("ref","gp_selected")
				$(this).addClass("no_border");
			}
		});
		$(".menual_menu_gp3>a").click(function(){
			$(".menual_menu_ul a").removeClass("no_border");
			var this_obj = $(this).parent();
			var this_ref = this_obj.attr("ref");
			if(this_ref == "gp_selected"){
				this_obj.find(".menual_menu_ul_sib3").slideUp("fast");
				this_obj.attr("ref","gp_not_select")
				$(this).removeClass("no_border");
			}else{ 
				//OPEN 3ST CATE
				var first_child = $(this).parent().children("ul").children("li:first").children("a");
				var first_child_id = first_child.attr("id");
				first_child.click();
				$.ajax({url: content_section_path+"/"+first_child_id + ".html", success: function(result){
					$(".menual_content").html(result);		
					$(".menual_content").scrollTop("0");
				}});
				menu_on();
				this_obj.find(".menual_menu_ul_sib3").slideDown("fast");	
				this_obj.attr("ref","gp_selected")
				$(this).addClass("no_border");
			}
		});
		
		$(".menual_menu_gp:last>a").click(function(){
			if($(this).parent().attr("ref") == "gp_selected"){
				$(".menual_menu_ul").animate({ scrollTop: $('.menual_menu_ul')[0].scrollHeight}, 1000);
			}
		})
			
		
	}
	
	function menuEffect(){
		$(".menual_menu_ul_sib>li>a:not('.menu_heading, .menu_heading2, .menu_heading3, .menu_heading4')").click(function(){ 
			menu_off();
			$(this).parents().find(".menu_heading, .menu_heading2, .menu_heading3, .menu_heading4").removeClass("no_border");
			$(".menual_menu_ul_sib li a").removeClass("menu_selected_bg_color");
			var this_attr = $(this).attr("gp_1_ele");
			if(this_attr == "y"){
				$(this).parent().parent().parent().find(".menu_heading").addClass("no_border");
			}
			if($(this).hasClass( "menu_heading" ) || $(this).hasClass( "menu_heading2" ) || $(this).hasClass( "menu_heading3" ) || $(this).hasClass( "menu_heading4" )){
				$(this).removeClass("no_border");
				$(this).removeClass("menu_selected_bg_color");
			}else{ 
				$(this).addClass("menu_selected_bg_color");
			}
			
		});
		$(".menual_menu_ul_sib2>li>a:not('.menu_heading, .menu_heading2, .menu_heading3, .menu_heading4')").click(function(){ 
			menu_off();
			$(this).parents().find(".menu_heading, .menu_heading2, .menu_heading3, .menu_heading4").removeClass("no_border");
			$(".menual_menu_ul_sib li a").removeClass("menu_selected_bg_color");
			var this_attr = $(this).attr("gp_1_ele");
			if(this_attr == "y"){
				$(this).parent().parent().parent().find(".menu_heading2").addClass("no_border");
			}
			if($(this).hasClass( "menu_heading" ) || $(this).hasClass( "menu_heading2" ) || $(this).hasClass( "menu_heading3" ) || $(this).hasClass( "menu_heading4" )){
				$(this).removeClass("no_border");
				$(this).removeClass("menu_selected_bg_color");
			}else{
				$(this).addClass("menu_selected_bg_color");
			}
		});
		$(".menual_menu_ul_sib3>li>a:not('.menu_heading, .menu_heading2, .menu_heading3, .menu_heading4')").click(function(){ 
			menu_off();
			$(this).parents().find(".menu_heading, .menu_heading2, .menu_heading3, .menu_heading4").removeClass("no_border");
			$(".menual_menu_ul_sib li a").removeClass("menu_selected_bg_color");
			var this_attr = $(this).attr("gp_1_ele");
			if(this_attr == "y"){
				$(this).parent().parent().parent().find(".menu_heading3").addClass("no_border");
			}			
			if($(this).hasClass( "menu_heading" ) || $(this).hasClass( "menu_heading2" ) || $(this).hasClass( "menu_heading3" ) || $(this).hasClass( "menu_heading4" )){
				$(this).removeClass("no_border");
				$(this).removeClass("menu_selected_bg_color");
			}else{
				$(this).addClass("menu_selected_bg_color");
			}
		});
	}
	
	//click content, men and search bar hide
	$(".menual_content").click(function(){
		menu_off();
		search_off();
	});
	

	//Search part----------------------------------------------------------------------------------------------------------------
		/*var menual_search_array = [{"name": 'Getting Started', "type":'Getting Started', "ref_id":'page1', "path":"#/page1"},
									{"name": '1', "type":'Getting Started', "ref_id":'page1', "path":'#/page1'}, 
									{"name": '2', "type":'Getting Started', "ref_id":'page2', "path":'#/page2'}, 
									{"name": '3', "type":'Getting Started', "ref_id":'page3', "path":'#/page3'}, 
									{"name": '4', "type":'Getting Started', "ref_id":'page10', "path":'#/page4'}, 
									{"name": '5', "type":'Getting Started', "ref_id":'page10', "path":'#/page5'}, 
									{"name": '6', "type":'Getting Started', "ref_id":'page10', "path":'#/page6'}, 
									{"name": '7', "type":'Getting Started', "ref_id":'page10', "path":'#/page7'}, 
									{"name": '8', "type":'Getting Started', "ref_id":'page10', "path":'#/page8'}, 
									{"name": '9', "type":'Getting Started', "ref_id":'page10', "path":'#/page9'}, 
									{"name": '10', "type":'Getting Started', "ref_id":'page10', "path":'#/page10'}, 									
									{"name": '11', "type":'Getting Started', "ref_id":'page7', "path":'#/page11'}, 									
									{"name": '12', "type":'Getting Started', "ref_id":'page7', "path":'#/page12'}, 									
									{"name": '13', "type":'Getting Started', "ref_id":'page7', "path":'#/page13'}, 									
									{"name": '14', "type":'Getting Started', "ref_id":'page7', "path":'#/page14'}, 									
									{"name": '15', "type":'Getting Started', "ref_id":'page7', "path":'#/page15'}, 									
									{"name": '16', "type":'Getting Started', "ref_id":'page7', "path":'#/page16'}];*/
		//query search
		$("#query_input").keyup(function(){
			var search_keyword = $(this).val();
			var search_count = 0;
			
	 
			if(search_keyword == ""){
				$(".reset_query_btn, .query_results_count, .query_results_field").hide()
				$("#query_input").val("");
				$(".query_results_field").empty();
			}else{
				//show and empty
				$(".reset_query_btn, .query_results_count, .query_results_field").show()
				$(".query_results_field").empty();
				$("#query_keywords").text(search_keyword);		
				tar = search_keyword.toLowerCase();
				$.each( menual_search_array, function( i, item ) {
					var name = item.name.toLowerCase()
					var type = item.type.toLowerCase()
					var index_name = name.indexOf(tar);
					var index_type = type.indexOf(tar);
					if(index_name != -1 || index_type != -1){
						var final_result = '<li class="query_results_indiv">'+
												'<a ref="'+item.ref_id+'" href="'+item.path+'">'+
													'<div class="query_name">'+item.name+'</div>'+
													'<div class="query_path">'+item.type+'</div>'+
												'</a>'+
											'</li>';
						$(".query_results_field").append(final_result);
						search_count++;
					}						  
				});
				$("#query_num").text(search_count);

				//go to searched item's page
				$(".query_results_indiv>a").click(function(){
					search_off();
					var this_ref_id = $(this).attr("ref");
					var target_menu_obj = $("li>a[id='"+this_ref_id+"']");
					target_menu_obj.click();
					//expand menu
					target_menu_obj.parents("ul").slideDown();	
					target_menu_obj.parents(".menual_menu_gp, .menual_menu_gp2, .menual_menu_gp3, .menual_menu_gp4").attr("ref","gp_selected");
				});
				//effect
				$(".query_results_indiv").mouseover(function(){
					$(this).find(".query_name").addClass("query_results_indiv_hover");
				});
				$(".query_results_indiv").mouseout(function(){
					$(this).find(".query_name").removeClass("query_results_indiv_hover");
				});
			}
		 });
		//reset btn click
		$(".reset_query_btn").click(function(){
			$(".reset_query_btn, .query_results_count, .query_results_field").hide()
			$("#query_input").val("");
			$(".query_results_field").empty();
		});
	
	
	
	// menu/search btn - show or hide--------------------------------------------------------------------------------
	function menu_off(){
		$(".menu_btn").attr("this_selected","n");
		$(".menual_menu").attr("this_hidden","y");
		$(".menual_menu").attr("hidden_lock","n");		
	}
	function menu_on(){
		$(".menu_btn").attr("this_selected","y");
		$(".menual_menu").attr("this_hidden","n");
		$(".menual_menu").attr("hidden_lock","y");	
	}
	function search_off(){
		$(".search_btn").attr("this_selected","n");
		$(".menual_search").attr("this_hidden","y");
		$(".menual_search").attr("hidden_lock","n");	
	}
	function search_on(){
		$(".search_btn").attr("this_selected","y");
		$(".menual_search").attr("this_hidden","n");
		$(".menual_search").attr("hidden_lock","y");
	}
	
	$(".menu_btn").click(function(){ 
		var this_attr = $(this).attr("this_selected");
		if(this_attr == "y"){
			menu_off();
		}else{
			menu_on();
			search_off();
		}
	});
	$(".search_btn").click(function(){ 
		var this_attr = $(this).attr("this_selected");
		if(this_attr == "y"){
			search_off();
		}else{
			search_on();
			menu_off();
		}
	});

	//when size <-875--------------------------------------------------------------------------------
	var menu_hidden_lock = $(".menual_menu").attr("hidden_lock");
	if(menu_hidden_lock == "n"){
		if ($(window).width() <= 875){ 
			$(".menual_menu_ul_sib li>a").click(function(){ 
				if($(this).hasClass( "menu_heading" ) || $(this).hasClass( "menu_heading2" ) || $(this).hasClass( "menu_heading3" ) || $(this).hasClass( "menu_heading4" )){
					$(".menu_btn").attr("this_selected","y");
					$(".menual_menu").attr("this_hidden","n");
				}else{
					$(".menu_btn").attr("this_selected","n");
					$(".menual_menu").attr("this_hidden","y");
				}
			});
		}
	}
	
	if ($(window).width() <= 875){
		menu_off();
		$(".menual_menu_ul_sib>li>a:not('.menu_heading, .menu_heading2, .menu_heading3, .menu_heading4'),.menual_menu_ul_sib2>li>a:not('.menu_heading, .menu_heading2, .menu_heading3, .menu_heading4'),.menual_menu_ul_sib3>li>a:not('.menu_heading, .menu_heading2, .menu_heading3, .menu_heading4'),.menual_menu_ul_sib4>li>a:not('.menu_heading, .menu_heading2, .menu_heading3, .menu_heading4')").click(function(){ 
			menu_off();
		});
	}

	//responsive
	$(window).resize(function(){
		var menu_hidden_lock = $(".menual_menu").attr("hidden_lock");
		if(menu_hidden_lock == "n"){
			if ($(window).width() <= 875){	
				$(".menu_btn").attr("this_selected","n");
				$(".menual_menu").attr("this_hidden","y");
			}else if ($(window).width() >= 875){	
				$(".menu_btn").attr("this_selected","y");
				$(".menual_menu").attr("this_hidden","n");
			}		
		}
	});

	
	
});

//--------------------------------------------------------------------------------------------Function------------------------------------//

