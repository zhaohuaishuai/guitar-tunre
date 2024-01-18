// Import stylesheets
import './style.css';
// Write Javascript code!
const appDiv = document.getElementById('app');
const cursor = document.getElementById('cursor');
const canvas = document.querySelector('#guitar');
const ctx = canvas.getContext('2d');
// 开启抗锯齿
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';
const w = canvas.width;
const h = canvas.height;
// 画吉他
drawGuitar({ active: 6 });
function drawGuitar({ active = -1 }) {
  // 清空画布
  ctx.clearRect(0, 0, w, h);
  // 重置原点
  ctx.translate(w / 2, 0);

  /**
   * 重置阴影
   */
  const resetShadow = (ctx) => {
    ctx.shadowColor = null;
    ctx.shadowOffsetX = null;
    ctx.shadowOffsetY = null;
    ctx.shadowBlur = null;
  };
  /**
   * 绘制固定钉
   */
  const drawArc = (ctx, x, y) => {
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.fillStyle = '#c6c5c3';
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    resetShadow(ctx);
  };

  /**
   * 绘制弦
   */
  const drawChord = ({
    ctx,
    lineWidth,
    strokeStyle = '#c6c5c3',
    x,
    xoffset,
    y,
    isActive = false,
  }) => {
    ctx.beginPath();
    if (isActive) {
      strokeStyle = '#ffffff';
      ctx.shadowColor = 'rgba(255,255,255,0.8)';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 20;
    }
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    ctx.moveTo(x, y);
    ctx.lineTo(x + xoffset, 1000);
    ctx.lineTo(x + xoffset, 1300);
    ctx.stroke();
    if (isActive) {
      resetShadow(ctx);
    }
  };
  /**
   * 绘制按钮
   */
  const drawBtn = ({ x, y, direction = 'left', isActive = false }) => {
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = isActive ? '#ffffff' : '#c6c5c1';
    if (isActive) {
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(255,255,255,0.5)';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (direction === 'left') {
      ctx.lineTo(x - 35, y);
      ctx.quadraticCurveTo(x - 35, y - 30, x - 45, y - 40);
      ctx.lineTo(x - 45, y - 40);
      ctx.lineTo(x - 85, y - 40);
      ctx.quadraticCurveTo(x - 115, y + 10, x - 85, y + 60);
      ctx.lineTo(x - 85, y + 60);
      ctx.lineTo(x - 45, y + 60);
      ctx.quadraticCurveTo(x - 35, y + 60, x - 35, y + 20);
      ctx.lineTo(x - 35, y + 20);
      ctx.lineTo(x - 5, y + 20);
    } else if (direction === 'right') {
      ctx.lineTo(x + 35, y);
      ctx.quadraticCurveTo(x + 35, y - 30, x + 45, y - 40);
      ctx.lineTo(x + 45, y - 40);
      ctx.lineTo(x + 85, y - 40);
      ctx.quadraticCurveTo(x + 115, y + 10, x + 85, y + 60);
      ctx.lineTo(x + 85, y + 60);
      ctx.lineTo(x + 45, y + 60);
      ctx.quadraticCurveTo(x + 35, y + 60, x + 35, y + 20);
      ctx.lineTo(x + 35, y + 20);
      ctx.lineTo(x + 5, y + 20);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    if (isActive) {
      resetShadow(ctx);
    }
  };
  /**
   * 绘制轮廓
   */
  const drawOutline = () => {
    ctx.lineWidth = 0;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-100, 20);
    ctx.quadraticCurveTo(-200, 130, -300, 160);
    ctx.quadraticCurveTo(-230, 500, -280, 800);
    ctx.lineTo(-280, 800);
    ctx.quadraticCurveTo(-180, 850, -150, 1000);

    ctx.lineTo(-150, 1300);
    ctx.lineTo(0, 1300);
    ctx.lineTo(150, 1300);
    ctx.lineTo(150, 1000);
    ctx.quadraticCurveTo(180, 850, 280, 800);
    ctx.quadraticCurveTo(230, 500, 300, 160);
    ctx.quadraticCurveTo(200, 130, 100, 20);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = '#9f5346';
    ctx.fill();

    ctx.fillStyle = '#fefefe';
    ctx.fillRect(-150, 1000, 300, 40);

    ctx.fillStyle = '#000';
    ctx.fillRect(-150, 1040, 300, 260);
  };

  const isHasActive = ({ index, item }) => {
    if (active === 6 - index) {
      item.isActive = true;
    }
  };

  drawOutline();
  const arcX = 180;
  let chordColor = '#c6c5c3';

  const chordArr = [
    {
      ctx,
      lineWidth: 7,
      strokeStyle: chordColor,
      x: -arcX + 20,
      xoffset: 50,
      y: 660,
    },
    {
      ctx,
      lineWidth: 6,
      strokeStyle: chordColor,
      x: -arcX + 10,
      xoffset: 100,
      y: 460,
    },
    {
      ctx,
      lineWidth: 5,
      strokeStyle: chordColor,
      x: -arcX,
      xoffset: 155,
      y: 260,
    },
    {
      ctx,
      lineWidth: 4,
      strokeStyle: chordColor,
      x: arcX,
      xoffset: -160,
      y: 260,
    },
    {
      ctx,
      lineWidth: 3,
      strokeStyle: chordColor,
      x: arcX - 10,
      xoffset: -100,
      y: 460,
    },
    {
      ctx,
      lineWidth: 2,
      strokeStyle: chordColor,
      x: arcX - 20,
      xoffset: -40,
      y: 660,
    },
  ];

  chordArr.forEach((item, index) => {
    isHasActive({ active, index, item });
    drawChord(item);
  });

  drawArc(ctx, -arcX, 260);
  drawArc(ctx, -arcX + 10, 460);
  drawArc(ctx, -arcX + 20, 660);
  drawArc(ctx, arcX, 260);
  drawArc(ctx, arcX - 10, 460);
  drawArc(ctx, arcX - 20, 660);

  const btnDataArr = [
    { x: -285, y: 660 },
    { x: -285, y: 460 },
    { x: -295, y: 260 },
    { x: 295, y: 260, direction: 'right' },
    { x: 285, y: 460, direction: 'right' },
    { x: 285, y: 660, direction: 'right' },
  ];

  btnDataArr.forEach((item, index) => {
    isHasActive({ active, index, item });
    drawBtn(item);
  });

  const drawDull = ({ x, y, text, isActive }) => {
    ctx.beginPath();
    const radius = 40;
    ctx.fillStyle = isActive ? '#ffffff' : '#454545';
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    // 绘制文字
    ctx.fillStyle = isActive ? '#2f2f2f' : '#989898';
    ctx.font = '45px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y + 5);

    if (isActive) {
      let seped = 0;
      const animArc = () => {
        if (seped >= 10) {
          seped = 1;
          ctx.beginPath();
          ctx.strokeStyle = '#303030';
          ctx.lineWidth = 5;
          ctx.arc(x, y, radius + 10, 0, 2 * Math.PI, false);
          ctx.stroke();
        }
        seped += 0.08;
        let alp = seped / 10;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,255,255,${1 - alp})`;
        ctx.arc(x, y, radius + seped, 0, 2 * Math.PI, false);
        ctx.stroke();

        requestAnimationFrame(animArc);
      };
      animArc();
    }
  };

  const dullDataArr = [
    { x: -455, y: 680, text: 'E' },
    { x: -455, y: 460, text: 'D' },
    { x: -455, y: 260, text: 'A' },
    { x: 455, y: 260, text: 'G' },
    { x: 455, y: 460, text: 'B' },
    { x: 455, y: 660, text: 'E' },
  ];

  dullDataArr.forEach((item, index) => {
    isHasActive({ item, index });
    drawDull(item);
  });
}

// 游标左右移动
cursorMove();
function cursorMove() {}
