import { useContext } from 'react'
import Alerta from '../Alerta';
import TarefasContext from './TarefasContext';

const Tabela = () => {

    const { listaObjetos, acaoRemover, alerta, setObjeto, setEditar, setAlerta, novoObjeto } = useContext(TarefasContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Tarefas</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                  novoObjeto();                 
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col" width="17%">ID</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Responsavel</th>
                                <th scope="col">Prazo</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">UID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.id}>
                                    <td align="center">
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => { acaoRemover(objeto); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button className="btn btn-info"
                                            data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                            onClick={() => {
                                                setObjeto(objeto);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                    <td>{objeto.id}</td>
                                    <td>{objeto.titulo}</td>
                                    <td>{objeto.descricao}</td>
                                    <td>{objeto.autor}</td>
                                    <td>{objeto.responsavel}</td>
                                    <td>{objeto.prazo}</td>
                                    <td>{objeto.usuario}</td>
                                    <td>{objeto.email}</td>
                                    <td>{objeto.uid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}

export default Tabela;
