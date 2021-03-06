import React from 'react'
import axios from 'axios';
import store, { addHero } from '../store.js'

const HeroList = (props) => {
    const heroes = props.heroes;
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Weapon</th>
                    <th>Game Title</th>
                </tr>
                {
                    heroes.map((hero) => {
                        return (
                            <tr>
                                <td>{hero.name}</td>
                                <td>{hero.weaponType}</td>
                                <td>{hero.game.name}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}
const GameList = (props) => {
    const games = props.games;
    return (
        <table>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Year</th>
                </tr>
                {
                    games.map((game) => {
                        return (
                            <tr>
                                <td>{game.id}</td>
                                <td>{game.name}</td>
                                <td>{game.year}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

const GameForm = (props) => {
    return (
        <div>
            <h2>Add a Game!</h2>
            <form action="/api/games" method="POST">
                <label>Game Name:</label>
                <input type="text" name="name" />
                <label>Year:</label>
                <input type="text" name="year" />
                <button>Submit</button>
            </form>
        </div>
    );
}
const HeroForm = (props) => {
    return (
        <div>
            <h2>Add a Hero!</h2>
            <p>Add a premade hero: 
                <button onclick={ function() {
                                store.dispatch(addHero())
                            } }>
                        Add +
                </button>
            </p>
            <hr />
            <p>*the form below doesn't use redux*</p>
            <form action="/api/heroes" method="POST">
                <label>Hero Name:</label>
                <input type="text" name="name" />
                <label>Weapon:</label>
                <select name="weapon">
                    <option value="Sword">Sword</option>
                    <option value="Lance">Lance</option>
                    <option value="Axe">Axe</option>
                    <option value="Tome">Tome</option>
                </select>
                <label>Game:</label>
                <select name="game">
                    {
                        props.games.map(game => {
                            return (
                                <option value={game.id}>{game.name}</option>
                            )
                        })    
                    }
                </select>
                <button>Submit</button>
            </form>
        </div>
    );
}

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            heroes: [],
            games: []
        }
        this.addGame = this.addGame.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/api/heroes');
            const heroes = response.data;
            const gamesResponse = await axios.get('/api/games');
            const games = gamesResponse.data;
            this.setState({heroes, games});
        } catch(err) {
            console.log(err);
        }
    }

    async addGame() {
        try {
            const response = await axios.get(`/api/games`);
            this.setState({ heroes: [response.data] })
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <h1>Fire Emblem Heroes</h1>
                <p>Popular heroes from the Fire Emblem series:</p>
                <HeroList heroes={this.state.heroes} />
                <GameList games={this.state.games} />
                
                <HeroForm heroes={this.state.heroes} games={this.state.games}/>
            </div>
        );
    }
}

export default Main;