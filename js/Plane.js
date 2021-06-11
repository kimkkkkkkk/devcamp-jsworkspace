/*
    비행기를 정의해본다!~~
    비행기라는 사용자 정의 자료형을 선언

*/ 
class Plane{
    /*변수, 함수가 올 수 있다*/

    //객체의 초기화는 생성자 메서드가 담당한다
    // 비행기가 어떤 특성을 가지고 태어날지를 결정!!
    constructor(container, src, width,height, x, y, velX, velY){
        //멤버변수 선언 및 초기화
        this.container=container; // 비행기가 붙을 부모 요소
        this.img = document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX; // 주인공의 x축으로의 속도를 결정
        this.velY=velY; // 주인공의 Y축으로의 속도를 결정

        //멤버변수를 이용한 속성값 지정
        this.img.src=this.src;
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
       
        //화면에 부착
        this.container.appendChild(this.img);
    }
    tick(){
        this.x+=this.velX; // 등속도 계속 누적
        this.y+=this.velY;

        if(this.x<=0){ // 좌측 화면 밖으로 나가지 않도록 !! 고정
            this.x=0;
        }

        //적군들과의 충돌체크, 나의 hp만 죽고 ,너죽고
       for(var i=0;i<enemyArray.length;i++){

            if(hitTest(this.img , enemyArray[i].img)){ 
                removeObject(this.container, enemyArray[i].img,  enemyArray, i);
                removeObject(info, hpArray[hpArray.length-1].img, hpArray ,hpArray.length-1);//나의 hp제거
                // 주인공의 에너지가 모든 소진되었는지.. hp 배열의 길이가 0이면 소진으로 본다,//전역변수 info 로 접근 매개에 없음
        
                if(hpArray.length==0){
                    var div = document.createElement("div");
                    div.style.fontSize="200px";
                    div.style.textAlign="center";
                    div.style.color="#ffffff";
                    div.style.fontWeight="bold";
                    div.style.height=600+"px";
                    div.innerHTML="GAME OVER <br><a href=\"javascript:location.reload()\">Retry</a>";
                    this.container.appendChild(div);//생성된 텍스트 div를 화면에 부착
                }
            } 
        }
    
        /*아이템을 정의한다
        candy1.png) 무기를 미사일로 전환
        candy2.png) 적군 모두 소멸
        candy3.png) hp 추가
        candy4.png) 주인공의 속도 업그레이드
        */ 

        //아이템 취득 (아이템과의 충돌검사)
        for(var i=0; i<itemArray.length;i++){
            if(hitTest( this.img , itemArray[i].img)){ // 아이템과 충돌발견
                var itemRole = itemArray[i].itemRole; // 사탕안에 들어있는 아이템롤 의 롤 , 주인공이랑 충돌한 한 아이템의 role
                
                removeObject(this.container, itemArray[i].img , itemArray, i);//사탕 제거
               
            
                //조건은 롤을 통해 처리가능...,어떤 사탕을 먹었는지를 조사
                switch(itemRole.role){
                    case 0:changeWeapon();break;//무기교체
                    case 1:clearEnemy();break;// 적군소멸
                    case 2:increaseHp();break;// hp추가
                    case 3:speedUp();break;// 스피드 증가

                }
            }
        } 
         

        //  console.log("this.x =", this.x);
        if(this.x >=screen.width-this.width){  // 우측 경계를 넘어서면 고정
            console.log("경계에 도착했어요");
            this.x =screen.width-this.width;
        }
    }
    // 틱 랜더 틱 랜더 틱 랜더 계속 같이 호출

    //변경된 값을 화면에 보여주기 위한 그래픽 처리 (게임분야, 그래픽 분야에서는 랜더링)
    // 주인공의 움직이는 방식을 결정하기 때문에  render 는 메서드라고 한다 
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}