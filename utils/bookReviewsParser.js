const { booksReviewsSplitSymbol } = require("../config");

const parseBookReviews = (reviews) => {
    if (reviews == null) return [];
    return reviews.split(booksReviewsSplitSymbol);
};

module.exports = parseBookReviews;