const postId = window.location.pathname.split('/posts/')[1]; //get the post id from the url
const postViewElement = document.getElementById('view-post');

fetch('/api/posts/' + postId).then(res => res.json()).then(post => {
    let user = post[0].user;
    fetch('/api/users/' + post[0].user).then(res => res.json()).then(userInfo => {
        console.log(userInfo[0]);
        user = userInfo[0].firstName + " " + userInfo[0].lastName;
        const chatLink = createDivTag("a", "post-user", "Send a message to: " +  user);
        chatLink.href = "/chats/" +  post.user;
        postViewElement.appendChild(chatLink);

    })
    console.log(post[0]);
    if(post[0]){
        post = post[0]
            postViewElement.appendChild(createDivTag("h1", "post-title", post.title));    
            postViewElement.appendChild(createDivTag("div", "post-description", post.description));
            postViewElement.appendChild(createDivTag("div", "post-ad-type", post.type));
            postViewElement.appendChild(createDivTag("div", "post-price", post.price));
        }
    }
)

function createDivTag(tag, className, content) {
    const divTag = document.createElement(tag);
    divTag.classList.add(className);
    divTag.innerText = content;
    return divTag;
  }
  