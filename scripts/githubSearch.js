function search(username = "potatoworkshop"){
    fetch(`https://api.github.com/users/${username}`).then(response => {
        if(response.ok){
            return response.json();
        }
    }).then(data =>{
        const {name, html_url, id, avatar_url, bio, created_at, updated_at, followers, following, public_repos, company} = data;
        createdTime = new Date();
        createdTime.setTime(Date.parse(created_at));
        updateTime = new Date();
        updateTime.setTime(Date.parse(updated_at));
        let markup = `
            <li><img src = "${avatar_url}" alt = "Portrait" class = "portrait"/></li>
            <li>用户名： ${name}</li>
            <li>主页: <a href = "${html_url}">${html_url}</a></li>
            <li>ID: ${id}</li>
            `
        if(bio != null){
            markup += `<li>签名: ${bio}</li>`
        }
        markup += `
            <li>创建于: ${createdTime.toLocaleString()}</li>
            <li>最后更新: ${updateTime.toLocaleString()}</li>
            <li>粉丝数: ${followers}</li>
            <li>关注数: ${following}</li>
            <li>公开仓库数: ${public_repos}</li>
        `;
        if(company != null){
            markup += `<li>公司: ${company}</li>`;
        }
        updatePage(markup);
    }).catch(() =>{
        updatePage(`<div>The User is not exist!</div>`);
    });
}

function updatePage(markup){
    const container = document.querySelector(".list");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    const li = document.createElement("li");
    li.classList.add("information");
    li.innerHTML = markup;
    container.appendChild(li);    
}
search();
const button = document.querySelector(".searchButton");
button.onclick = () => {
    const username = document.querySelector(".inputName").value;
    search(username);
}