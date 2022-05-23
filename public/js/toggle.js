// All variable
var lines=document.getElementById("lines");
var cross=document.getElementById("cross");
var ul=document.getElementById("ul");
var flag=0;

// For change icon on header cross <--> lines
lines.addEventListener("click",()=>{
lines.classList.toggle("fa-x");
if(flag==0) {
    ul.style.display="flex";
    flag=1;
}
else if(flag==1) {
    ul.style.display="none";
    flag=0;
}
});