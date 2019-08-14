// Article Class 
class Article {
  constructor(ref, title, price, categorie) {
    this.ref = ref;
    this.title = title;
    this.price = price;
    this.categorie = categorie;
  }
}

// UI Class
class UI {
  static displayArticles() {
    const storedArticles = Store.getArticles();
    // const storedArticles = [
    //   {
    //     ref: 23340,
    //     title: 'Article 1',
    //     price: 40,
    //     categorie: 'Tech'
    //   },
    //   {
    //     ref: 55340,
    //     title: 'Article 2',
    //     price: 20,
    //     categorie: 'Tech'
    //   },
    //   {
    //     ref: 23234,
    //     title: 'Article 3',
    //     price: 230,
    //     categorie: 'Tech'
    //   }


    // ];
    const articles = storedArticles;
    var articleSorted = articles.reverse();
    articleSorted.forEach((article) => UI.addArticleToList(article));
  }

  static addArticleToList(article) {
    const articleList = document.querySelector('#articles-list');
    const articleItem = document.createElement('div');
    articleItem.classList = 'grid-item';
    articleItem.innerHTML = `
         <div class="article-item">
            <img src="assets/img/product.png" alt="">
            <div class="article-content">
              <h4 class="display-5">${article.title}</h4>
              <p> <span class="price">${article.price}</span> <span>$</span></p>
              <p class="categorie">${article.categorie}</p>
              <button type="button" data-ref="${article.ref}" class="btn btn-outline-success">Ajouter</button>
            </div>
          </div>
    `;

    articleList.appendChild(articleItem);
  }
  static showMessage(message, className) {
    const div = document.createElement('div');
    div.className = ` alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const formContainer = document.querySelector('.form-container');
    const form = document.querySelector('#article_form');
    formContainer.insertBefore(div, form);
    // Remove after 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#art_ref').value = '';
    document.querySelector('#art_title').value = '';
    document.querySelector('#art_price').value = '';
    document.querySelector("#art_categorie").value = '';
  }
}

// Store Class (LocalStorage)
class Store {
  static getArticles() {
    let articles;
    if (localStorage.getItem('articles') === null) {
      articles = [];
    } else {
      articles = JSON.parse(localStorage.getItem('articles'));
    }
    return articles;
  }

  static addArticle(article) {
    const articles = Store.getArticles();
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));
  }
  static removeArticle(ref) {
    const articles = Store.getArticles();

    articles.forEach((article, index) => {
      if (article.ref === ref) {
        articles.splice(index, 1);
      }
    });

    localStorage.setItem('articles', JSON.stringify(articles));
  }
}


// Events variables
const articleForm = document.querySelector('#article_form');

// Event to Dispalay Article
document.addEventListener('DOMContentLoaded', UI.displayArticles);

// Event to Add Article
if (articleForm) {
  articleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('clicked');
    // Get form values
    const articleRef = document.querySelector('#art_ref').value;
    const articleTitle = document.querySelector('#art_title').value;
    const articlePrice = document.querySelector('#art_price').value;
    const catSelected = document.querySelector("#art_categorie");
    const articleCategorie = catSelected.options[catSelected.selectedIndex].text;


    // Validate form
    if (articleTitle === '' || articlePrice === '' || articleCategorie === '') {
      UI.showMessage('Veuillez remplir le formulaire', 'info');
    } else {
      // Instatiate Article
      const article = new Article(articleRef, articleTitle, articlePrice, articleCategorie)
      console.log(article);

      // Add Article to UI
      UI.addArticleToList(article);

      // Add Article to Store
      Store.addArticle(article);

      // Show success message
      UI.showMessage('Article ajouté avec succes', 'success');

      // Clear Fields
      UI.clearFields();

    }


  })
}

// Event to Remove Article