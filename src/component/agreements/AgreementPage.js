import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { getAgreement } from '../../actions';

export const AgreementPage = () => {
    const dispatch = useDispatch(); 

    const { agreements } = useSelector(state => ({
        agreements: state.agreementReducer.agreements
    }));

    useEffect(() => {
        dispatch(getAgreement());
    }, []);

    return (
        <div className="home">
            <SearchBar />
            <h1>Agreements:</h1>
            <Link className="button-nav buttons" to="/create-agreement">Create Agreement</Link>
            <div className="card">
                {console.log(agreements)}
                {agreements.map(agreement => {
                    return (
                        <div className="user-list-description">
                            <h1>{agreement.description}</h1>
                            <h2>{`Creator: ${agreement.creatorID}`}</h2>
                            <h2>{`Debtor: ${agreement.friendID}`}</h2>
                            <h3>{`Start: ${agreement.startDate}`}</h3>
                            <h4>{`End: ${agreement.endDate}`}</h4>
                            <button className="button-nav buttons">Edit</button>
                            <button className="button-nav buttons">Delete</button>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};