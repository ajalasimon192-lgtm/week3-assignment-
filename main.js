const body = document.querySelector('body');
const themeToggle = document.querySelector('.btn');
const  urlUsername = 'ajalasimon192-lgtm'
const DataContent = document.querySelector('.api_status')

const savedTheme = localStorage.getItem('theme') || 'light';

document.body.classList.toggle('dark-mode', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeToggle.textContent = (isDark) ? 'Light ☀' : 'Dark 🌙'
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
})

async function getData() {
    try{
        const res = await fetch(`https://api.github.com/users/${urlUsername}`);
        if(!res.ok) throw new Error(`${res.status}`)
        const user = await res.json();
        console.log(user);
        renderProfile(user)
    } catch(error) {
        DataContent.textContent = `Couldn't load user info. Please try again later`;
        console.log(error)
    }
}

const renderProfile = (user) => {
    DataContent.innerHTML = `
    <img src="${user.avatar_url}" alt="Profile Picture" class="profile-picture">
    <h2 class="username">${user.name ?? user.login}</h2>
    <p class="bio">${user.bio || 'No bio available'}</p>
    <p> ${user.public_repos || 0} public repositories . ${user.followers} followers </p>
    <a href='${user.html_url}' target='_blank'>View Profile</a>
    `
}

getData()