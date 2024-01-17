import React from "react";

export const BookAttributes = (props) => {

    return (
        <div className="m-5">
            <h1>Авторы</h1>
            {props.bookAttributes.authors.length ? props.bookAttributes.authors.map(author => { return <h3 key={author.author_id}>{author.name} - {author.years_of_life}</h3> }) : <h3>Авторов нет</h3>}
            <hr/>

            <h1>Жанры</h1>
            {props.bookAttributes.genres.length ? props.bookAttributes.genres.map(genre => { return <h3 key={genre.genre_id}>{genre.name}</h3> }) : <h3>Жанров нет</h3>}
            <hr/>

            <h1>Языки</h1>
            {props.bookAttributes.languages.length ? props.bookAttributes.languages.map(language => { return <h3 key={language.language_id}>{language.name}</h3> }) : <h3>Языков нет</h3>}
            <hr/>

            <h1>Темы</h1>
            {props.bookAttributes.topics.length ? props.bookAttributes.topics.map(topic => { return <h3 key={topic.topic_id}>{topic.topic_name}</h3> }) : <h3>Тем нет</h3>}
            <hr/>

            <h1>Издательства</h1>
            {
                props.bookAttributes.publishingHouses.length 
                    ? 
                props.bookAttributes.publishingHouses.map(house => { 
                    return <h3 key={house.id}>{`${house.name}: ${house.country} ${house.city} ${house.email}`}</h3> 
                }) 
                    : 
                <h3>Издательств нет</h3>}
        </div>
    );
}