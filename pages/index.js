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

  const [communities, setCommunities] = React.useState([{
    id: '465465456465',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  
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
                id: new Date().toISOString(),
                title: dataForm.get('title'),
                image: dataForm.get('image')
              } 

              const communitiesUpdate = [...communities, communitie];
              setCommunities(communitiesUpdate);

            
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
                      <a href={`/users/${itemAtual.title}`}>
                        <img src={itemAtual.image} />
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
