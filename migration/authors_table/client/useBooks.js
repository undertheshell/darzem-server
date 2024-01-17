import { useState } from "react";
import makeRequest from "../../fetch";
import { dataBaseAddress } from "../../config";

export const useBooks = () => {
    const [myBooks, setMyBooks] = useState([]);
    const [bookInfo, setBookInfo] = useState(null);
    const [books, setBooks] = useState([]);
    const [bookAttributes, setBookAttributes] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleError = (errorData) => {
        setError(errorData); 
        setLoading(false); 
    }

    const getMyBooks = async (userId, continueLoading = false) => {
        setLoading(true)
        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/books-read/${userId}`, 
            "GET",  
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }
                
        setMyBooks(data)
        setLoading(continueLoading)
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    };

    const getBook = async (bookId) => {
        setLoading(true)
        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/book/${bookId}`, 
            "GET",  
        );
        
        if(status >= 400) { 
            handleError("Не получилось получить запрашиваемую книгу. Возможно, она не существует"); 
            return;
         }
                
        setBookInfo(data)
        setLoading(false)
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const getAllBooks = async () => {
        setLoading(true)
        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/book`, 
            "GET",  
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
        }

        setBooks(data);
        setLoading(false);
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const addBook = async (newBook) => {
        setLoading(true);
        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/book`, 
            "POST",  
            { 
                bookTitle: newBook.title, 
                bookTopic: newBook.topic, 
                bookPublishingHouse: newBook.publishingHouse, 
                bookYear: newBook.year, 
                bookGenre: newBook.genre, 
                bookLanguage: newBook.language, 
                authorId: newBook.author, 
                userId: newBook.userId
              }
            );
            
            if(status >= 400) { 
                handleError(data);
                return;
            }
            setLoading(false);
            return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }

        setLoading(false)
    }

    const getAllBookAttributes = async () => {
        setLoading(true)
        try {
            const topics = await makeRequest(`${dataBaseAddress}/topic`, "GET");
            const publishingHouses = await makeRequest(`${dataBaseAddress}/publishing-house`, "GET");
            const genres = await makeRequest(`${dataBaseAddress}/genre`, "GET");
            const languages = await makeRequest(`${dataBaseAddress}/language`, "GET");
            const authors = await makeRequest(`${dataBaseAddress}/author`, "GET");
            const countries = await makeRequest(`${dataBaseAddress}/country`, "GET");
        
            if (topics.status >= 400) { 
                handleError(topics.data); 
                return;
            }

            if (publishingHouses.status >= 400) { 
                handleError(publishingHouses.data);
                return;
            }
            
            if (genres.status >= 400) { 
                handleError(genres.data);
                return;
            }

            if (languages.status >= 400) { 
                handleError(languages.data); 
                return;
            }

            if (authors.status >= 400) { 
                handleError(authors.data); 
                return;
            }

            if (countries.status >= 400) { 
                handleError(countries.data); 
                return;
            }

            setBookAttributes(
                {
                    topics: topics.data, 
                    publishingHouses: publishingHouses.data, 
                    genres: genres.data, 
                    languages: languages.data, 
                    authors: authors.data,
                    countries: countries.data
                }
            );

            setLoading(false)
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const deleteBook = async (bookId) => {
        setLoading(true);
        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/book/${bookId}`, 
            "DELETE",  
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }

        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const setBookRead = async (bookId, userId, review, rating) => {
        setLoading(true);
        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/books-read`, 
            "POST",  
            {bookId, userId, review, rating}
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }

        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const editBook = async (title, topic, publishing_house, year, genre, language, author_id, book_id) => {
        setLoading(true);

        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/book`, 
            "PUT",  
            {title, topic, publishing_house, year, genre, language, author_id, book_id}
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }
        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const addAuthor = async (authorName, authorYearsOfLife) => {
        setLoading(true);

        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/author`, 
            "POST",  
            {authorName, years: authorYearsOfLife}
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }

        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const addCountry = async (countryName) => {
        setLoading(true);

        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/country`, 
            "POST",  
            {countryName}
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }
        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const addGenre = async (genreName) => {
        setLoading(true);

        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/genre`, 
            "POST",  
            {genreName}
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }
        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const addLanguauge = async (languageName) => {
        setLoading(true);

        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/language`, 
            "POST",  
            {languageName}
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }
        
        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const addTopic = async (topicName) => {
        setLoading(true);

        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/topic`, 
            "POST",  
            {topicName}
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }

        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    const addPublishingHouse = async (name, country, city, email) => {
        setLoading(true);

        try {
            const { data, status } = await makeRequest(`${dataBaseAddress}/publishing-house`, 
            "POST",  
            { 
                publishingHouseName: name, 
                publishingHouseCity: city, 
                publishingHouseCountry: country, 
                publishingHouseEmail: email
            }
        );
        
        if(status >= 400) { 
            handleError(data);
            return;
         }

        setLoading(false);
        return { data, status };
        }
        catch(e){
            handleError("Что-то пошло не так");
        }
    }

    return { 
        getAllBooks, 
        getMyBooks, 
        getBook, 
        addBook, 
        getAllBookAttributes, 
        deleteBook, 
        setBookRead, 
        editBook,
        addAuthor, 
        addCountry, 
        addGenre, 
        addLanguauge, 
        addTopic, 
        addPublishingHouse,
        bookAttributes, 
        books, 
        myBooks, 
        bookInfo, 
        error, 
        loading
     };
}