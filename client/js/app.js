const title = document.getElementById('title-text');
const pseudonym = document.getElementById('pseudonym-text');
const story = document.getElementById('story-message');
const submitBtn = document.getElementById('submit-button');

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
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    postNewData();

})


