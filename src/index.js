/*
~~~~~~~~~~~~~~~~~~~~THOUGHT PROCESS~~~~~~~~~~~~~~~~~~~
1. save global constants
2. fetch information
3. loop through information
4. create new page elements (li, p, p, button, span)
5. set text of new elements to information
6. add click event to button
7. append elements to page
8. submit form for new quote
    1. get values from form using e.target
    2. create new object that looks like db's json with values
    3. add new object to page
*/

//constant for db url, list element, form element
const url = "http://localhost:3000/quotes"
const list = document.getElementById('quote-list')
const form = document.getElementById('new-quote-form')

//fetch all the data
fetch(url)
    .then(res => res.json())
    //loop and pass each individual quote/element to addQuote
    .then(data => data.forEach((el) => addQuote(el)))
    .catch(err => console.log(err))

//submit form
form.addEventListener('submit', (e) => {
    //prevent default page refresh
    e.preventDefault();
    //create newQuote object
    let newQuote = {
        quote: e.target.quote.value,
        author: e.target.author.value
    }
    //pass new quote object to addQuote
    addQuote(newQuote)
    //reset form
    form.reset();
})

//adds like cummulatively
//pass in specific span element to change innerText
const addLike = (span) => { 
    //get current count
    let curLikes = parseInt(span.innerText); 
    //update innerText count by one
    span.innerText = curLikes + 1; 
}

//add one quote object to list
const addQuote = (quote) => {
    //create li and add class name
    let li = document.createElement("li")
    li.classList.add("quote-card")
    //create author p tag and add author
    let author = document.createElement("p")
    author.innerText = quote.author;
    //create quote text p tag and add quote text
    let text = document.createElement("p")
    text.innerText = quote.quote
    //create like button, add class, add inner text
    let btn = document.createElement("button")
    btn.classList.add("btn-success")
    btn.innerText = "Like"
    //create span element, set id, set beginning text to 0
    let span = document.createElement("span")
    span.setAttribute('id', 'likes')
    span.innerText = 0;

    //append things to li
    li.append(text)
    li.append(author)
    li.append(btn)
    li.append(span);

    //append li to list
    list.append(li);

    //add click event listener to like button
    btn.addEventListener('click', (e) => {
        //call addLike
        addLike(span)
    })
}
