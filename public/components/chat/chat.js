fetch("/api/posts").then(res => res.json()).then(feed => {
  //for every post we create the html structure
  feed.forEach(post => post.ad_type === "find" ? findDiv.appendChild(createPostCard(post)) : offerDiv.appendChild(createPostCard(post)));
});

/*fetch('api/users').then(res => res.json()).then(list => {
  list.forEach(user => user.)
})*/