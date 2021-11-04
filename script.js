window.addEventListener('load', function () {
  const canvas_id = 'canvas';
  var canvas = document.getElementById(canvas_id);
  var context = canvas.getContext('2d');
  console.log(context);
  var counter = 0;
  var click = 0;
  //共通変数宣言
  var cnvColor = 'rgba(0,0,0,1)'; //線の色
  var cnvBold = '1'; //線の太さ

  const image = new Image();
  // image.src =
  //   'https://images.unsplash.com/photo-1515513284006-9a59075694b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  image.src = './nurie.png';
  image.addEventListener(
    'load',
    function () {
      context.drawImage(image, 0, 0, 500, 300);
    },
    false
  );

  function get(e) {
    return document.getElementById(e);
  }
  //canvas上でのイベント(canvas1)
  get(canvas_id).addEventListener('mousedown', function () {
    // マウス押下
    click = 1;
    console.log('mouese down ' + click);
  });
  get(canvas_id).addEventListener('mouseup', function () {
    // マウス押下終了
    click = 0;
    console.log('mouese up ' + click);
  });
  get(canvas_id).addEventListener('mousemove', function (e) {
    // マウス移動
    counter++;
    console.log('mouese move ' + counter + ' ' + click);
    if (!click) return false;
    var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    draw(x, y);
  });
  get(canvas_id).addEventListener('mouseleave', function () {
    // マウス外遷移
    click = 0;
    console.log('mouese leave ' + click);
  });
  get('pen').addEventListener('click', function () {
    // ペン
    context.globalCompositeOperation = 'source-over';
  });
  get('eraser').addEventListener('click', function () {
    // 消しゴム
    context.globalCompositeOperation = 'destination-out';
  });
  get('black').addEventListener('click', function () {
    // 黒色
    changeColor('rgba(0,0,0,1)');
    get('nowColor').innerHTML = '黒';
  });
  get('red').addEventListener('click', function () {
    // 赤色
    changeColor('rgba(255,0,0,1)');
    get('nowColor').innerHTML = '赤';
  });
  get('blue').addEventListener('click', function () {
    // 青色
    changeColor('rgba(0,0,255,1)');
    get('nowColor').innerHTML = '青';
  });

  //描画処理
  function draw(x, y) {
    context.lineWidth = cnvBold;
    context.strokeStyle = cnvColor;
    // 初回処理の判定
    if (click == '1') {
      click = '2';
      context.beginPath();
      context.lineCap = 'round'; //　線を角丸にする
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
    context.stroke();
  }
  // 色変更
  function changeColor(newColor) {
    cnvColor = newColor;
  }
});
