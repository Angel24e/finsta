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
      document.location.replace('/profile');
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
const fetchPosts = async () => {
  const response = await fetch('/api/posts');
  const data = await response.json();
  const postList = document.querySelector('.post-list');
  postList.innerHTML = '';

  data.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post-div');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');
    titleDiv.innerHTML = `<h3>${post.title}</h3>`;
    postDiv.appendChild(titleDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-div');
    contentDiv.innerHTML = `<p>${post.content}</p>`;
    postDiv.appendChild(contentDiv);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');
    buttonDiv.innerHTML = `
      <button type="button" data-id="${post.id}" class="delete-btn btn btn-danger">Delete</button>
    `;
    postDiv.appendChild(buttonDiv);

    postList.appendChild(postDiv);
  });
};

// add event listener to submit button
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

// add event listener to delete button
document.querySelector('.post-list').addEventListener('click', delButtonHandler);

// fetch posts on page load
fetchPosts();

const postButton = document.querySelector('#post-button');
const newPostForm = document.querySelector('.new-post-form');

postButton.addEventListener('click', () => {
  if (newPostForm.style.display === 'none') {
    newPostForm.style.display = 'block';
  } else {
    newPostForm.style.display = 'none';
  }
});
