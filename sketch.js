let str=new Array(5),ANS,ans,Const;
let Line=[[-100,100],[100,-100],[-100,-100],[100,100],[0,0]];
let CenterCircle=[[200,200],[600,200],[200,550],[600,550]];
let notStart=true;
function setup() 
{
  createCanvas(800, 800);
  Intro();
}

function draw() 
{
  if (notStart)
  {
    if (mouseIsPressed && mouseX>=300 && mouseX<=500 && mouseY>=750 && mouseY<=800)
    {
      notStart=false;
      Start();
    }
    return;
  }
  //Start
  if (keyIsPressed && key.length==1)
  {
    if ("a"<=key && key<="z")
    {
      if (key==ans)
      {
        RightAnswer();
        return;
      }
      else
        WrongAnswer(String.fromCharCode(key.charCodeAt(0)-32));
    }
    if ("A"<=key && key<="Z")
    {
      if (key==ANS)
      {
        RightAnswer();
        return;
      }
      else
        WrongAnswer(key);
    }
  }
}

function Intro()
{
  background("#1EF5EF");
  push();
  textSize(45);
  textAlign(CENTER, TOP);
  text("Món kem đánh đố của Giovanni (2)",0,40,800);
  textSize(25);
  textAlign(LEFT, TOP);
  text("Thầy Noah rất thích thú với món kem đánh đố của ông chủ tiệm cà phê Giovani nên đã cố tình nhờ Giovani làm thêm một phiên bản khác cho cô bạn Rebecca. Tương tự như câu đố trước, các ký tự sẽ có giá trị từ 1-26 tương ứng với vị trí trong bảng chữ cái. Và Rebecca phải giải mật mã bí ẩn đó để khám phá ra ký tự còn thiếu. Bạn hãy giúp cô ấy một tay nhé!",20,150,760);
  fill("black");
  rect(300,750,200,50);
  textAlign(CENTER,CENTER);
  fill("white");
  textSize(35);
  text("Bắt đầu",0,780,800);
  pop();
}

function Start()
{
  background("#16E0DA");
  textSize(30);
  textAlign(LEFT, TOP);
  text("Trả lời bằng bàn phím nhé!",0,5);
  //init
  strokeWeight(5);  
  textAlign(CENTER, CENTER);
  textSize(30);
  Const=RandInt(-3,3);
  //string
  for (let i=0; i<4; ++i)
    str[i] = (Create5char());
  //create Ans with non-capital and capital
  ANS=str[3][4];
  ans=String.fromCharCode(ANS.charCodeAt(0)+32); 
  str[3]=str[3].substring(0,4)+"?";
  DrawQues();
}

function DrawQues()
{
  for (let k=0; k<4; ++k)
  {
    push();
      translate(CenterCircle[k][0],CenterCircle[k][1]); 
      for (let i=0; i<5; ++i)
      {
        line(0,0,Line[i][0],Line[i][1]);
        ellipse(Line[i][0],Line[i][1],100,100);
        text(str[k][i], 0, Line[i][1], 2*Line[i][0]);
      }
    pop();
  }
}

function RandInt(Min,Max) //so nguyen ngau nhien tu Min->Max
{
  return Math.round(random(Min-0.5,Max+0.5));
}

function Create5char() //sum=a+b+c+d+const
{
  //sum>=4+const
  sum=RandInt(4+Const,26); 
  //a<= sum-const-(1+1+1)
  a=RandInt(1,sum-Const-3);
  //b<=(sum-const)-a-(1+1)
  b=RandInt(1,sum-Const-2-a);
  //c<=(sum-const)-a-b-1
  c=RandInt(1,sum-Const-1-a-b);
  d=sum-Const-a-b-c;
  //convert 1-26 to 65-90
  return ( String.fromCharCode(a+64,b+64,c+64,d+64,sum+64) );
}

function RightAnswer()
{
  push();
  //thong bao
  noStroke();
  fill("#16E0DA");
  rect(0,705,800,100);
  fill("green");
  text("Bạn đã trả lời đúng rồi!",0,720,800);
  strokeWeight(5);
  ellipse(CenterCircle[3][0],CenterCircle[3][1],100,100);
  fill("white");
  text(ANS, 0, CenterCircle[3][1], CenterCircle[3][0]*2);
  //thong bao choi lai
  fill("#87E92A");
  rect(300,750,200,60);
  textAlign(CENTER,CENTER);
  fill("#3B1AD5");
  textSize(35);
  text("Chơi lại",0,780,800);
  notStart=true;
  pop();
}

function WrongAnswer(str)
{
  push();
  //thong bao
  fill("red");
  text("Bạn đã trả lời sai rồi! Thử tìm quy luật nhé",0,750,800);
  ellipse(CenterCircle[3][0],CenterCircle[3][1],100,100);
  fill("white");
  text(str, 0, CenterCircle[3][1], CenterCircle[3][0]*2);
  pop();
}

