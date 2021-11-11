window.addEventListener('load', function () {
  const canvas_id = 'canvas-wrap';
  const context = get('canvas_nurie').getContext('2d');
  let counter = 0;
  let click = 0;
  //共通変数宣言
  let cnvColor = 'rgba(255,0,0,1)'; //線の色
  let cnvBold = '1'; //線の太さ

  setBg();
  setOverlay();

  function get(e) {
    return document.getElementById(e);
  }
  //canvas上でのイベント(canvas1)
  get(canvas_id).addEventListener('mousedown', function () {
    // マウス押下
    click = 1;
    outputLog('mouese down ' + click);
  });
  get(canvas_id).addEventListener('touchstart', function () {
    // マウス押下
    click = 1;
    outputLog('touch start ' + click);
  });
  get(canvas_id).addEventListener('mouseup', function () {
    // マウス押下終了
    click = 0;
    outputLog('mouese up ' + click);
  });
  get(canvas_id).addEventListener('touchend', function () {
    // マウス押下終了
    click = 0;
    outputLog('touch end ' + click);
  });
  get(canvas_id).addEventListener('mousemove', function (e) {
    // マウス移動
    counter++;
    // outputLog('mouese move ' + counter + ' ' + click);
    if (!click) return false;
    let rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    draw(x, y);
  });
  get(canvas_id).addEventListener('touchmove', function (e) {
    // マウス移動
    e.preventDefault(); // 画面スクロールを防止
    counter++;
    // outputLog('touch move ' + counter + ' ' + click);
    if (!click) return false;
    let rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    draw(x, y);
  });
  get(canvas_id).addEventListener('mouseleave', function () {
    // マウス外遷移
    click = 0;
    outputLog('mouese leave ' + click);
  });
  get('pen').addEventListener('click', function () {
    // ペン
    context.globalCompositeOperation = 'source-over';
    get('nowTool').innerHTML = 'ペン';
  });
  get('eraser').addEventListener('click', function () {
    // 消しゴム
    context.globalCompositeOperation = 'destination-out';
    get('nowTool').innerHTML = '消しゴム';
  });
  get('bold1').addEventListener('click', function () {
    //線の太さ
    cnvBold = '1'; 
    get('nowBold').innerHTML = '太さ小';
  });
  get('bold2').addEventListener('click', function () {
    //線の太さ
    cnvBold = '5'; 
    get('nowBold').innerHTML = '太さ中';
  });
  get('bold3').addEventListener('click', function () {
    //線の太さ
    cnvBold = '10'; 
    get('nowBold').innerHTML = '太さ大';
  });
  get('bold4').addEventListener('click', function () {
    //線の太さ
    cnvBold = '40'; 
    get('nowBold').innerHTML = '太さ極大';
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
  get('clear').addEventListener('click', function () {
    // 青色
    clearCanvas(get('canvas_nurie'));
  });
  get('marge').addEventListener('click', function () {
    // 青色
    let canvasResult = document.getElementById('canvas_result');
    let contextResult = canvasResult.getContext('2d');
    clearCanvas(canvasResult);
    contextResult.drawImage(canvasToImage(get('canvas_base')), 0, 0);
    contextResult.drawImage(canvasToImage(get('canvas_nurie')), 0, 0);
  });
  get('zoomin').addEventListener('click', function () {
    // 青色
    let canvasResult = document.getElementById('canvas_result');
    scale([get('canvas_base'), get('canvas_nurie')]);
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
  // 台紙
  function setBg() {
    const canvas_base = document.getElementById('canvas_base');
    const context_base = canvas_base.getContext('2d');

    const image = new Image();
    // image.src =
    //   'https://images.unsplash.com/photo-1515513284006-9a59075694b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    image.src = './nurie.png';
    image.addEventListener(
      'load',
      function () {
        context_base.drawImage(image, 0, 0, 500, 300);
      },
      false
    );
  }
  // 台紙
  function setOverlay() {
    const canvas_overlay = document.getElementById('canvas_overlay');
    const context_overlay = canvas_overlay.getContext('2d');

    const image = new Image();
    image.src = './nurie_toumei.png';
    image.addEventListener(
      'load',
      function () {
        context_overlay.drawImage(image, 0, 0, 500, 300);
      },
      false
    );
  }
  // キャンバスをクリア
  function clearCanvas(canvas) {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  // キャンバスをクリア
  function canvasToImage(canvas) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = canvas.toDataURL();
    return image;
  }
  function outputLog(log) {
    get('debug_log').innerHTML = log +'<br/>' + get('debug_log').innerHTML;
  }
  function scale(canvasArray) {
    canvasArray.forEach( (canvas, index) => {
      let sclaleCtx = canvas.getContext('2d');
      sclaleCtx.scale(10, 10);
    });
  }
});
