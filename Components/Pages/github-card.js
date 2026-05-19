class GitHubUserCard extends HTMLElement {
    constructor() {
        super();
        this.username = this.getAttribute('username') || 'github';
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .gh-card {
                    background-color: var(--color-bg-resume, #ffffff);
                    color: var(--color-txt-resume, #2d3748);
                    border: 1px solid var(--color-border-resume, #e2e8f0);
                    border-radius: 8px;
                    padding: 1.5rem;
                    max-width: 400px;
                    margin: 1.5rem auto;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
                }
                .gh-loading {
                    text-align: center;
                    font-style: italic;
                    color: var(--color-meta-resume, #718096);
                    padding: 2rem;
                }
                .gh-error {
                    color: #e53e3e;
                    border: 1px dashed #e53e3e;
                    background-color: rgba(229, 62, 62, 0.05);
                    padding: 1rem;
                    border-radius: 6px;
                    text-align: center;
                    font-size: 0.95rem;
                }
                .gh-profile {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                }
                .gh-avatar {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background-color: var(--color-badge-bg-resume, #edf2f7);
                }
                .gh-identity {
                    display: flex;
                    flex-direction: column;
                }
                .gh-name {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--color-title-resume, #1a202c);
                }
                .gh-login {
                    font-size: 0.9rem;
                    color: var(--color-header, #00adb5);
                    text-decoration: none;
                    font-weight: 500;
                }
                .gh-login:hover {
                    text-decoration: underline;
                }
                .gh-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.75rem;
                    margin-top: 1.25rem;
                    border-top: 1px solid var(--color-border-resume, #e2e8f0);
                    padding-top: 1rem;
                    text-align: center;
                }
                .gh-stat-val {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--color-title-resume, #1a202c);
                }
                .gh-stat-lbl {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--color-meta-resume, #718096);
                    font-weight: 600;
                }
            </style>
            <div class="gh-card" id="gh-card-root">
                <div class="gh-loading">Querying API endpoint...</div>
            </div>
        `;

        this.fetchGitHubData();
    }

    async fetchGitHubData() {
        const rootContainer = this.querySelector('#gh-card-root');
        
        try {
            const response = await fetch(`https://api.github.com/users/${this.username}`);
            
            if (!response.ok) {
                throw new Error(`HTTP network error: status ${response.status}`);
            }
            
            const data = await response.json();
            this.renderProfile(rootContainer, data);
            
        } catch (error) {
            this.renderError(rootContainer, error.message);
        }
    }

    renderProfile(container, user) {
        container.innerHTML = `
            <div class="gh-profile">
                <img class="gh-avatar" src="${user.avatar_url || ''}" alt="${user.name || this.username} headshot profile avatar">
                <div class="gh-identity">
                    <span class="gh-name">${user.name || this.username}</span>
                    <a class="gh-login" href="${user.html_url}" target="_blank" rel="noopener noreferrer">@${user.login}</a>
                </div>
            </div>
            <div class="gh-stats">
                <div>
                    <div class="gh-stat-val">${user.public_repos ?? 0}</div>
                    <div class="gh-stat-lbl">Repositories</div>
                </div>
                <div>
                    <div class="gh-stat-val">${user.followers ?? 0}</div>
                    <div class="gh-stat-lbl">Followers</div>
                </div>
                <div>
                    <div class="gh-stat-val">${user.public_gists ?? 0}</div>
                    <div class="gh-stat-lbl">Gists</div>
                </div>
            </div>
        `;
    }

    renderError(container, message) {
        container.innerHTML = `
            <div class="gh-error">
                <strong>API Request Failed</strong>
                <p>${message}</p>
            </div>
        `;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        customElements.define('github-user-card', GitHubUserCard);
    });
} else {
    customElements.define('github-user-card', GitHubUserCard);
}