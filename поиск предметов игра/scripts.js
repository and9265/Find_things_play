const canva=document.getElementById("canva");
const holst=canva.getContext('2d');
const cord=document.getElementById("cord");
let stuff=document.getElementsByClassName(".fm");

let map=["0.jpg","1.jpg","2.jpg"];
let objectname=[["камера","телефон","мяч","круг на стене","кинолента"],["шапка","корабль","микроскоп","часы","фонарь"],["настенные часы","банка с вареньем","весы","хрустальный стакан","блюдце с вареньем"]];
let objectcoords=[[[266,245],[686,222],[143,338],[495,176],[189,312]],[[720,200],[123,198],[455,115],[480,217],[488,47]],[[232,143],[363,274],[534,188],[642,246],[32,255]]];

let stuffcords=[[720,200],[123,198],[455,115],[480,217],[488,47]];
let win=0;
let len=stuff.length;
let chouse=getRandomInt(3);

function Sleep(delay)
{
    return new Promise(resolve=>setTimeout(resolve,delay));
}
function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}
function LoadObject()
{
    for(let i=0;i<len;i++)
        {
            stuff[i].innerHTML=objectname[chouse][i];
            stuff[i].style.color="black";
        }
}


LoadObject();
async function Findmouse(e)
{
    for(let i=0;i<len;i++)
        {
            //if(e.offsetX>stuffcords[i][0]-8&&e.offsetX<stuffcords[i][0]+8 && e.offsetY>stuffcords[i][1]-8&&e.offsetY<stuffcords[i][1]+8)
            console.log("x: "+e.offsetX+" y: "+e.offsetY);
            console.log(objectcoords[chouse][i][0]-8);
            console.log(objectcoords[chouse][i][0]+8);
            console.log(objectcoords[chouse][i][1]-8);
            console.log(objectcoords[chouse][i][1]+8);
            console.log("-----");
            console.log(e.offsetX>objectcoords[chouse][i][0]-8);
            console.log(e.offsetX<objectcoords[chouse][i][0]+8);
            console.log(e.offsetY>objectcoords[chouse][i][1]-8);
            console.log(e.offsetY<objectcoords[chouse][i][1]+8);
                
            if((e.offsetX>objectcoords[chouse][i][0]-10) && (e.offsetX<objectcoords[chouse][i][0]+10) && (e.offsetY>objectcoords[chouse][i][1]-10) && (e.offsetY<objectcoords[chouse][i][1]+10) )
                {
                    stuff[i].style.color="red";
                    win++;
                    await Sleep(500);
                    if(win==len)
                        {
                            alert("ты победил!!!");
                            if(confirm("играть снова?")==true)
                                location.reload();
                            
                        }
                        
                }
        }
}
canva.onmousedown=Findmouse;


let img=new Image(760,428);
img.src=map[chouse];
img.onload=function()
{
    let texture=holst.createPattern(img,'no-repeat');
    holst.fillStyle=texture;
    holst.fill();
}
canva.addEventListener('mousemove',e=>
{
    holst.clearRect(0,0,760,428);
    holst.beginPath();
    holst.arc(e.offsetX,e.offsetY,30,0,7);
    holst.closePath();
    holst.fill();
    cord.innerHTML="x: "+e.offsetX+" y: "+e.offsetY;
})