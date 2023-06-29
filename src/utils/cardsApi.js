import { BASE_URL } from "./auth";

class cardsApi {
    constructor(props) {
        this._authToken = props.auth;
        this._rootUrl = props.rootUrl;
    }

    _fetch = ({ method = "GET", url = '/', data, auth = localStorage.getItem('jwt') }) =>
        fetch(`${this._rootUrl}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': '<calculated when request is sent>',
                'Access-Control-Allow-Origin': BASE_URL,
                'Host': '<calculated when request is sent>',
                'api-key': this._authToken,
                'authorization': `Bearer ${auth}`,
            },
            body: JSON.stringify(data),
        }).then(this._handleResponse)

    _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

    createCard = ({ ownerName, ownerId, cardNumber, expiry, cvv }) => this._fetch({ method: "POST", url: "/add-card", data: { ownerName, ownerId, cardNumber, expiry, cvv } });

    getCards = () => this._fetch({ method: "GET", url: "/cards/all" });

    getCard = (cardId) => this._fetch({ method: "GET", url: `/cards/${cardId}` });

    deleteCard = (cardId) => this._fetch({ method: "DELETE", url: `/cards/delete/${cardId}` });

    createEntry = (entry) => this._fetch({ method: "POST", url: '/entries/add', data: entry });

    getEntries = (cardId) => this._fetch({ method: "GET", url: `/entries/get/${cardId}` });

    deleteEntry = (id, entry) => this._fetch({ method: "DELETE", url: `/entries/delete/${id}`, data: entry });
}
const cardsApiObj = new cardsApi({ auth: '4den6CaDRe58L5Jx85R7E38xpVcn8TZcyqznqZVpKFAjeqqG80eZQc1WCtRNM1Aq', rootUrl: BASE_URL });
export default cardsApiObj;
