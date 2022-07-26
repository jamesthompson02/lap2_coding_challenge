const db = require('../dbConfig/init');

// let anchorTag = document.createElement('a');
// anchorTag.href = 'url';
// document.getElementById('_publish_button').appendChild(anchorTag);
// anchorTag.click();

module.exports = class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.pseudonym = data.pseudonym;
    this.body = data.body;
    this.date1 = data.date1;
    //{ name: data.author_name, path: `/authors/${data.author_id}`};
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let postData = await db.query(`SELECT * FROM posts;`);
        let posts = postData.rows.map((p) => new Post(p));
        resolve(posts);
      } catch (err) {
        reject('Post not found');
      }
    });
  }

  static create(postDataInsert) {
    return new Promise(async (resolve, reject) => {
      try {
        const { title, pseudonym, body, date } = postDataInsert;
        let postData = await db.query(
          'INSERT INTO posts (title, pseudonym, body, date1) VALUES ($1, $2, $3, $4) RETURNING *;',
          [title, pseudonym, body, date]
        );

        let newPost = new Post(postData.rows[0]);
        console.log(newPost);
        resolve(newPost);
      } catch (err) {
        reject('Error creating post');
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let postData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [
          id,
        ]);
        let post = new Post(postData.rows[0]);
        resolve(post);
      } catch (err) {
        reject('Post not found');
      }
    });
  }

  //   static async create(bookData) {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const { abstract, authorName, title, yearOfPublication } = bookData;
  //         let author = await Author.findOrCreateByName(authorName);
  //         let result = await db.query(
  //           `INSERT INTO books (title, year_of_publication, abstract, author_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
  //           [title, yearOfPublication, abstract, author.id]
  //         );
  //         resolve(result.rows[0]);
  //       } catch (err) {
  //         reject('Book could not be created');
  //       }
  //     });
  //   }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          'DELETE FROM books WHERE id = $1 RETURNING author_id',
          [this.id]
        );
        const author = await Author.findById(result.rows[0].author_id);
        const books = await author.books;
        if (!books.length) {
          await author.destroy();
        }
        resolve('Book was deleted');
      } catch (err) {
        reject('Book could not be deleted');
      }
    });
  }
};
