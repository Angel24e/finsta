
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (name && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title: name, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

// fetch the posts data from the API
fetch('/api/posts')
  .then(response => response.json())
  .then(data => {
    // loop through the data and create a div for each post
    data.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button type="button" data-id="${post.id}" class="delete-btn btn btn-danger">Delete</button>
      `;
      postDiv.setAttribute('class', 'post-div');
      document.querySelector('#posts-container').appendChild(postDiv);
    });
  });

// add event listener to submit button
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

// add event listener to delete button
document
  .querySelector('#posts-container')
  .addEventListener('click', delButtonHandler);
