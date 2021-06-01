const findDiv = document.getElementById("finds");
const offerDiv = document.getElementById("offers");
let pageTitle = window.location.pathname.split("/");
console.log(window.location.search);
console.log(pageTitle);
let endPoint;
switch (pageTitle[1]){
    case "search":
        endPoint = "/api/posts" + window.location.search
        break;
    case "provided":
        endPoint = "/api/posts?type=offer"
        break;
    case "requested":
        endPoint = "/api/posts?type=find"
        break;
    default: 
        endPoint = "/api/posts";
        break;
}



//fetch posts info from api (db)
fetch(endPoint).then(res => res.json()).then(feed => {
  //for every post we create the html structure
  if(feed.length === 0){
    alert("Sorry, but we couldn't find what you have been looking for Pupsi :-(")
  }
  feed.forEach(post => post.type === "find" ? findDiv.appendChild(createPostCard(post)) : offerDiv.appendChild(createPostCard(post)));
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
  const cardDiv = createDivTag("a", "post", "");
  cardDiv.appendChild(createDivTag("div", "sticker-type", post.type))
  cardDiv.appendChild(createDivTag("h2", "post-title", post.title));
  cardDiv.appendChild(createDivTag("p", "post-description", post.description));
  cardDiv.appendChild(createDivTag("div","post-price", "price: " + post.price + " kr."));
  cardDiv.href = "/posts/" + post._id
  return cardDiv;
}
