/* ==========================================
   Cyber Portfolio Logic - script.js
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- 1. Canvas Matrix Background ---
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set Canvas Size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Characters
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$0123456789';
    const charArr = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    function drawMatrix() {
      ctx.fillStyle = 'rgba(7, 9, 19, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00f0ff'; // Cyber cyan color
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    setInterval(drawMatrix, 40);
  }

  // --- 2. Subtitle Typing Effect ---
  const typingTextElement = document.getElementById('typingText');
  const phrases = [
    'Cyber Security & AI Leader',
    'Fintech Specialist (DPO)',
    'Enterprise Risk Governance Specialist',
    'Certified Mentor & Public Speaker'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1500; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing new phrase
    }
    
    setTimeout(typeEffect, typeSpeed);
  }
  
  if (typingTextElement) {
    typeEffect();
  }

  // --- 3. Interactive Terminal Console ---
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');
  const terminalWindow = document.getElementById('terminalWindow');
  const shortcutButtons = document.querySelectorAll('.shortcut-btn');

  // Command Database
  const commands = {
    help: 'Available operations:<br>' +
          '- <span class="cmd-highlight">info</span>: Print professional summary.<br>' +
          '- <span class="cmd-highlight">experience</span>: View chronologically indexed security roles.<br>' +
          '- <span class="cmd-highlight">skills</span>: List primary technical and compliance domains.<br>' +
          '- <span class="cmd-highlight">certifications</span>: Decrypt security certifications and badges.<br>' +
          '- <span class="cmd-highlight">speaking</span>: View advisory logs and public speaking milestones.<br>' +
          '- <span class="cmd-highlight">clear</span>: Clear terminal console buffer.<br>' +
          '- <span class="cmd-highlight">contact</span>: Decrypt node contact details.',
    info: '<b>Name:</b> Balaji Kapsikar<br>' +
          '<b>Title:</b> Cyber Security & AI Generalist Leader | DPO<br>' +
          '<b>Experience:</b> 14+ Years in Cloud Security, Risk Platforms & Governance<br>' +
          '<b>Education:</b> Master of Computer Applications (MCA)<br>' +
          '<b>Summary:</b> Proven track record in securing fintech scaleups and financial exchange platforms. Expert in regional compliance and AI Governance models (NIST AI RMF).',
    experience: '<b>SECURITY ROLES DECRYPTED:</b><br><br>' +
                '1. <b>Funding Societies Singapore</b> (2021 - Present)<br>' +
                '   <i>Sr Manager Cyber Security & Cyber Risk, DPO [FINTECH]</i><br>' +
                '   - Formulated AI Governance & Security Framework (NIST AI RMF, MAS AIRMG).<br>' +
                '   - Managed security for 100+ vendors.<br><br>' +
                '2. <b>SGX Group (Singapore Exchange)</b> (2019 - 2021)<br>' +
                '   <i>Information & Cloud Security Consultant</i><br>' +
                '   - Completed cloud security reviews and MAS TRM risk advisory.<br><br>' +
                '3. <b>Enerpac Tool Group</b> (2016 - 2019)<br>' +
                '   <i>Senior Information Security Consultant (APAC & Middle East)</i><br>' +
                '   - Conducted security audits for industrial IoT/SCADA.',
    skills: '<b>CAPABILITIES INVENTORY:</b><br><br>' +
            '• <b>Cloud Security:</b> AWS GuardDuty, CloudTrail, Macie, WAF, Azure Security Center, Cloudflare ZTNA<br>' +
            '• <b>AI Governance:</b> NIST AI RMF, MAS AIRMG, Shadow AI Discovery<br>' +
            '• <b>Compliance Frameworks:</b> MAS-SG, PDPA-SG, GDPR, HIPAA, SOX, ISO27001, PCI DSS, SOC 2<br>' +
            '• <b>Security Operations:</b> VA/PT, Incident Response, Vendor Risk, BCP/DR',
    certifications: '<b>VERIFIED CREDENTIALS:</b><br><br>' +
                    '• CISSP (Certified Information Systems Security Professional)<br>' +
                    '• CISM (Certified Information Security Manager)<br>' +
                    '• CRISC (Certified in Risk and Information Systems Control)<br>' +
                    '• CDPSE (Certified Data Privacy Solutions Engineer)<br>' +
                    '• ISO 27001 Lead Auditor<br>' +
                    '• CEH (Certified Ethical Hacker)<br>' +
                    '• CAIE (Certified AI Engineer / Practitioner)<br>' +
                    '• CPISI (Certified Payment Card Industry Security Implementer)',
    speaking: '<b>COMMUNITY BRIEFINGS:</b><br><br>' +
              '• <b>AISA CyberCon 2023 (Australia):</b> Spoke on "Insider Threat: The Silent Killer" & "Mastering Vulnerability Management".<br>' +
              '• <b>ISC2 Spotlight Virtual Conference:</b> Delivered keynote on "Security Strategy - Aligning with Business Objectives".<br>' +
              '• <b>Top Cyber News Magazine:</b> Published author of "Next-Gen Insider Threats".<br>' +
              '• <b>CSA Chapter (2022):</b> Received Cloud Security Risk Champion of the Year Award.',
    contact: '<b>NODE COORDINATES:</b><br><br>' +
             '• <b>Secure Return Address:</b> <a href="mailto:balajiuk14@gmail.com" class="cmd-highlight">balajiuk14@gmail.com</a><br>' +
             '• <b>Phone Link:</b> +65 9779 6911<br>' +
             '• <b>LinkedIn Node:</b> <a href="https://www.linkedin.com/in/balajikapsikar" target="_blank" class="cmd-highlight">linkedin.com/in/balajikapsikar</a><br>' +
             '• <b>Personal Blog:</b> <a href="http://balajikapsikar.blogspot.com/" target="_blank" class="cmd-highlight">balajikapsikar.blogspot.com</a>'
  };

  // Process terminal command
  function processCommand(rawInput) {
    const input = rawInput.trim().toLowerCase();
    
    // Add command line to terminal body
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="terminal-prompt">guest@balaji-sec-node:~$</span> <span>${rawInput}</span>`;
    terminalBody.appendChild(promptLine);
    
    if (input === '') {
      scrollTerminal();
      return;
    }
    
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';
    
    if (input === 'clear') {
      terminalBody.innerHTML = '';
      scrollTerminal();
      return;
    }
    
    if (commands.hasOwnProperty(input)) {
      outputLine.innerHTML = commands[input];
    } else {
      outputLine.innerHTML = `System command not found: <span class="neon-text-purple">${rawInput}</span>. Type <span class="cmd-highlight">help</span> to decrypt core operations.`;
    }
    
    terminalBody.appendChild(outputLine);
    // Add spacer
    terminalBody.appendChild(document.createElement('br'));
    scrollTerminal();
  }

  function scrollTerminal() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Input event listener
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = terminalInput.value;
        processCommand(value);
        terminalInput.value = '';
      }
    });
  }

  // Shortcut button handlers
  shortcutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      processCommand(cmd);
      if (terminalInput) {
        terminalInput.focus();
      }
    });
  });
});

// --- 4. Accordion Logic for Career Details ---
function toggleJobDetails(detailsId, btnElement) {
  const detailsPanel = document.getElementById(detailsId);
  if (!detailsPanel) return;

  const isExpanded = btnElement.getAttribute('aria-expanded') === 'true';
  const icon = btnElement.querySelector('i');
  
  if (isExpanded) {
    detailsPanel.classList.add('hidden-content');
    btnElement.setAttribute('aria-expanded', 'false');
    btnElement.querySelector('span').textContent = 'Decrypt Full Dossier';
    if (icon) {
      icon.setAttribute('data-lucide', 'chevron-down');
      lucide.createIcons();
    }
  } else {
    detailsPanel.classList.remove('hidden-content');
    btnElement.setAttribute('aria-expanded', 'true');
    btnElement.querySelector('span').textContent = 'Encrypt Dossier';
    if (icon) {
      icon.setAttribute('data-lucide', 'chevron-up');
      lucide.createIcons();
    }
  }
}

// --- 5. Contact Form Submission Logic ---
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('portfolioContactForm');
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmailInput').value;
  const message = document.getElementById('contactMessage').value;
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('btnFormSubmit');
  
  if (!form || !feedback) return;
  
  // Show sending state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> TRANSMITTING COORDINATES...';
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  // Simulate secure network transmission delay
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-lucide="shield-check"></i> SEND ENCRYPTED PAYLOAD';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    feedback.classList.remove('hidden-content');
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `<strong>CONNECTION SECURED.</strong><br>Transmission payload received from node ${name} (${email}). Encryption handshake completed successfully. I will get back to you shortly.`;
    
    // Clear form inputs
    form.reset();
  }, 1200);
}
