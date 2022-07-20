const db = require('../dbConfig/init');


// let anchorTag = document.createElement('a');
// anchorTag.href = 'url';
// document.getElementById('_publish_button').appendChild(anchorTag);
// anchorTag.click(); 


module.exports = class Post {
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.pseudonym = data.pseudonym;
        this.body = data.body;
        this.date = data.date;
        //{ name: data.author_name, path: `/authors/${data.author_id}`};
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`SELECT * FROM posts;`);
                let posts = postData.rows.map(p => new Post(p));
                resolve (posts);
            } catch (err) {
                reject('Post not found');
            }
        });
    };

    
    
    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let bookData = await db.query(`SELECT books.*, authors.name AS author_name
                                                    FROM books 
                                                    JOIN authors ON books.author_id = authors.id
                                                    WHERE books.id = $1;`, [ id ]);
                let book = new Book(bookData.rows[0]);
                resolve (book);
            } catch (err) {
                reject('Book not found');
            }
        });
    };
    
    static async create(bookData){
        return new Promise (async (resolve, reject) => {
            try {
                const { abstract, authorName, title, yearOfPublication } = bookData;
                let author = await Author.findOrCreateByName(authorName);
                let result = await db.query(`INSERT INTO books (title, year_of_publication, abstract, author_id) VALUES ($1, $2, $3, $4) RETURNING *;`, [ title, yearOfPublication, abstract, author.id ]);
                resolve (result.rows[0]);
            } catch (err) {
                reject('Book could not be created');
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING author_id', [ this.id ]);
                const author = await Author.findById(result.rows[0].author_id);
                const books = await author.books;
                if(!books.length){await author.destroy()}
                resolve('Book was deleted')
            } catch (err) {
                reject('Book could not be deleted')
            }
        })
    };
};