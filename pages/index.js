import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'; 
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

// Component sempre letra maiuscula
// styledcomponent.div(TAG UTILIZADA)
function ProfileSidebar(props) {
  console.log(props)
  return(
    <Box >
      <img src={`https://github.com/${props.githubUser}.png`}/>
    </Box>
  )
}


export default function Home() {
  const githubUser = 'rafaelsrabelo';
  const favoriteUser = 
  [
    'marrcelosantana',
    'luizalbertobm',
    'brunooliveira',
    'victorcsv',
    'victormilitao',
    'diiegopaiivam',
  ];

  return (
    <>
    <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favoriteUser.length})
            </h2>
            <ul>
              {favoriteUser.map((itemAtual) => {
                return(
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
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
