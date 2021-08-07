'use strict'
{

    class Panel {
        constructor(){
            

            const section = document.createElement('section');
            section.classList.add('panel');

            this.img = document.createElement('img');
            this.img.src='img/seven.png';

            this.timeoutId = undefined;

            this.stop = document.createElement('div');
            this.stop.textContent = 'STOP!'
            this.stop.classList.add('stop','inactive');
            
            

            section.appendChild(this.img)
            section.appendChild(this.stop)

            const main = document.querySelector('main');
            main.appendChild(section);

                
                //ストップボタンを押した時の処理
                this.stop.addEventListener('click',()=>{


                if(gogoNum === hitNum){
                    this.img.src = 'img/seven.png';

                }
                if(hitNum !== gogoNum){
                    panels[2].img.src = 'img/cherry.png';
                }

                //アクティブクラスがついてれば何も反応させない処理
                if(this.stop.classList.contains('inactive')){
                    return;
                }
                //アクティブクラスの付与
                this.stop.classList.add('inactive');

                //図柄の回転を止める処理
                clearTimeout(this.timeoutId);

                //パネルの数を減らす処理　stopボタンの数　＝　panelsLeftの数
                panelsLeft--;


                //パネルの数が0になった時の処理
                if(panelsLeft === 0){
                    
                //全てのパネルの判定処理を行う関数を発動！
                checkResult();

                gogo.classList.remove('blue');
                document.querySelector('h1').classList.add('hidden');

    
                
                //スピンパネルについているアクティブクラスの削除　＝　もう一度押せるようになり、遊べる
                spin.classList.remove('inactive');

                //パネルの数をリセット
                panelsLeft = 3;
                }

            })

        }

        //図柄をランダムに渡す関数
        getRandomImages(){
            const images =[
                'img/bell.png',
                'img/cherry.png',
                'img/seven.png'
            ]
            return images[Math.floor(Math.random()* images.length)];
        }

        // 図柄を回転させる関数　＝　50ミリ秒でランダムに図柄（写真）が出る動き
        spin(){
            this.img.src = this.getRandomImages();
            this.timeoutId = setTimeout(()=>{
                this.spin();
            },40)
        }


        // 3つ同じ図柄が揃わなかった時に行う処理
        isUnmatched(p1,p2){
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
        }
        unmatch(){
            this.img.classList.add('unmatched');
            
        }
        

        // もう一度遊べる状態に戻す関数
        active(){
            this.img.classList.remove('unmatched');
            this.stop.classList.remove('inactive');
        }
    }





    const hitNum = 1;
    let gogoNum = 0;
    
            
    const gogo = document.getElementById('gogolamp');

            

    // ペカリの関数
    const gogoFlash = () =>{
       
        gogo.classList.add('blue');
        document.querySelector('h1').classList.remove('hidden');
        
        
        


    }

    

    // 図柄が揃ったかの判定を行う処理
    const checkResult = ()=>{
        if(panels[0].isUnmatched(panels[1],panels[2])){
              panels[0].unmatch();
        }
        if(panels[1].isUnmatched(panels[0],panels[2])){
              panels[1].unmatch();
        }
        if(panels[2].isUnmatched(panels[0],panels[1])){
              panels[2].unmatch();
        }
        
    }

    // 図柄パネルの配列
    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),

    ]

    // パネルの初期設定
    let panelsLeft = 3;

    // スピンボタンを押した時の処理
    const spin = document.getElementById('spin');
    spin.addEventListener('click',()=>{
        gogoNum = Math.floor(Math.random()*3);
        console.log(gogoNum)
        if(hitNum === gogoNum){
            gogoFlash();
        }
        
        // アクティブクラスがついている時の処理=何もできない
        if(spin.classList.contains('inactive')){
            return;
        }
    
    // アクティブクラスが付与される
    spin.classList.add('inactive');

    //パネル全てに
        panels.forEach((panel)=>{
            panel.active();
            panel.spin();
        })
    })



}