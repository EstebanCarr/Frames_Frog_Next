/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import FrameData from '@/models/FreameData';
import axios from 'axios'; 
import { useParams } from 'next/navigation'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  verify: 'silent'
  // Supply a Hub to enable frame verification.

})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {

  const { frameData } = c

  return c.res({
    action:'/picker',
    image:`${process.env.NEXT_PUBLIC_SITE_URL}/Captura.PNG`,
    intents: [
      <Button value="A">A</Button>,
      <Button value="B">B</Button>,
      <Button value="c">Useer Data</Button>,
    ],
  })
})

app.frame('/picker', async (c) => {
  const  { buttonValue,status }= c
  const userData = c.frameData?.castId
  if (!userData) {
    
    return c.res({
      action: '/error',
      image:`${process.env.NEXT_PUBLIC_SITE_URL}/error.PNG`,
      intents: [
        <Button >Regersar 🎆</Button>
  
      ],
    })
  }
  
  if (buttonValue==='A') {
    
    return c.res({
      action: '/meme/a',
      image:`${process.env.NEXT_PUBLIC_SITE_URL}/meme/a`,
      intents: [
        <TextInput placeholder="A" />,
        <Button value="generate">Generate</Button>,
  
      ],
    })
  }
  if (buttonValue==='B') {
    
  return c.res({
    action: '/meme/b',
    image:`${process.env.NEXT_PUBLIC_SITE_URL}/meme/b`,
    imageAspectRatio:'1:1',
    intents: [
      <TextInput placeholder="B" />,
      <Button value="generate">Generate</Button>,

    ],
  })
}
if (buttonValue === 'c') {
  // Si los datos de usuario están disponibles
  if (userData) {
    // Enviar los datos de usuario a la ruta API para guardar en MongoDB
    try {
      await axios.post('/api/saveUserData', { userData });
      console.log('Datos de usuario enviados correctamente a MongoDB.');
    } catch (error) {
      console.error('Error al enviar datos de usuario a MongoDB:', error);
    }
  }
}
return c.res({
  action: '/',
  image: (
    <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
      {status === 'initial' ? ('user Data!') : (`Fid:
      ${userData.fid},
      Addres
      ${userData.hash}`)}
    </div>
  ),
  intents: [
    <Button >Regersar 🎆</Button>

  ],
})
})
// memes 
app.frame('/meme/:id', (c) => {
  const id = c.req.param('id')
  const {inputText = ''} = c

  const newSearchParams = new URLSearchParams({
    text:inputText,
  })
 if (id === 'a') {
  return c.res({
    action: '/',
    image:`${process.env.NEXT_PUBLIC_SITE_URL}/meme/a?${newSearchParams}`,
    intents:[ <Button >Regersar 🎆</Button>,]
  })
 }
  return c.res({
    action: '/',
    image:`${process.env.NEXT_PUBLIC_SITE_URL}/meme/b?${newSearchParams}`,
    imageAspectRatio:'1:1',
    intents:[ <Button >Regersar 🎆</Button>,]
    
  })
} )


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
