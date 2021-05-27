const findDiv = document.getElementById("finds");
const offerDiv = document.getElementById("offers")
console.log(document.cookie);

//fetch posts info from api (db)
fetch("/api/posts").then(res => res.json()).then(feed => {
  //for every post we create the html structure
  feed.forEach(post => post.ad_type === "find" ? findDiv.appendChild(createPostCard(post)) : offerDiv.appendChild(createPostCard(post)));
});


//this general method will be used on createPostCard
function createDivTag(tag, className, content) {
  const divTag = document.createElement(tag);
  divTag.classList.add(className);
  divTag.innerText = content;
  return divTag;
}

//create html with the fetched title and description of the post
function createPostCard(post) {
  const cardDiv = createDivTag("div", "post", "");
  cardDiv.appendChild(createDivTag("div", "sticker-type", post.ad_type))
  cardDiv.appendChild(createDivTag("h2", "post-title", post.title));
  cardDiv.appendChild(createDivTag("p", "post-description", post.description));
  cardDiv.appendChild(createDivTag("div","post-price", "price: " + post.price + " kr."));
  return cardDiv;
}
