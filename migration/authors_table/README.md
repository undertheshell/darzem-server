This migration is created to add extra column 'years_of_life' to 'authors' table.

To perform this migration, follow these steps:

1) Make sure you are in server directory;
2) Create new column in 'authors' table using this command - 'node migration/authors_table/migrate.js';
3) Go to 'migration/authors_table/server' folder, there you will find file 'post_author.js'. Copy this file.
4) Go to 'model/author' folder and paste copied file here with replacement.
5) Go to 'migration/authors_table/client' folder, there you will find 4 files.
6) Copy 'useBooks.js' file and paste it with replacement in 'client/src/books/model' folder.
7) Copy 'book_attributes_view.js' file and paste it with replacement in 'client/src/books/view/book_attributes' folder.
8) Copy 'book_attributes_page.js' file and paste it with replacement in 'client/src/books/controller/book_attributes' folder.
9) Copy 'add_author_form_view.js' file and paste it with replacement in 'client/src/books/view/book_attributes' folder.

That's it! Migration is not supposed to be so difficult.
May the force be with you.
