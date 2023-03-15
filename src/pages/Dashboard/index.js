import "./dashboard.css";
import { useState, useEffect } from "react";

import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import firebase from "../../services/firebaseConnection";

const listRef = firebase
  .firestore()
  .collection("chamados")
  .orderBy("created", "desc");

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(false);

  // useEffect(()=> {

  //   loadChamados();

  //   return () => {

  //   }
  // }, []);

  // async function loadChamados(){
  //   await listRef.limit(5)
  //   .get()
  //   .then((snapshot) => {
  //     updateState(snapshot)
  //   })
  //   .catch((err)=>{
  //     console.log('Deu algum erro: ', err);
  //     setLoadingMore(false);
  //   })

  //   setLoading(false);

  // }

  // async function updateState(snapshot){
  //   const isCollectionEmpty = snapshot.size === 0;

  //   if(!isCollectionEmpty){
  //     let lista = [];

  //     snapshot.forEach((doc)=>{
  //       lista.push({
  //         id: doc.id,
  //         assunto: doc.data().assunto,
  //         cliente: doc.data().cliente,
  //         clienteId: doc.data().clienteId,
  //         created: doc.data().created,
  //         createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
  //         status: doc.data().status,
  //         complemento: doc.data().complemento
  //       })
  //     })

  //     const lastDoc = snapshot.docs[snapshot.docs.length -1]; //Pegando o ultimo documento buscado

  //     setChamados(chamados => [...chamados, ...lista]);
  //     setLastDocs(lastDoc);

  //   }else{
  //     setIsEmpty(true);
  //   }

  //   setLoadingMore(false);

  // }

  // async function handleMore(){
  //   setLoadingMore(true);
  //   await listRef.startAfter(lastDocs).limit(5)
  //   .get()
  //   .then((snapshot)=>{
  //     updateState(snapshot)
  //   })
  // }

  // function togglePostModal (item){
  //   setShowModal(!showModal) //troca de true para false
  //   setDetail(item);
  // }

  // if(loading){
  //   return(
  //     <div>
  //       <Header/>

  //       <div className="content">
  //         <Title name="Atendimentos">
  //           <FiMessageSquare size={25} />
  //         </Title>

  //         <div className="container dashboard">
  //           <span>Buscando chamados...</span>
  //         </div>

  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Header />

      <div className="content">
        <div>
          <Link to="/new" className="new">
            <FiPlus size={25} color="#FFF" />
            Novo chamado
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <input type="checkbox" />
              <td data-label="Nome">Gustavo Arruda</td>
              <td data-label="E-mail">gustavoleone3456@hotmail.com</td>
              <td data-label="Telefone">13 99636-9053</td>
              <td data-label="Endereço">
                Av. Brg. Faria Lima, 2355 - São Paulo - SP, 01452-922
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 
      {showModal && (
        <Modal
        conteudo={detail}
        close={togglePostModal}
        />
      )} */}
    </div>
  );
}
