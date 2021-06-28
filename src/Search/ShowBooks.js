import React from 'react';
import books from '../mocks/books.json';
import LinesEllipsis from 'react-lines-ellipsis';

const styles = {
    socialBlock: {
        display: "inline-block",
    },

    faTwitter: {
        color: "#219EBC",
    },

    title: {
        font: "normal normal normal 18px/24px Architects Daughter",
    },

    author: {
        marginBottom: "20px",
    },

    authorId: {
        display: "inline-block",
        font: "normal normal 300 18px/1 Roboto",
        marginLeft: "7px",
    },

    price: {
        background: "#023047 0% 0% no-repeat padding-box",
        padding: "8px 20px",
        font: "normal normal normal 16px/1 Roboto",
        color: "#fff",
        textAlign: "center",
        position: "absolute",
        top: "-18px",
        right: "16px",
        display: "inline-block",
        borderRadius: "30px"
    },

    description: {    
        font: "normal normal 300 14px/20px Roboto",
        margin: "20px 0",
    },

    grow: {
        flexGrow: "1",
    },

    tag: {
        background: "#FB8500",
        borderRadius: "15px",
        color: "#fff",
        textAlign: "center",
        font: "normal normal normal 12px/1 Roboto",
        padding: "8px 16px",
        display: "inline-block",
        marginRight: "10px"
    }
}

function ShowBooks(props) {
    let booksArray = books.books;
    let selectedTags = findSelectedTags();
    let selectedPrices = findSelectedPrices();
    let newBooksArray = [];
    let newBooksPricesArray = [];
    let finalBooksArray = compareTagsBooks(selectedTags, booksArray);
    var finalArray = comparePrices(finalBooksArray, selectedPrices); 

    function findSelectedTags() {
        let filteredTags = props.tags.filter(propsTag => propsTag.selected);
        let filteredTag = filteredTags.map(tag => {
            return tag.name;
        });
        
        return filteredTag; 
    }

    function findSelectedPrices() {  //Compare prices     
        let filteredPrices = props.prices.filter(propsPrice => propsPrice.selected);
        let filteredPrice = filteredPrices.map(price => {
            return price.name;
        });
        return filteredPrice; 
    }

    function compareTagsBooks(tags, books) {
        books.forEach((book) => {
            let bookTags = book.tags;
    
            bookTags.forEach(displayBookTag);
            function displayBookTag(valueBook) {
                tags.forEach(displayFilterTag);
                function displayFilterTag(valueTag) {
                    if(valueTag === valueBook && !newBooksArray.includes(book)) {    
                        newBooksArray.push(book);    
                    }
                }    
            }
        });
        
        if(newBooksArray.length === 0) {
            newBooksArray = books;
        } 
        
        return newBooksArray;
    }

    function comparePrices(booksArray, prices) { 
        booksArray.forEach((book) => {
            let bookPrice = book.price.replaceAll('$','');
            
            if(!newBooksPricesArray.includes(book)) {   
                for(let i = 0; i < prices.length; i++) {
                    let purePrice = prices[i].replaceAll('$','');
                   
                    if(purePrice.match(/–/)) {
                        let purePriceRange = purePrice.split(' – ');
                        if(purePriceRange[0] < Math.ceil(bookPrice) && purePriceRange[1] > Math.floor(bookPrice)) {    
                            newBooksPricesArray.push(book); 
                        }
                    } else if(purePrice.match(/</)) {
                        let purePriceLess = parseInt(purePrice.replaceAll('<',''), 10);
                        if(purePriceLess > Math.floor(bookPrice)) {    
                            newBooksPricesArray.push(book); 
                        }
                    } else if(purePrice.match(/>/)) {
                        let purePriceMore = parseInt(purePrice.replaceAll('>',''), 10);
                        if(purePriceMore < Math.ceil(bookPrice)) {    
                            newBooksPricesArray.push(book);  
                        }     
                    } 
                }
            }
        });

        if (newBooksArray.length !== 0 && selectedPrices.length === 0)  {
            newBooksPricesArray = booksArray;
        }

        return newBooksPricesArray;
    }

    function getAuthors(id) {
        for (let author of props.author) { 
            if(author.id === id) {
                return author.name;
            }
        }
    }

    const booksInfo = finalArray.map((books) => { 
        var authorName = getAuthors(books.authorId);
        
        return (<a key={books.id} className="booksBlock" href="#">
            <div style={styles.grow}>
                <div style={styles.author}>
                    <div style={styles.socialBlock}><i className="fa fa-twitter" aria-hidden="true" style={styles.faTwitter}></i></div>
                    <div style={styles.authorId}>{authorName}</div>
                </div>
                <div style={styles.title}>
                    {books.title}
                </div>
                <div style={styles.price}>
                    {books.price}
                </div>
                <div style={styles.description}>
                <LinesEllipsis
                    text={books.description}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />   
                </div>
            </div>
            <div style={styles.tags}>
               {books.tags.map((tag) => {
                    return (
                        <div key={tag} style={styles.tag}>{tag}</div>
                    );
                })}
            </div>
        </a>)
    });

    return booksInfo;
}

export default ShowBooks;