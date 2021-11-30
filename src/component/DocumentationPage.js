export const DocumentationPage = () => {
    return (
        <div className="profile-content">
            <h1>Documentation</h1>

            <h2>Note: You should have GitHub freely available on your terminal</h2>
            <h2>Note: This is for Linux/MacOS</h2>

            <p>Clone repository from GitHub</p>
            <code>git clone https://www.github.com/jeffreyzhu604/accountability-buddy</code>

            <p>Open two terminal windows and change to project directory</p>
            <code>cd accountability</code>

            <p>On the first window, change to frontend directory</p>
            <code>cd frontend</code>
            <p>Install dependencies</p>
            <code>npm install</code>

            <p>On the first window, change to backend directory</p>
            <code>cd backend</code>
            <p>Install dependencies</p>
            <code>npm install</code>

            <p>To start the frontend client, run</p>
            <code>npm start</code>

            <p>To start the backend server, run</p>
            <code>npm start</code>

            <h3>Voila! Hope you enjoy this!</h3>
        </div>
    );
};