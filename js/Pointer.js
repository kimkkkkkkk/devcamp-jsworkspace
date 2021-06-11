/*갤러리의 썸네일을 쫓아다니는 사각 포인터*/
class Pointer{
    constructor(container, width, height, x,y ,a ,targetX){
        this.container=container;
        this.div=document.createElement("div");
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.a=a; //비율계수(부드러운 정도)
        this.targetX=targetX; // 목표지점
        this.init();
    }
    init(){
        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";
        this.div.style.position="absolute";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.div.style.border="5px solid yellow";
        this.div.style.boxSizing="border-box";// 보더가 박스사이즈에 영향을 미치지않게
        this.div.style.background="#ffffff"; 
        this.div.style.opacity=0.7;

        
        this.container.appendChild(this.div); //부모 요소에 부착
    }

    //감속도 운동~~ 나의 위치 = 나의 위치 + 비율계수*(목표지점과 나와의 거리차)
    tick(){ // 물리적 변화
        this.x=this.x+this.a*(this.targetX - this.x); // 계산
    }
    render(){ //화면에 보여주는 것
        this.div.style.left=this.x+"px";
    }
} 