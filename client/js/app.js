const title = document.getElementById('title-text');
const pseudonym = document.getElementById('pseudonym-text');
const story = document.getElementById('story-message');
const submitBtn = document.getElementById('submit-button');
const renderPost = document.getElementById('post-container');
const formContainer = document.getElementById('form-container');
let hashChangeCounter = 0;

function getTheDate() {
    let date1 = new Date();
    let hours = date1.getHours() + 1;
    date1.setHours(hours);
    let text = date1.toISOString();
    return text
}

function postNewData() {
    if (title.value === '' || pseudonym.value === '' || story.value === '') {
        alert('Please ensure you have typed something for title, name and story before posting');
    }

    const newTime = getTheDate();
    console.log(newTime);
    const emptyArray = [];
    fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title.value,
            pseudonym: pseudonym.value,
            body: story.value,
            date: newTime
            
        })
    })
    .then(resp => 
        resp.json())
    .then(data1 => {
     let newPost = document.createElement('div');
     let title = document.createElement('h2');
     let pseudonym = document.createElement('p');
     let body = document.createElement('p');
     title.textContent = data1.title;
     pseudonym.textContent = data1.pseudonym;
     body.textContent = data1.body;
     newPost.style.display = 'flex';
     newPost.style.flexDirection = 'column';
     newPost.appendChild(title);
     newPost.appendChild(pseudonym);
     newPost.appendChild(body);
     renderPost.innerHTML = '';
     renderPost.appendChild(newPost);
     window.location.hash = `posts/${data1.id}`
     formContainer.style.display = 'none';
     renderPost.style.display = 'block';
    }
    )
    .then(
        setTimeout(() => {
            window.addEventListener('hashchange', () => {
                hashChangeCounter += 1;
                if (hashChangeCounter % 2 !== 0) {
                    title.value = '';
                    pseudonym.value = '';
                    story.value = '';
                    renderPost.style.display = 'none';
                    formContainer.style.display = 'block';
                }

             })
        }, 2000)
    )
    
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    postNewData();

})


