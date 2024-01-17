import React, { useEffect, useState } from "react"

import { Loader } from "../../../app/view/loading_view";
import { useBooks } from "../../model/useBooks";
import { Error } from "../../../app/view/error_view";
import { BookAttributes } from "../../view/book_attributes/book_attributes_view";
import { NewBookAttributeModalWindow } from "./new_book_attribute_modal_window";
import { AddAuthorForm } from "../../view/book_attributes/add_author_form_view";
import { AddCountryForm } from "../../view/book_attributes/add_country_form_view";
import { AddGenreForm } from "../../view/book_attributes/add_genre_from_view";
import { AddLanguageForm } from "../../view/book_attributes/add_language_form_view";
import { AddTopicForm } from "../../view/book_attributes/add_topic_form_view";
import { AddPublishingHouseForm } from "../../view/book_attributes/add_publishing_house_form_view";
import { useNavigate } from "react-router-dom";

export const BookAttributesPage = () => {
    const { getAllBookAttributes, addAuthor, addCountry, addGenre, addLanguauge, addTopic, addPublishingHouse, bookAttributes, loading, error } = useBooks();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false)
    const [currentModal, setCurrentModal] = useState(<></>)
    const closeModal = () => setModalVisible(false)
    
    useEffect(() => {
        getAllBookAttributes();
    }, [])

    if (loading) return <Loader/>
    if (error) return <Error error = {error}/>
    
    const onAddAuthor = async (authorName, authorYearsOfLife) => {
        if(authorName.trim() && authorYearsOfLife.trim()) 
            {
                const { data, status } = await addAuthor(authorName.trim(), authorYearsOfLife.trim());
                if (await status < 400){
                    closeModal();
                    navigate("/main", { state: { data } });
                }

            } 
    }

    const onAddCountry = async (countryName) => {
        if(countryName.trim()) 
            {
                const { data, status } = await addCountry(countryName.trim());
                if (await status < 400){
                    closeModal();
                    navigate("/main", { state: { data } });
                }
            } 
    }

    const onAddGenre = async (genreName) => {
        if(genreName.trim()) 
            {
                const { data, status } = await addGenre(genreName.trim());
                if (await status < 400){
                    closeModal();
                    navigate("/main", { state: { data } });
                }
            } 
    }

    const onAddLanguage = async (languageName) => {
        if(languageName.trim()) 
            {
                const { data, status } = await addLanguauge(languageName.trim());
                if (await status < 400){
                    closeModal();
                    navigate("/main", { state: { data } });
                }
            } 
    }

    const onAddTopic = async (topicName) => {
        if(topicName.trim()) 
            {
                const { data, status } = await addTopic(topicName.trim());
                if (await status < 400){
                    closeModal();
                    navigate("/main", { state: { data } });
                }
            } 
    }

    const onAddPublishingHouse = async (name, country, city, email) => {
        if(name.trim() && country.trim() && city.trim() && email.trim()) 
            {
                const { data, status } = await addPublishingHouse(name.trim(), country.trim(), city.trim(), email.trim());
                if (await status < 400){
                    closeModal();
                    navigate("/main", { state: { data } });
                }
            } 
    }

    const bookAttributesModals = [
        {
            buttonName: "автора", 
            addAttributeForm: <AddAuthorForm onAddAttribute = {onAddAuthor}/>
        },

        {
            buttonName: "страну", 
            addAttributeForm: <AddCountryForm onAddAttribute = {onAddCountry}/>
        },

        {
            buttonName: "жанр", 
            addAttributeForm: <AddGenreForm onAddAttribute = {onAddGenre}/>
        },

        {
            buttonName: "язык", 
            addAttributeForm: <AddLanguageForm onAddAttribute = {onAddLanguage}/>
        },

        {
            buttonName: "тему", 
            addAttributeForm: <AddTopicForm onAddAttribute = {onAddTopic}/>
        },

        {
            buttonName: "издательство", 
            addAttributeForm: <AddPublishingHouseForm onAddAttribute = {onAddPublishingHouse} bookAttributes = {bookAttributes}/>
        },
    ]

    return ( 
        <div className="">
            <div className="d-flex justify-content-around mt-2">
                {
                    bookAttributesModals.map((modal, index) => {
                        return(
                            <div key={modal.buttonName}>
                                <button className="btn btn-primary" onClick={() => {setCurrentModal(bookAttributesModals[index]); setModalVisible(true)}}>
                                    Добавить {modal.buttonName}
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <BookAttributes bookAttributes = {bookAttributes}/>
                <NewBookAttributeModalWindow 
                    visible = {modalVisible} 
                    onClose = {closeModal} 
                    attributeForm = {currentModal.addAttributeForm}
                />
            </div>
        </div>
     );
}