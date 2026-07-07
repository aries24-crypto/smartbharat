document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    const chatHistory = document.getElementById('chatHistory');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const languageSelect = document.getElementById('languageSelect');

    // Tab Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Chat Logic
    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        userInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: text }],
                    language: languageSelect.value
                })
            });
            const data = await response.json();
            appendMessage('ai', data.choices[0].message.content);
        } catch (err) {
            appendMessage('ai', 'Sorry, I am having trouble connecting to the network.');
        }
    }

    function appendMessage(role, text) {
        const msg = document.createElement('div');
        msg.className = role === 'user' ? 'user-msg' : 'ai-msg';
        msg.textContent = text;
        chatHistory.appendChild(msg);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);

    // Complaint Logic
    const draftBtn = document.getElementById('draftBtn');
    const submitBtn = document.getElementById('submitComplaint');

    draftBtn.addEventListener('click', async () => {
        const category = document.getElementById('issueCategory').value;
        const desc = document.getElementById('issueDesc').value;
        
        const prompt = `Write a formal civic complaint letter for ${category}. Details: ${desc}`;
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: prompt }],
                language: languageSelect.value
            })
        });
        const data = await response.json();
        const draftDiv = document.getElementById('aiDraft');
        draftDiv.innerHTML = `<strong>AI Draft:</strong><br>${data.choices[0].message.content.replace(/\n/g, '<br>')}`;
        draftDiv.classList.remove('hidden');
    });

    submitBtn.addEventListener('click', () => {
        const id = 'SB-' + Date.now().toString().slice(-6);
        const complaint = {
            id,
            category: document.getElementById('issueCategory').value,
            status: 'Submitted',
            date: new Date().toLocaleDateString()
        };
        
        const existing = JSON.parse(localStorage.getItem('complaints') || '[]');
        existing.push(complaint);
        localStorage.setItem('complaints', JSON.stringify(existing));
        
        alert(`Complaint Submitted Successfully!\nTracking ID: ${id}`);
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
});
