import React, { useState } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'; 
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

// Component sempre letra maiuscula
// styledcomponent.div(TAG UTILIZADA)
function ProfileSidebar(props) {
  return(
    <Box >
      <img src={`https://github.com/${props.githubUser}.png`}/>
      <hr />

      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr/>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      {/* <ul>
        {favoriteUser.map((itemAtual) => {
          return(
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
            )
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'rafaelsrabelo';

  const [communities, setCommunities] = React.useState([]);
  
  const favoriteUser = 
  [
    'marrcelosantana',
    'luizalbertobm',
    'brunooliveira',
    'victorcsv',
    'victormilitao',
    'diiegopaiivam',
  ];

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
    .then(function(response) {
      return response.json();
    })
    .then(function(responseComplet) {
      setFollowers(responseComplet);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization':'2fb83e7d7dbb140cd580065dc01ffe',
        'Content-Type':'application/json',
        'Accept':'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          _status
          _firstPublishedAt
          creatorSlug
        }
      }
      `})
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {

      const comunidadesDoDato = respostaCompleta.data.allCommunities
      console.log(comunidadesDoDato)
      setCommunities(comunidadesDoDato)
    })
  }, [])
    

  return (
    <>
    <AlurakutMenu githubUser='rafaelsrabelo' />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();

              const dataForm = new FormData(e.target);

              console.log('Campo: ',dataForm.get('title'));
              console.log('Campo: ',dataForm.get('image'));

              const communitie = {
                title: dataForm.get('title'),
                imageUrl: dataForm.get('image'),
                creatorSlug: githubUser,
              } 

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(communitie)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const community = dados.registroCriado;
                const communitiesUpdate = [...communities, communitie];
                setCommunities(communitiesUpdate);
              })
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text" />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>

          <ProfileRelationsBox title="Seguidores" items={followers} />

          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
                {communities.map((itemAtual) => {
                  return(
                    <li key={itemAtual.id}>
                      <a href={`/communities/${itemAtual.id}`}> 
                        <img src={itemAtual.imageUrl} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                    )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({favoriteUser.length})
            </h2>
            <ul>
              {favoriteUser.map((itemAtual) => {
                return(
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                  )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
