$(document).ready(function() { 
	var url = window.location.href;
	if (url.indexOf(".html")>0){
		$("a").each(function(){
			var this_href = $(this).attr("href");
			if (this_href.indexOf(".png")<0){
				if (this_href.indexOf("://")<0){
					var this_href = this_href.replace("#/", "");
					var this_href = this_href.replace(this_href, "./"+this_href+".html");
					$(this).attr("href",this_href);
				}
			}
		});
	}		
});

//--------------------------------------------------------------------------------------------Function------------------------------------//

