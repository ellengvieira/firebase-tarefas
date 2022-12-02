import { useState, useEffect } from 'react';
import Tabela from './Tabela';
import TarefasContext from './TarefasContext';
import Formulario from './Formulario';
import { auth, db } from '../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc,
    deleteDoc, where
} from "firebase/firestore";


function Tarefas() {


    const [user, loading, error] = useAuthState(auth);
    const [listaObjetos, setListaObjetos] = useState([]);
    const [alerta, setAlerta] = useState({
        status: "", message: ""
    });
    const [objeto, setObjeto] = useState({
        id: "", titulo: "", descricao: "", autor: "", resposavel: "", prazo: "",
        uid: user?.uid, usuario: user?.displayName, email:
            user?.email
    });


    const novoObjeto = () => {
        setObjeto({
            id: 0, titulo: "", descricao: "", autor: "", resposavel: "", prazo: "",
            uid: user?.uid, usuario: user?.displayName, email:
                user?.email
        });
    }

    useEffect(() => {
        if (user?.uid != null) {
            const uid = user?.uid;
            const colRef = collection(db, "posts");
            const q = query(colRef, where("uid", "==", uid))
            onSnapshot(q, (querySnapshot) => {
                setListaObjetos(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    titulo: doc.data().titulo,
                    descricao: doc.data().descricao,
                    autor: doc.data().autor,
                    prazo: doc.data().prazo,
                    responsavel: doc.data().responsavel,
                    usuario: doc.data().usuario,
                    email: doc.data().email,
                    uid: doc.data().uid
                })))
            })
        }
    }, [user]);

    const [editar, setEditar] = useState(false);



    const acaoCadastrar = async (e) => {
        e.preventDefault();
        if (editar) {

            try {
                const postDocRef = doc(db, 'tarefas', objeto.id)
                await updateDoc(postDocRef, {
                    titulo: objeto.titulo,
                    descricao: objeto.descricao,
                    autor: objeto.autor,
                    prazo: objeto.prazo,
                    responsavel: objeto.responsavel,
                    uid: objeto.uid,
                    usuario: objeto.usuario,
                    email: objeto.email
                    })
                setAlerta({ status: "success", message: "Post atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o POST:" + err });
            }
        } else { 
            try {
                addDoc(collection(db, 'tarefas'),
                {
                    titulo: objeto.titulo,
                    descricao: objeto.descricao,
                    autor: objeto.autor,
                    prazo: objeto.prazo,
                    responsavel: objeto.responsavel,
                    uid: objeto.uid,
                    usuario: objeto.usuario,
                    email: objeto.email
                })
                setEditar(true);
                setAlerta({ status: "success", message: "Post criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o POST:" + err });
            }
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const acaoRemover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                const postDocRef = doc(db, 'tarefas', objeto.id)
                await deleteDoc(postDocRef);
                setAlerta({ status: "success", message: "Post removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }

        }
    }

    useEffect(() => {


    }, []);

    return (
        <TarefasContext.Provider value={
            {
                listaObjetos, setListaObjetos, acaoRemover,
                alerta, setAlerta,
                objeto, setObjeto,
                editar, setEditar,
                acaoCadastrar, handleChange, novoObjeto
            }}>
            <Tabela />
            <Formulario />
        </TarefasContext.Provider>
    );
}

export default Tarefas;