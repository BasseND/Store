// Article Class 
class Article {
  constructor(title, price, categorie) {
    this.title = title;
    this.price = price;
    this.categorie = categorie;
  }
}

// UI Class
class UI {
  static displayArticles() {
    const storedArticles = [
      {
        title: 'Article 1',
        price: 40,
        categorie: 'Tech'
      },
      {
        title: 'Article 2',
        price: 20,
        categorie: 'Tech'
      },
      {
        title: 'Article 3',
        price: 230,
        categorie: 'Tech'
      }


    ];
    const articles = storedArticles;

    articles.forEach((article) => UI.addArticleToList(article));
  }

  static addArticleToList(article) {
    const articleList = document.querySelector('#articles-list');
    const articleItem = document.createElement('div');
    articleItem.classList = 'article-item';
    articleItem.innerHTML = `
     
          <img src="assets/img/product.png" alt="">
          <div class="article-content">
            <h4 class="display-5">${article.title}</h4>
            <p> <span class="price">${article.price}</span> <span>$</span></p>
            <p class="categorie">${article.categorie}</p>
          </div>
    `;

    articleList.appendChild(articleItem);
  }

  static clearFields() {
    const articleTitle = document.querySelector('#art_title').value = '';
    const articlePrice = document.querySelector('#art_price').value = '';
    // const catSelected = document.querySelector("#art_categorie");
  }


}

// Store (LocalStorage)

// Events variables
const articleForm = document.querySelector('#article_form');

// Event to Dispalay Article
document.addEventListener('DOMContentLoaded', UI.displayArticles);

// Event to Add Article

articleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('clicked');
  // Get form values
  const articleTitle = document.querySelector('#art_title').value;
  const articlePrice = document.querySelector('#art_price').value;
  const catSelected = document.querySelector("#art_categorie");
  const articleCategorie = catSelected.options[catSelected.selectedIndex].text;

  // Instatiate Article
  const article = new Article(articleTitle, articlePrice, articleCategorie)
  console.log(article);

  // Add Article to UI
  UI.addArticleToList(article);

  // Clear Fields
  UI.clearFields();

})

// Event to Remove Article