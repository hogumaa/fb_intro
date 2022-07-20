<!--

// 텍스트 필드에서 등록후 다음 포커스로 이동
function nextFocus(len, nextObj, obj){
	if(len <= obj.value.length){
		nextObj.focus();
	}
}

// 잘못된 메일체크
function emailCheck(str){ 
	var emailEx1 = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if(!emailEx1.test(str)){
		return false;
	}else{
		return true;
	}
}

// ltrim
function ltrim(s){
	return s.replace( /^[\ ]+/g , "" );
}

// rtrim
function rtrim(s) {
	return s.replace( /[\s*$ ]+$/g, "" );
}

// trim
function trim(s) {
	return rtrim(ltrim(s));
}

// numberFormat
function numberFormat(num) {
	num = num.toString();
	num = num.replace(/,/g, "")
	var num_str = num.toString()
	var result = ''

	for(var i=0; i<num_str.length; i++) {
		var tmp = num_str.length-(i+1)
		if(i%3==0 && i!=0) result = ',' + result
		result = num_str.charAt(tmp) + result
	}
	return result;
}	// end numberFormat function

// 메뉴등 숨기기또는 보이기
function displayBlock(obj){
	if(obj.style.display == 'none'){
		obj.style.display = 'block';
	}else{
		obj.style.display = 'none';
	}
}

// 쿠키 정보 return
function getCookie(name){ 
	key = name;
	arr_name = null;
	var aCookie = document.cookie.split("; ");
	var ret = '';

	for (var i=0; i < aCookie.length; i++) {
		if(!arr_name) {
			if(aCookie[i].substring(0, key.length) == key) {
				ret = unescape(aCookie[i].substring(key.length+1));
				break;
			}
		} else {
			if(aCookie[i].substring(0, arr_name.length) == arr_name) {
				var arCook = aCookie[i].substring(arr_name.length+1).split("|");
				for( var j=0; j < arCook.length; j++) {
					if(arCook[j].substring(0, key.length) == key) {
						ret = unescape(arCook[j].substring(key.length+1));
						break;
					}
				}
			}
		}
	}
	if(!ret) ret = '';
	return ret;
}	// end getCookie function


// set cookie 함수
function setCookie(name, val, expiredays){ 
	if(!isFinite(expiredays)){
		expiredays = 365;
	}
	var argc = this.setCookie.arguments.length;
	var argv = this.setCookie.arguments;	

	var expires = (argc > 2) ? argv[2] : 0;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : document.location.host;
	var secure = (argc > 5) ? argv[5] : false;

	if(expiredays != 0) {
		var todayDate = new Date(); 
		todayDate.setDate( todayDate.getDate() + expiredays );
		var expst = "; expires="+todayDate.toGMTString();
	} else expst = '';

	var cookstr = name + "=" + val +
	((expiredays == 0) ? "" : (expst)) +
	((path == null) ? "; path=/" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");

	document.cookie = cookstr;
}	// end setCookie function


// 회원로그인 체크
function memberLoginCheck(isSecure){
	var form = document.memberLoginForm;

	if(trim(form.id.value) == ""){
		alert("\n아이디를 입력하세요");
		form.id.focus();
		return false;
	}

	if(trim(form.password.value) == ""){
		alert("\n비밀번호를 입력하세요");
		form.password.focus();
		return false;
	}

	// 보안 처리
	if(!isFinite(isSecure)){
		new cryptSubmit(form, form.cryptKey);
	}else{
		new cryptSubmit(form, form.cryptKey, true);
	}
}


// 세션관련
sessionHandler = function(){
	this.docXML;				// XML데이터 return 값
	this.callback = null;		// XML결과 return함수
	this.httpRequest = null;	// httpRequest객체
	this.interEvent = null;		// 세션체크 인터벌 이벤트

	// httpRequest 객체 생성 함수
	sessionHandler.prototype.getXMLHttpRequest = function() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e1) { return null; }
			}
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else {
			return null;
		}
	}	//	end getXMLHttpRequest function
	
	// httpRequest send 함수
	sessionHandler.prototype.sendRequest = function(url, params, callback, method) {
		this.callback = callback;

		this.httpRequest = this.getXMLHttpRequest();
		var httpMethod = method ? method : 'GET';
		if (httpMethod != 'GET' && httpMethod != 'POST') {
			httpMethod = 'GET';
		}
		var httpParams = (params == null || params == '') ? null : params;
		var httpUrl = url;
		if (httpMethod == 'GET' && httpParams != null) {
			httpUrl = httpUrl + "?" + httpParams;
		}
		this.httpRequest.open(httpMethod, httpUrl, true);
		this.httpRequest.setRequestHeader(
			'Content-Type', 'application/x-www-form-urlencoded');
		
		var request = this;
		this.httpRequest.onreadystatechange = function() {
			request.onStateChange.call(request);
		}
		this.httpRequest.send(httpMethod == 'POST' ? httpParams : null);	
	}	// end sendRequest function

	// httpRequest return 함수
	sessionHandler.prototype.onStateChange = function() {
		this.callback(this.httpRequest);
	}	// end onStateChange end


	// 세션 지속체크
	sessionHandler.prototype.sessionCheck = function(){
		this.sendRequest("/core/xml/sessionHandler.xml.html", "", this.resultKey, "POST");
	}	// end requestXML function


	// XML결과
	sessionHandler.prototype.resultKey = function(){
		if(this.httpRequest.readyState == 4){
			if(this.httpRequest.status == 200){
				this.docXML = this.httpRequest.responseXML;
			}
		}
	}	// end resultXML function
	this.interEvent = setInterval("sessionHandler.sessionCheck();", 180000);
}
sessionHandler = new sessionHandler();

// 게시물 입력, 수정 체크 암호화 키
cryptSubmit = function(formObj, cryptObj, isSecure){
	this.docXML;				// XML데이터 return 값
	this.callback = null;		// XML결과 return함수
	this.httpRequest = null;	// httpRequest객체
	this.formObj = formObj;		// 전송폼
	this.cryptObj = cryptObj;	// 리턴 객체

	// 보안 체크
	if(!isFinite(isSecure)){
		this.isSecure = false;
	}else{
		this.isSecure = true;
	}

	// httpRequest 객체 생성 함수
	cryptSubmit.prototype.getXMLHttpRequest = function() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e1) { return null; }
			}
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else {
			return null;
		}
	}	//	end getXMLHttpRequest function
	
	// httpRequest send 함수
	cryptSubmit.prototype.sendRequest = function(url, params, callback, method) {
		this.callback = callback;

		this.httpRequest = this.getXMLHttpRequest();
		var httpMethod = method ? method : 'GET';
		if (httpMethod != 'GET' && httpMethod != 'POST') {
			httpMethod = 'GET';
		}
		var httpParams = (params == null || params == '') ? null : params;
		var httpUrl = url;
		if (httpMethod == 'GET' && httpParams != null) {
			httpUrl = httpUrl + "?" + httpParams;
		}
		this.httpRequest.open(httpMethod, httpUrl, true);
		this.httpRequest.setRequestHeader(
			'Content-Type', 'application/x-www-form-urlencoded');
		
		var request = this;
		this.httpRequest.onreadystatechange = function() {
			request.onStateChange.call(request);
		}
		this.httpRequest.send(httpMethod == 'POST' ? httpParams : null);	
	}	// end sendRequest function

	// httpRequest return 함수
	cryptSubmit.prototype.onStateChange = function() {
		this.callback(this.httpRequest);
	}	// end onStateChange end


	// 호출
	cryptSubmit.prototype.requestKey = function(){
		params = "";
		this.sendRequest("/core/xml/crypt_khkHjkHjkHbgd.xml.html", params, this.resultKey, "POST");
	}	// end requestXML function


	// XML결과
	cryptSubmit.prototype.resultKey = function(){
		if(this.httpRequest.readyState == 4){
			if(this.httpRequest.status == 200){
				this.docXML = this.httpRequest.responseXML;
				code = this.docXML.getElementsByTagName("code").item(0).firstChild.nodeValue;
				cryptKey = this.docXML.getElementsByTagName("cryptKey").item(0).firstChild.nodeValue;

				// 결과 실행
				switch (code){
					case 'trickKey':
						params  = "trickKey="+encodeURIComponent(cryptKey);
						this.sendRequest("/core/xml/crypt.xml.html", params, this.resultKey, "POST");						
						break;

					case 'cryptKey':
						this.cryptObj.value = cryptKey;

						// 보안 처리시 데이터 암호화
						if(this.isSecure == false){
							this.formObj.submit();
						}else{
							anySecure.startSecure(this.formObj);
						}
						break;

					default:
						alert("서버로 내용을 전달할수 없습니다.");
						break;
				}
			}
		}
	}	// end resultXML function
	this.requestKey();
}


// 새창 또는 레이어창 열기
openPage = function(){
	this.layerSkin = 'default';		// 레이어 스킨
	this.layerPos = 'RB';			// 레이어 위치(RB:우측아래, RT:우측상단, LB:좌측아래, LT:좌측상단)
	this.layerObj = null;			// 레이어 객체
	this.frameObj = null;			// 프레임 객체
	this.openType = 'layer';		// 새창열기 기본(layer ? popup)
	this.shadowDsp = true;			// 그림자처리 여부
	this.shadow = null;				// 그림자 레이어
	this.shadowInt = null;			// 그림자 레이어 크기조절 이벤트
	this.shadowAlpha = 30;			// 그림자 그림자 투명도(%)
	this.shadowColor = '#000000';	// 그림자 색상

	// 브라우져 호환성 체크 (IE9 이상은 IE이외 브라우져로 체크함)
	this.isIE = false;
	if((navigator.appName.indexOf('Microsoft')+1)){
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(navigator.userAgent) != null){ 
			rv = parseFloat(RegExp.$1);
			if(rv < 9) this.isIE = true;
		}
	}else{
		this.isIE = false;
	}	// end IE check if

	
	// 페이지 생성
	openPage.prototype.createPage = function(e, pWidth, pHeight, pUrl, pScroll, pX, pY){
		if(this.openType == "popup"){
			screenWidth = window.screen.width; // 윈도우 넓이
			screenHeight = window.screen.height; // 윈도우 높이
			if(!pScroll) pScroll = "auto";	// 스크롤링

			openLeft = (screenWidth - pWidth) / 2;
			openTop = (screenHeight - pHeight) / 3;
			openLeft = parseInt(openLeft);
			openTop = parseInt(openTop);

			window.open(pUrl, '', 'left='+openLeft+',top='+openTop+',height='+pHeight+',width='+pWidth+',toolbar=no,directories=no,status=no,linemenubar=no,scrollbars='+pScroll+',resizable=no,modal=yes,dependent=yes');
			
		}else{
			if(document.getElementById("layerFrame")) return false;	// 중복생성 방지
			this.layerObj = document.createElement("DIV");
			this.layerObj.setAttribute('id', 'layerFrame');
			this.layerObj.style.position = 'absolute';		
			this.layerObj.style.zIndex = '9999';
			this.layerObj.style.width = pWidth+"px";
			this.layerObj.style.height = pHeight+"px";


			// 레이어 위치를 정하지 않았을경우
			if(!pX || !pY){
				pX = (!window.event) ? e.pageX : document.documentElement.scrollLeft + document.body.scrollLeft + window.event.clientX;
				pY = (!window.event) ? e.pageY : document.documentElement.scrollTop + document.body.scrollTop + window.event.clientY;

				if(this.layerPos == 'RT'){
					pY = pY - pHeight;
				}else if(this.layerPos == 'LB'){
					pX = pX - pWidth;
				}else if(this.layerPos == 'LT'){
					pY = pY - pHeight;
					pX = pX - pWidth;
				}else{
				}

				pX += "px";
				pY += "px";

				this.layerObj.style.left = pX;
				this.layerObj.style.top = pY;
			}else{
				// 중앙 정렬일경우
				if(pX == -1){
					tmpWidth = ( document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth  );
					pX = (tmpWidth - pWidth) / 2;
					if(pX < 0) pX = 0;
					pX += "px";
				}

				if(pY == -1){
					tmpHeight = ( document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight  );
					pY = (tmpHeight - pHeight) / 2;
					if(pY < 0) pY = 0;
					pY += "px";
				}

				this.layerObj.style.left = pX;
				this.layerObj.style.top = pY;
			}

			if(this.shadowDsp) this.shadowCreate();	// 그림자 생성
			document.body.appendChild(this.layerObj);
			this.createSkin(pWidth, pHeight, pUrl, pScroll);
		}		
	}	// end createPage function


	// 페이지 삭제
	openPage.prototype.removePage = function(){
		if(this.shadow != null) this.shadowRemove();
		document.body.removeChild(this.layerObj);
		this.layerObj = null;
		this.frameObj = null;
	}	// end removePage function


	// 레이어 스킨 생성
	openPage.prototype.createSkin = function(pWidth, pHeight, pUrl, pScroll) {		
		if(!pScroll) pScroll = "auto";	// 스크롤링
		switch(this.layerSkin){
			case 'default':
				tmpWidth = parseInt(pWidth) + 12;
				htmlData = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\""+tmpWidth+"\" valign=\"top\"><table width=\""+tmpWidth+"\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/top_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_right.gif\"></td></tr><tr><td background=\"/core/images/layer_default/left_cen.gif\">&nbsp;</td><td valign=\"top\" bgcolor=\"#FFFFFF\"><iframe src=\""+pUrl+"\" width=\""+pWidth+"\" height=\""+pHeight+"\" frameborder=\"0\" marginwidth=\"10\" marginheight=\"10\" id=\"innerSetFrame\" scrolling=\""+pScroll+"\"></iframe></td><td background=\"/core/images/layer_default/right_cen.gif\">&nbsp;</td></tr><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/bot_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_right.gif\"></td></tr></table></td><td width=\"14\" valign=\"top\"><img src=\"/core/images/layer_default/btn_close.gif\" width=\"14\" height=\"46\" border=\"0\" style=\"cursor:pointer;\" onClick=\"openPage.removePage();\" /></td></tr></table>";
				break;

			default:
				tmpWidth = parseInt(pWidth) + 12;
				htmlData = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\""+tmpWidth+"\" valign=\"top\"><table width=\""+tmpWidth+"\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/top_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_right.gif\"></td></tr><tr><td background=\"/core/images/layer_default/left_cen.gif\">&nbsp;</td><td valign=\"top\" bgcolor=\"#FFFFFF\"><iframe src=\""+pUrl+"\" width=\""+pWidth+"\" height=\""+pHeight+"\" frameborder=\"0\" marginwidth=\"10\" marginheight=\"10\" id=\"innerSetFrame\" scrolling=\""+pScroll+"\"></iframe></td><td background=\"/core/images/layer_default/right_cen.gif\">&nbsp;</td></tr><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/bot_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_right.gif\"></td></tr></table></td><td width=\"14\" valign=\"top\"><img src=\"/core/images/layer_default/btn_close.gif\" width=\"14\" height=\"46\" border=\"0\" style=\"cursor:pointer;\" onClick=\"openPage.removePage();\" /></td></tr></table>";
				break;
		}
		this.layerObj.innerHTML = htmlData;
	}	//	end createShadow function
	

	// 레이어 그림자 생성
	openPage.prototype.shadowCreate = function() {

		docBody = document.body;
		this.shadow = document.createElement("DIV");		
		this.shadow.style.zIndex = "900";
		this.shadow.style.position = "absolute";
		this.shadow.style.top = "0px";
		this.shadow.style.left = "0px";
		this.shadow.style.width = ((document.documentElement.scrollWidth > document.body.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth) + 'px';
		this.shadow.style.height = ((document.documentElement.scrollHeight > document.body.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight) + 'px';
		this.shadow.style.background = this.shadowColor;
		this.shadow.style.backgroundAttachment = "fixed";
		this.shadow.setAttribute('id', 'pageShadow');
		this.shadow.style.filter = "Alpha(Opacity:"+this.shadowAlpha+");";
		this.shadow.style.opacity = this.shadowAlpha/100;
		docBody.appendChild(this.shadow); 
		this.shadow.style.display = "block";		
		this.shadowInt = setInterval("openPage.shadowResize();", 200);
	}	//	end createShadow function


	// 레이어 그림자 크기 조절
	openPage.prototype.shadowResize = function(){
		if(this.shadow != null){
			this.shadow.style.width = ((document.documentElement.scrollWidth > document.body.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth) + 'px';
			this.shadow.style.height = ((document.documentElement.scrollHeight > document.body.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight) + 'px';
		}
	}	// end shadowResize function


	// 레이어 그림자 삭제
	openPage.prototype.shadowRemove = function(){
		if(this.shadow != null){
			this.shadowInt = null;
			document.body.removeChild(this.shadow);
			this.shadow = null;
		}
	}	// end createShadow function

}
openPage = new openPage();


// 팝업레이어
function popupLayerLoad(){
	ptName = document.location.pathname;
	ptName = ptName.toLowerCase();
	if(ptName != "/main/main.html") return;

	ptHost = document.location.host;
	ptHost = ptHost.toLowerCase();
	rejectHost = new Array('admin.', 'bible.', 'cafe.', 'citms.', 'm.', 'photo.', 'webzine.', 'sms.');

	for(i = 0; i < rejectHost.length; i++){
		rej = rejectHost[i];
		rejLength = rejectHost[i].length;
		if(ptHost.substr(0, rejLength) == rej) return;
	}

	var popupScript = document.createElement("SCRIPT");
	popupScript.src = "/core/script/popupLayer.js";
	document.getElementsByTagName("head")[0].appendChild(popupScript);
}
popupLayerLoad();


/*
// 통계
userStatistics = function(){
	this.docXML;				// XML데이터 return 값
	this.callback = null;		// XML결과 return함수
	this.httpRequest = null;	// httpRequest객체

	// httpRequest 객체 생성 함수
	userStatistics.prototype.getXMLHttpRequest = function() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e1) { return null; }
			}
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else {
			return null;
		}
	}	//	end getXMLHttpRequest function
	
	// httpRequest send 함수
	userStatistics.prototype.sendRequest = function(url, params, callback, method) {
		this.callback = callback;

		this.httpRequest = this.getXMLHttpRequest();
		var httpMethod = method ? method : 'GET';
		if (httpMethod != 'GET' && httpMethod != 'POST') {
			httpMethod = 'GET';
		}
		var httpParams = (params == null || params == '') ? null : params;
		var httpUrl = url;
		if (httpMethod == 'GET' && httpParams != null) {
			httpUrl = httpUrl + "?" + httpParams;
		}
		this.httpRequest.open(httpMethod, httpUrl, true);
		this.httpRequest.setRequestHeader(
			'Content-Type', 'application/x-www-form-urlencoded');
		
		var request = this;
		this.httpRequest.onreadystatechange = function() {
			request.onStateChange.call(request);
		}
		this.httpRequest.send(httpMethod == 'POST' ? httpParams : null);	
	}	// end sendRequest function

	// httpRequest return 함수
	userStatistics.prototype.onStateChange = function() {
		this.callback(this.httpRequest);
	}	// end onStateChange end


	// 세션 지속체크
	userStatistics.prototype.statisticsCheck = function(){
		screenWidth = window.screen.width; // 윈도우 넓이
		screenHeight = window.screen.height; // 윈도우 높이
		params	= "action=userSta";
		params += "&screenWidth="+screenWidth;
		params += "&screenHeight="+screenHeight;
		this.sendRequest("/core/xml/userStatistics.xml.html", params, this.statisticsResult, "POST");
	}	// end requestXML function


	// XML결과
	userStatistics.prototype.statisticsResult = function(){
		if(this.httpRequest.readyState == 4){
			if(this.httpRequest.status == 200){
				this.docXML = this.httpRequest.responseXML;
			}
		}
	}	// end resultXML function
	setTimeout("userStatistics.statisticsCheck();", 3000);	
}
userStatistics = new userStatistics();
*/


//-->
