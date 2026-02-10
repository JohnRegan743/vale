document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const envelopeSection = document.getElementById('envelopeSection');
    const envelopeMessage = document.getElementById('envelopeMessage');
    const proposalSection = document.getElementById('proposalSection');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successMessage = document.getElementById('successMessage');
    
    let yesBtnScale = 1;
    let noClickCount = 0;
    let envelopeState = 'closed'; // closed, opened, messageShown
    
    // Envelope click handler
    envelope.addEventListener('click', function() {
        if (envelopeState === 'closed') {
            // First click: open envelope
            envelope.classList.add('open');
            envelopeState = 'opened';
            
            // Show message after envelope opens
            setTimeout(() => {
                envelopeMessage.classList.remove('hidden');
                envelopeState = 'messageShown';
            }, 600);
            
        } else if (envelopeState === 'messageShown') {
            // Second click: hide envelope and show proposal
            envelopeSection.classList.add('hidden');
            proposalSection.classList.remove('hidden');
            proposalSection.style.animation = 'slideIn 0.5s ease';
        }
    });
    
    const noButtonMessages = [
        "laaahhhhh",
        "baliw ka po baa",
        "sigii naaa",
        "nanetooo",
        "😠😠😠",
        "😡😡😡😡",
        "isaa haaa",
        "nasan ba yung pamalo ko",
        "hangg kulittt amppp",
        "😡😡😡😡😡😡😡😡😡"
    ];
    
    yesBtn.addEventListener('click', function() {
        proposalSection.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        createFloatingHearts();
    });
    
    noBtn.addEventListener('click', function() {
        yesBtnScale += 0.3;
        yesBtn.style.transform = `scale(${yesBtnScale})`;
        yesBtn.style.fontSize = `${1.1 + (yesBtnScale - 1) * 0.5}rem`;
        yesBtn.style.padding = `${1 + (yesBtnScale - 1) * 0.5}rem ${2 + (yesBtnScale - 1)}rem`;
        
        noClickCount++;
        if (noClickCount <= noButtonMessages.length) {
            noBtn.textContent = noButtonMessages[noClickCount - 1];
        } else {
            noBtn.textContent = "Just say yes already!";
        }
        
        const noBtnScale = Math.max(0.5, 1 - (noClickCount * 0.1));
        noBtn.style.transform = `scale(${noBtnScale})`;
        
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 50;
        noBtn.style.position = 'relative';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        
        yesBtn.style.animation = 'shake 0.5s';
        setTimeout(() => {
            yesBtn.style.animation = '';
        }, 500);
        
        yesBtn.style.boxShadow = `0 ${6 + yesBtnScale * 4}px ${20 + yesBtnScale * 10}px rgba(255, 107, 157, ${0.6 + yesBtnScale * 0.1})`;
        
        if (yesBtnScale >= 3) {
            yesBtn.style.position = 'fixed';
            yesBtn.style.top = '50%';
            yesBtn.style.left = '50%';
            yesBtn.style.transform = `translate(-50%, -50%) scale(${yesBtnScale})`;
            yesBtn.style.zIndex = '1000';
            yesBtn.textContent = "heheheheh <3";
            yesBtn.style.fontSize = '3rem';
        }
    });
    
    function createFloatingHearts() {
        const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '🌹', '💐'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.bottom = '-50px';
                heart.style.fontSize = Math.random() * 2 + 1 + 'rem';
                heart.style.zIndex = '9999';
                heart.style.pointerEvents = 'none';
                heart.style.animation = `floatUp ${Math.random() * 3 + 2}s ease-out forwards`;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 200);
        }
    }
    
    // Add CSS animation for floating hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                bottom: -50px;
                opacity: 1;
                transform: translateX(0) rotate(0deg);
            }
            50% {
                transform: translateX(${Math.random() * 200 - 100}px) rotate(180deg);
            }
            100% {
                bottom: 100vh;
                opacity: 0;
                transform: translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
