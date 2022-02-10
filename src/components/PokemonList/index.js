import React, { useState, useEffect } from "react";
import { Card, Form, Pagination } from "react-bootstrap";
import "./style.css";

export const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [value, setValue] = useState('');
    const handlePokemons = () =>{
			return pokemons.filter(pokemon => {
				if(value != '' && pokemon.name.toUpperCase().indexOf(value.toUpperCase())>-1){
					return pokemon;
				}else if(value == ''){
					return pokemon;
				}
			});
		}
  useEffect(() => {
    fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json")
      .then((data) => data.json())
      .then((data) => {
        const pokemons = data.results;
        setPokemons(pokemons);
      });
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-4 text-center">
          <h2 className="mb-4">Pokemon List</h2>
          <div>
            <Form>
              <Form.Group className="mb-3 ">
                <Form.Control
                  className="shadow-none"
                  type="text"
                  placeholder="Search for a name or national registration"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      <div className="row justify-content-space-between flex-wrap">
        {pokemons.filter(pokemon => {
					if(value != '' && pokemon.name.toUpperCase().includes(value.toUpperCase())){
						return pokemon;
					}else if(value != '' && pokemon.national_number.toUpperCase().includes(value.toUpperCase())){
						return pokemon;
					}else if(value == ''){
						return pokemon;
				}}).map((item, id) => {
          return (
            <div className="col-3 mb-2" key={id}>
              <Card className="mb-3 h-100">
                <Card.Img
                  style={{ maxHeight: 200 }}
                  variant="top"
                  alt={item.name}
                  src={item.sprites.large}
                />
                <Card.Body>
                  <Card.Title>
                    {item.name} - {item.type}
                  </Card.Title>
                  <Card.Text>
                    <span style={{ fontWeight: 500 }}>
                      National Registration:
                    </span>{" "}
                    <span>{item.national_number}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
