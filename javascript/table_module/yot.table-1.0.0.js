


var $___TABLE = new Object();

$(function(){
	
	//PAGE NUM
	$(document).on("click", ".yotPage li", function(){
		var page = parseInt($(this).attr("data-page"));
		console.log("PAGE CLICK : " +page);
		
		yotTableList(page);
	});
	
	//PAGE BUTTON
	$(document).on("click", ".yotPage span", function(){
		var type = $(this).attr("data-type");
		var page = parseInt($(".yotPage li.on").attr("data-page"));
		
		if(type=="prev"){
			page = page - 10;
		}else{
			page = page + 10;
		}
		
		yotTableList(page);
		
	});
	
	
	
	//SEARCH BUTTON
	$(document).on("click", ".yotSearch .search_btn", function(){
		//$___TABLE.target.find("tbody").html(""); //테스트
		
		yotTableList(1);
	});
	
	
	
	
	
	//CHECKBOX CTRL
	$(document).on("change", "#yotCheckCtrl", function(){
		var ck = $(this).filter(":checked").val();
		var name = $(this).attr("data-name");
		
		if(ck){
			$("input[name="+name+"]").attr("checked", true);
		}else{
			$("input[name="+name+"]").attr("checked", false);
		}
		
		console.log(ck);
	});
	
	
	$(document).on("change", ".yotCheckBox", function(){
		var size = $(".yotCheckBox").length;
		var leng = $(".yotCheckBox:checked").length;
		
		if(size == leng){
			$("#yotCheckCtrl").attr("checked", true);
		}else{
			$("#yotCheckCtrl").attr("checked", false);
		}
		
	});
	
	
	
	
	
	//LIST CLICK
	$(document).on("click", ".yot_table tbody tr", function(){
		var seq = $(this).attr("data-id");
		if(seq){
			//$(location).attr("href", $___TABLE.view+seq);
		}
	});
	
});












/**
 * 
 * GLOBAL SETTINGS
 * 
 * @param name
 * @param type
 * @returns
 * 
 * 
 */
function yotTableData(name, type){
	
	var obj = {
		PRIM: {
			URL: "/board/boardPrimList",
			VIEW: "/board/view?type=prim&item=",
			HEAD: [{YOT_CHECK: "MEMBER_ID"}, {BOARD_SEQ: "시퀀스"}, {CATE_CODE: "카테고리"}, {BOARD_SUB: "제목"}, {INPUT_TIME: "날짜"}],
			SEARCH: ["STATUS", "FILTER", "DATE", "CONTENT"],
		},
	};
	
	return obj[name][type];
}


















function yotTableSearch(name){
	
	var list = new String();
	
	var search = yotTableData(name, "SEARCH");
	
	for(var i in search){
		
		switch(search[i]){
			case "STATUS":
				list += "<select name='board_status'>"+
						  "<option value='Y'>게시글</option>"+
						  "<option value='N'>삭제글</option>"+
						"</select>";
			break;
			
			case "FILTER":
				list += "<select name='board_filter'>"+
						  "<option value='board_search'>제목+내용</option>"+
						  "<option value='member_name'>작성자</option>"+
						  "<option value='member_id'>아이디</option>"+
						"</select>";
			break;
			
			case "DATE":
				list += "<input type='text' name='board_time' placeholder='작성-기간'>";
			break;
			
			case "CONTENT":
				list += "<input type='text' name='search_cont' placeholder='내용을 입력해 주세요'>";
			break;
		}
	}
	
	list += "<input type='button' class='search_btn' value='검색'>";
	
	return list;
}


/**
 * 
 * @author YOTDARK
 * 페이징 리스트
 * @param page
 * @returns
 * 
 */
function yotTablePage(page){
	
	//버튼 리셋
	$___TABLE.target.find(".yotPage span").removeClass("off");
	
	
	//현재 페이지 최소
	if(page <= 1){
		page = 1;
		$___TABLE.target.find(".yotPage span[data-type='prev']").addClass("off");
	}
	
	
	
	var list_view = 10; //게시물 행의 수
	var line_view = 10; //페이지 열의 수
	
	var rem = $___TABLE.size % list_view;
	var div = Math.floor($___TABLE.size / list_view);
		div = rem ? div + 1 : div;
	
	var end = page + (line_view / 2);
	var start = end - line_view;
	
	if(start < 1){
		start = 1;
		end = start + line_view;
	}
	
	if(end > div){
		end = div + 1;
		start = end - line_view;
	}
	
	if(end < line_view){
		start = 1;
	}
	
	
	
	//현재 페이지 최대
	if(page >= div){
		page = div;
		$___TABLE.target.find(".yotPage span[data-type='next']").addClass("off");
	}
	
	
	$___TABLE.target.find(".yotPage ul").html("");
	var list = new String();
	for(start; start<end; start++){
		list += "<li data-page="+start+">"+start+"</li>";
	}
	$___TABLE.target.find(".yotPage ul").append(list);
	
	$___TABLE.target.find(".yotPage li[data-page="+page+"]").addClass("on");
	
}

































function yotTableList($page){
	
	$page = $page ? $page : 1;
	
	
	//console.log("URL : " +$___TABLE.url);
	
	
	var param = {
		url: $___TABLE.url,
	};
	
	
	$(".yotSearch select[name]").map(function(){
		var name  = $(this).attr("name");
		var value = $(this).val();
		
		if(name=="board_filter"){
			var cont = $.trim($("input[name='search_cont']").val());
			if(cont){
				param[value] = cont;
			}
			
		}else{
			param[name] = value;
		}
	});
	
	
	$(".yotSearch input[name]").map(function(){
		var name  = $(this).attr("name");
		var value = $(this).val();
		
		if(name!="search_cont"){
			//param[name] = value;
		}
	});
	
	
	param.limit_start = ($page-1) * 10;
	param.limit_end   = 10;
	
	
	console.log("PARAM : " +JSON.stringify(param));
	
	
	
	//$.ajax({});
	
	/**
	 * 가상 데이터
	 */
	var result = {
		list: [
			{BOARD_SUB: "제목입니다 #01", MEMBER_ID: "kay@naver.com", CATE_CODE: "123", BOARD_SEQ: 16, BOARD_NUM: 1, BOARD_CONT: "내용입니다 3", BOARD_VIEW: 1001, INPUT_TIME: "21-01-01 10:10:00"},
			{BOARD_SUB: "제목입니다 #02", MEMBER_ID: "yot@gmail.com", CATE_CODE: "345", BOARD_SEQ: 29, BOARD_NUM: 2, BOARD_CONT: "내용입니다 4", BOARD_VIEW: 2021, INPUT_TIME: "21-01-02 11:30:00"},
		],
		size: 201,
	};
	
	
/*	
	var result = goCommonConn({
		url: "/board/boardPrimList",
		limit_start: ($page-1)*10,
		limit_end: 10,
	});
	
*/	
	$___TABLE.size = result.size;
	
	
	
	
	
	if(result.list.length){
		
		$___TABLE.target.find("tbody").html("");
		
		for(var i in result.list){
			var item = new String();
			
			for(var j in $___TABLE.head){
				var keys = Object.keys($___TABLE.head[j]);
				
				
				if(keys=="YOT_CHECK"){
					item += "<td><input type='checkbox' class='yotCheckBox' name="+$___TABLE.head[j][keys]+" value="+result.list[i][$___TABLE.head[j][keys]]+"></td>";
				}else if($___TABLE.name=="PRIM" && keys == "BOARD_SUB"){
					item += "<td>"+result.list[i][keys]+" ICON : "+result.list[i]["BOARD_VIEW"]+"</td>";
				}else if(keys == "INPUT_TIME"){
					item += "<td>"+kayDateFormat(result.list[i][keys], 1)+"</td>";
				}else{
					item += "<td>"+result.list[i][keys]+"</td>";
				}
				
			}
			
			var list = "<tr data-id="+result.list[i][$___TABLE.data]+">"+item+"</tr>";
			$___TABLE.target.find("tbody").append(list);
		}
		
	}else{
		//NO-DATA
	}
	
	
	
	//SET PAGING LIST
	yotTablePage($page);
}











/**
 * 
 * @author YOTDARK
 * 
 * @param name
 * UNIQUE 보드네임 : yotTableData.NAME
 * 
 * @param data
 * SEQUENCE 시퀀스 : attr.DATA-ID
 * 
 */
$.fn.yotTableStart = function(obj){
	
	//SET GLOBAL VARIABLE
	$___TABLE = {
		url: yotTableData(obj.name, "URL"),   //리스트 URL
		view: yotTableData(obj.name, "VIEW"), //상세 URL
		head: yotTableData(obj.name, "HEAD"),
		data: obj.data,
		name: obj.name,
		target: $(this),
	};
	
	
	
	
	
	//BASIC DRAW
	var basic = "<div class='yotSearch'></div>"+
				
				"<table>"+
				  "<thead>"+
				    "<tr><!-- obj.head --></tr>"+
				  "</thead>"+
				  "<tbody></tbody>"+
				"</table>"+
				
				"<div class='yotPage'>"+
				  "<span data-type='prev'></span>"+
				  "<ul><!-- PAGE --></ul>"+
				  "<span data-type='next'></span>"+
				"</div>";
	
	$(this).html(basic);
	$(this).addClass("yot_table");
	$(this).addClass(obj.name.toLowerCase());
	
	
	
	
	
	
	//SEARCH DRAW
	var search = yotTableSearch(obj.name);
	$(this).find(".yotSearch").html(search);
	
	
	
	
	
	
	
	//SET THEAD
	for(var i in $___TABLE.head){
		var keys = Object.keys($___TABLE.head[i]);
		
		var list = new String();
		
		if(keys=="YOT_CHECK"){
			list = "<th>"+
					"<input type='checkbox' id='yotCheckCtrl' data-name="+$___TABLE.head[i][keys]+">"+
				   "</th>";
		}else{
			list = "<th>"+$___TABLE.head[i][keys]+"</th>";
		}
		
		$(this).find("thead tr").append(list);
	}
	
	
	
	
	
	
	yotTableList();
};


