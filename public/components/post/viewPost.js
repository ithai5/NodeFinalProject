const postId = window.location.pathname.split('/posts/')[1] //get the post id from the url
const postViewElement = document.getElementById('view-post')

fetch('/api/posts/' + postId)
    .then((res) => res.json())
    .then((post) => {
        post = post.post
        let user = post.user
        fetch('/api/users/profile')
            .then((res) => res.json())
            .then((currentUser) => {
                currentUser = currentUser.user
                if (post.user !== currentUser.id) {
                    fetch('/api/users/' + post.user)
                        .then((res) => res.json())
                        .then((userInfo) => {
                            userInfo = userInfo.user
                            user = userInfo.firstName + ' ' + userInfo.lastName
                            const chatLink = createDivTag(
                                'a',
                                'post-user',
                                'Send a message to: ' + user
                            )
                            chatLink.href = '/chats/' + post.user
                            postViewElement.appendChild(chatLink)
                        })
                } else {
                    const chatLink = createDivTag(
                        'div',
                        'post-user',
                        'This is your own post'
                    )
                    postViewElement.appendChild(chatLink)
                }
            })
        if (post) {
            postViewElement.appendChild(
                createDivTag('h1', 'post-title', post.title)
            )
            postViewElement.appendChild(
                createDivTag('div', 'post-description', post.description)
            )
            postViewElement.appendChild(
                createDivTag('div', 'post-ad-type', post.type)
            )
            postViewElement.appendChild(
                createDivTag('div', 'post-price', post.price)
            )
        }
    })

function createDivTag(tag, className, content) {
    const divTag = document.createElement(tag)
    divTag.classList.add(className)
    divTag.innerText = content
    return divTag
}
