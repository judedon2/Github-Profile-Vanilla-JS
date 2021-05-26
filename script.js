const API_URL = 'https://api.github.com/users/'


const main = document.getElementById("main")
const form = document.getElementById('form')
const search = document.getElementById('search')

// Fetch User Profile
async function getUser(user) {
    const response = await fetch(API_URL + user)
    const data = await response.json();

    createUserCard(data)

    getRepos(user)

    console.log(data.login)
}

// Fetch User's Repos Info
async function getRepos(user) {
    const response = await fetch(API_URL + user +'/repos');
    const data = await response.json()
    addReposToCard(data)

}



// Create card when user is searched
function createUserCard(user){
    // destructure
    const { avatar_url, bio, login, following, followers, public_repos, name } = user
    const cardHTML = `
    <div class="card">
        <div class='img-container'>
            <img class="avatar" src="${avatar_url}" alt="${name}" />
        </div>
        <div class="user-info">
            <h2>${name}</h2>
            <p>${bio}</p>
            <ul class="info">
                <li>${followers}<strong> Followers</strong></li>
                <li>${following}<strong> Following</strong></li>
                <li>${public_repos}<strong> Repos</strong></li>
            </ul>
            <h4>Repos:</h4>
            <div id="repos"></div>
        </div>
    </div>     
    `
    main.innerHTML = cardHTML;
}

// Add Respos to Card
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
        .sort((a,b) => b.stargazers_count - a.stargazers_count)
        .slice(0,9)
        .forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        // blank target to open in new tab
        repoEl.target = '_blank'
        repoEl.innerText = repo.name
        // apend to <div></div>
        reposEl.appendChild(repoEl);
    })

    console.log(repos)
}



getUser('florinpop17');

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user);
        search.value = '';
    }
})


