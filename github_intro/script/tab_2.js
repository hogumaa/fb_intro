// 이미지 롤오버

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->


function Show_sub(type){
   for(i=0; i<document.all.sub_Div.length ; i++){
		if(i == type){
			document.all.sub_Div[i].style.display="block";
		} else {
			document.all.sub_Div[i].style.display="none";
		}
   }
}


function Show_sub2(type){
   for(i=0; i<document.all.sub_Div2.length ; i++){
		if(i == type){
			document.all.sub_Div2[i].style.display="block";
		} else {
			document.all.sub_Div2[i].style.display="none";
		}
   }
}


function Show_sub3(type){
   for(i=0; i<document.all.sub_Div3.length ; i++){
		if(i == type){
			document.all.sub_Div3[i].style.display="block";
		} else {
			document.all.sub_Div3[i].style.display="none";
		}
   }
}

function Show_sub4(type){
   for(i=0; i<document.all.sub_Div4.length ; i++){
		if(i == type){
			document.all.sub_Div4[i].style.display="block";
		} else {
			document.all.sub_Div4[i].style.display="none";
		}
   }
}
function Show_sub5(type){
   for(i=0; i<document.all.sub_Div5.length ; i++){
		if(i == type){
			document.all.sub_Div5[i].style.display="block";
		} else {
			document.all.sub_Div5[i].style.display="none";
		}
   }
}


  
  