function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

var appsource = getQueryString("appsource");
$("#appsource").val(appsource);

/**
 * 判断用户是否已申请过进京证，申请过则不能跳转到下一页面
 * */
function openDivblack() {
	$.ajax({
		type : "post",
		url : "../../platform/enterbj/getCurPaperCount",
		data : {
			"userid" : $("#userid").val()
		},
		dataType : "json",
		success : function(msg) {
			if (msg.rescode == 200) {
				var count = msg.count;
				if (count > 0) {
					var tanwindowstr = "<div class='tan'>" + msg.resdes
							+ "</div>";
					$("#tanwindow2").append(tanwindowstr);
					return;
				} else {
					$('#applybj').submit();
				}
			}
			$('#applybj').submit();
		},
		timeout : 15000,
		error : function(msg) {
			$('#applybj').submit();
		}
	});
}