const feedDiv = document.getElementById("feed");

//fetch posts info from api (db)
fetch("/api/posts").then(res => res.json()).then(feed => {
  //for every post we create the html structure
  feed.forEach(post => feedDiv.appendChild(createPostCard(post)));
});

//create html with the fetched title and description of the post
function createPostCard(post) {
  const cardDiv = document.createElement("div");
  
  cardDiv.appendChild(createDivTag("h2", "post-title", post.title));
  cardDiv.appendChild(createDivTag("p", "post-description", post.description));

  return cardDiv;
};

//this general method will be used on createPostCard
function createDivTag(tag, className, content) {
  const divTag = document.createElement(tag);
  divTag.classList.add(className);
  divTag.innerText = content;

  return divTag;
};

