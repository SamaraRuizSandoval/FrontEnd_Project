const cardContainer = document.querySelector(".card-container") 

// addUserCards adds the html template that conforms a user card
function addUserCard(userInfo){
    const userCard = document.createElement("div");
    userCard.classList.add('user-card')
    userCard.innerHTML = `
    <div class="picture">
        <div class="user-img"></div>
    </div>
    <div class="user-info">
        <h2>${userInfo.name}</h2>
        <p class="user-role">${userInfo.role}</p>
        <hr class="solid">
    </div>
    <div class="projects-container">
        <h2>Projects</h2>
        <div class="project-user${userInfo.id}"></div>
    </div>
    `
    cardContainer.appendChild(userCard);
}

// addProject adds the html template that conforms a project (name and languages)
function addProject(newProject){
    const userCard = document.querySelector(".project-user" + newProject.user_id) 
    const project = document.createElement("div");
    project.classList.add('project-' + newProject.id)
    project.innerHTML = `
    <p>${newProject.name}</p>
    `
    userCard.appendChild(project)
    for (language in newProject.languages){
        const languageCard = document.createElement("span");
        languageCard.classList.add('span-' + newProject.languages[language])
        languageCard.innerHTML = `
            ${newProject.languages[language]}
            `
        project.appendChild(languageCard)
        //languageCard.appendChild(newProject.languages[language])
    }
}

// getUserProjects will make an API request to get the projects
function getUserProjects(){
    fetch('https://mocki.io/v1/b11da0f2-6d4f-4211-9e7c-45f6580eb5bf')
    .then(function(response) {
        return response.json();
    })
    .then(function(projectData){
        for (project in projectData) {
            console.log(projectData[project].name)
            addProject(projectData[project])
        }
    })
}

// Using JavaScript fetch for the API request
fetch('https://mocki.io/v1/f58367dd-31b5-4787-93c9-538741e5cf83')
.then(function(response) {
    return response.json();
})
.then(function(userData){
    for (user in userData) {
        addUserCard(userData[user])
    }
    getUserProjects()
})