let currentStep = 0;
    let score = 0;
    const steps = document.querySelectorAll('.step');
    const catchHeart = document.getElementById('catchHeart');
    const heartGame = document.getElementById('heartGame');
    const scoreEl = document.getElementById('score');

    function showStep(index) {
      steps.forEach(step => step.classList.remove('active'));
      steps[index].classList.add('active');
      currentStep = index;
      if (index === 1) moveHeart();
      if (index === 4) launchConfetti();
    }

    function nextStep() {
      showStep(currentStep + 1);
    }

    function createFloatingHearts() {
      setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['❤️','💖','💕','💗','💘'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (18 + Math.random() * 28) + 'px';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
      }, 350);
    }

    function createSparkles() {
      for (let i = 0; i < 35; i++) {
        const sp = document.createElement('div');
        sp.className = 'sparkle';
        sp.style.left = Math.random() * 100 + 'vw';
        sp.style.top = Math.random() * 100 + 'vh';
        sp.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(sp);
      }
    }

    function moveHeart() {
      const maxX = heartGame.clientWidth - 70;
      const maxY = heartGame.clientHeight - 70;
      catchHeart.style.left = Math.random() * maxX + 'px';
      catchHeart.style.top = Math.random() * maxY + 'px';
    }

    catchHeart.addEventListener('click', () => {
      score++;
      scoreEl.textContent = score;
      catchHeart.classList.add('shake');
      setTimeout(() => catchHeart.classList.remove('shake'), 450);
      if (score >= 5) {
        setTimeout(() => showStep(2), 500);
      } else {
        moveHeart();
      }
    });

    function openGift(box) {
      box.classList.add('open');
      document.getElementById('giftMessage').classList.remove('hidden');
      launchConfetti(50);
      setTimeout(() => showStep(3), 2500);
    }

    function blowCandle() {
      document.getElementById('flame').style.display = 'none';
      launchConfetti(120);
      setTimeout(() => showStep(4), 1200);
    }

    function launchConfetti(amount = 100) {
      const colors = ['#ff4d94', '#fff176', '#7c4dff', '#00e5ff', '#ffffff', '#ff1744'];
      for (let i = 0; i < amount; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDelay = Math.random() * 1.2 + 's';
        c.style.animationDuration = (2 + Math.random() * 2.5) + 's';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4500);
      }
    }

    function restartWish() {
      score = 0;
      scoreEl.textContent = '0';
      document.getElementById('flame').style.display = 'block';
      document.getElementById('giftMessage').classList.add('hidden');
      document.querySelector('.gift-box').classList.remove('open');
      showStep(0);
    }

    createFloatingHearts();
    createSparkles();
