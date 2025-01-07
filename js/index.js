$(function(){

    // グローバルナビゲーション（ハンバーガーメニュー）
    $(".btn-gnavi").on("click", function(){
        var rightVal = 0; // メニューが開く場合の位置
        if($(this).hasClass("open")) { // 既に開いている場合
            rightVal = -300; // メニューを閉じる位置
            $(this).removeClass("open"); // クラスを削除（閉じる状態に）
        }
        else { // 閉じている場合
            $(this).addClass("open"); // クラスを追加（開く状態に）
        }
        // メニューのアニメーション
        $(".menu-gnavi").stop().animate({
            right: rightVal // 指定した位置にアニメーション移動
        }, 300); // アニメーション時間（300ms）
    });

    // スライドショーの設定
    var imgList = [ // スライド画像のパスを配列で定義
        "img/img01.jpg",
        "img/img02.jpg",
        "img/img03.jpg",
        "img/img04.jpg"
    ];

    // スライダーとナビゲーションを動的に生成
    for(var i = 0; i < imgList.length; i++) {
        // スライダー内の<li>要素を作成
        var slide = document.createElement("li");
        slide.innerHTML = "<img src='" + imgList[i] + "'>"; // 画像を埋め込む
        document.getElementsByClassName("slider-inner")[0].appendChild(slide); // スライダーに追加

        // ナビゲーション内の<li>要素を作成
        var nav = document.createElement("li");
        nav.setAttribute("data-nav-index", i); // インデックスを設定
        nav.style.backgroundImage = "url(" + imgList[i] + ")"; // ナビゲーションの背景に画像を設定
        nav.style.width = 100 / imgList.length + "%"; // 幅を均等に設定
        document.getElementsByClassName("nav")[0].appendChild(nav); // ナビゲーションに追加
    }

    // 変数の初期設定
    var length = imgList.length - 1; // スライドの最後のインデックス
    var slider = document.getElementsByClassName("slider-inner")[0].getElementsByTagName("li"); // スライダー要素を取得
    var nav = document.getElementsByClassName("nav")[0].getElementsByTagName("li"); // ナビゲーション要素を取得
    var nowIndex = 0; // 現在表示中のスライドインデックス
    var isChanging = false; // アニメーション中かどうかのフラグ
    var slideTimer; // アニメーションタイマー

    // 初期状態として最初のスライドとナビゲーションにクラスを追加
    slider[nowIndex].classList.add("show");
    nav[nowIndex].classList.add("current");

    // スライドを切り替える関数
    function sliderSlide(val) {
        if(isChanging) return false; // アニメーション中は処理を中断
        isChanging = true; // フラグを設定
        slider[nowIndex].classList.remove("show"); // 現在のスライドを非表示
        nav[nowIndex].classList.remove("current"); // 現在のナビゲーションを非アクティブ化
        nowIndex = val; // 表示するスライドのインデックスを更新
        slider[nowIndex].classList.add("show"); // 次のスライドを表示
        nav[nowIndex].classList.add("current"); // 次のナビゲーションをアクティブ化
        slideTimer = setTimeout(function(){
            isChanging = false; // アニメーション終了後フラグを解除
        }, 600); // アニメーション時間（600ms）
    }

    // 前のスライドに移動するボタンの処理
    document.getElementById("arrow-prev").addEventListener("click", function(){
        var index = nowIndex - 1; // 前のスライドのインデックス
        if(index < 0) index = length; // 最初のスライドに戻る
        sliderSlide(index);
    }, false);

    // 次のスライドに移動するボタンの処理
    document.getElementById("arrow-next").addEventListener("click", function(){
        var index = nowIndex + 1; // 次のスライドのインデックス
        if(index > length) index = 0; // 最後のスライドから最初に戻る
        sliderSlide(index);
    }, false);

    // ナビゲーションをクリックしたときの処理
    for(var i = 0; i < nav.length; i++) {
        nav[i].onclick = function(){
            var index = Number(this.getAttribute("data-nav-index")); // クリックしたナビゲーションのインデックスを取得
            sliderSlide(index); // 該当のスライドに移動
        };
    }

    // ポップアップ用Colorboxの初期化
    $(".popup").colorbox({
        fixed: true, // スクロール時に位置を固定
        iframe: true, // iframeを使用
        innerWidth: 640, // ポップアップの幅
        innerHeight: 359 // ポップアップの高さ
    });
    
});
