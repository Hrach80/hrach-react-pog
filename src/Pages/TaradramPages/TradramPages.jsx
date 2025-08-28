import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDollarSign, FaEuroSign, FaRubleSign } from 'react-icons/fa';
import "../ExanakPages/ExanakPages.css";
import "./TaradramPages.css";

const TaradramPages = () => {
    const [exchangeData, setExchangeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "https://api.exchangerate-api.com/v4/latest/AMD";

    // Ստեղծում ենք օբյեկտ՝ տարադրամի կոդերը երկրների կոդերին համապատասխանեցնելու համար
    const currencyToCountryCode = {
        'USD': 'US',
        'EUR': 'EU',
        'RUB': 'RU',
        'GEL': 'GE'
    };

    const getCurrencyIcon = (currency) => {
        switch (currency) {
            case 'USD':
                return <FaDollarSign className="currency-icon" />;
            case 'EUR':
                return <FaEuroSign className="currency-icon" />;
            case 'RUB':
                return <FaRubleSign className="currency-icon" />;
            case 'GEL':
                return <span className="currency-icon">₾</span>;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchExchangeData = async () => {
            try {
                const response = await axios.get(API_URL);
                setExchangeData(response.data);
            } catch (err) {
                setError("Տվյալները ստանալու խնդիր կա։");
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeData();
    }, [API_URL]);

    if (loading) {
        return <div className="taradram-box loading">Բեռնվում է...</div>;
    }

    if (error) {
        return <div className="taradram-box error">{error}</div>;
    }

    if (!exchangeData) {
        return null;
    }

    const currenciesToShow = ['USD', 'EUR', 'RUB', 'GEL'];

    return (
        <div className="taradram-box">
            <div className="taradram-header">
                <h1>Տարադրամի փոխարժեք</h1>
                <p>Մեկ դոլարի, եվրոյի, ռուբլու և լարիի արժեքը դրամով</p>
            </div>
            <div className="taradram-list">
                {currenciesToShow.map((currency, index) => (
                    <div className="taradram-item" key={index}>
                        <img
                            src={`https://flagcdn.com/w40/${currencyToCountryCode[currency].toLowerCase()}.png`}
                            alt={`${currency} դրոշ`}
                            className="currency-flag"
                        />
                        {getCurrencyIcon(currency)}
                        <p className="currency-name">{currency}</p>
                        <p className="rate">{(1 / exchangeData.rates[currency]).toFixed(2)} AMD</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaradramPages;