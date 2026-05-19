class ThemeToggle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                #theme-btn {
                    background: transparent;
                    border: 2px solid var(--theme-symbol-color, var(--color-txt-header));
                    color: var(--theme-symbol-color, var(--color-txt-header));
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 40px;
                    min-height: 32px;
                    transition: background-color 0.2s ease, border-color 0.2s ease;
                }

                #theme-btn:hover {
                    background-color: rgba(255, 255, 255, 0.15);
                }

                .btn-symbol::before {
                    content: var(--theme-symbol);
                    font-size: 1.2rem;
                    font-weight: bold;
                }
            </style>

            <button id="theme-btn" aria-label="Toggle dark/light theme">
                <span class="btn-symbol"></span>
            </button>
        `;

        const button = this.querySelector('#theme-btn');

        button.addEventListener('click', () => {
        
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light'); 
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');  
            }
        });
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        customElements.define('theme-toggle', ThemeToggle);
    });
} else {
    customElements.define('theme-toggle', ThemeToggle);
}