import * as React from 'react';
import './style.css';
import { useState } from 'react';
import axios from 'axios';

const url = 'https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [inputTarefas, setInputTarefa] = useState('');

  const handleOnSubmit = (e) => e.preventDefault();

  const getEstilos = () => ({
    display: 'flex',
    gap: 10,
  });

  //pegar o input tarefas
  const handleOnClickAdicionar = () => {
    const novoArray = tarefas;
    novoArray.push(inputTarefas);
    setTarefas([...novoArray]);
  };
  const handleOneClick = (index) => {
    console.log(index);
  };

  /** Axios (get, put, delete) */
  let resultado;

  async function buscarTodasAsTarefas() {
    const resultado = await axios.get(url);
    return resultado.data;
  }

  async function buscarPorUsuarios(user) {
    const configs = {
      params: {
        ' user ': user,
      },
    };
    const resultado = await axios.get(url, configs);
    return resultado.data;
  }

  async function inserirTarefas(user, description) {
    const DTO = {
      user: user,
      description: description,
    };
    const resultado = await axios.post(url, DTO);
    return resultado.data;
  }
  async function alterarUmaTarefa(id, user, description) {
    const DTO = {
      user: user,
      description: description,
    };
    const alterarUmaTarefa = await axios.put(`${url}${id}`, DTO);
    return alterarUmaTarefa.data;
  }

  /**Use Effect */
  React.useEffect(() => {
    buscarPorUsuarios('Melissa').then((response) => {
      console.log(response);
      setTarefas(response.items);
    });
  }, []);

  return (
    <div className="container">
      <div className="conteudo">
        <h1 className="titulo">Tarefas</h1>
        <div>
          <form onSubmit={handleOnSubmit}>
            <div className="tarefa_box">
              <label htmlFor="tarefa">Tarefa</label>
              <div style={getEstilos()}>
                <input
                  id="tarefa"
                  name="tarefa"
                  value={inputTarefas}
                  onChange={(e) => setInputTarefa(e.target.value)}
                  placeholder="minha tarefa"
                />
                <button
                  className="btn btn_adicionar"
                  onClick={handleOnClickAdicionar}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
          <section>
            <ul>
              {tarefas.map((tarefa, index) => (
                <li>
                  <input className="tarefa_conteudo" disabled value={tarefa} />
                  <button
                    className="btn btn_excluir"
                    onClick={() => handleOneClick(index)}
                  >
                    Excluir{' '}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
