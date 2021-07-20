import dato, { SiteClient } from 'datocms-client';

export default async function receberDados(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '14d07f23431931ed27951390640096';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "967471", // ID CRIADO PELO DATA
            ...request.body,
            // title: "Comunidade de teste",
            // imageUrl: "https://github.com/rafaelsrabelo.png",
            // creatorSlug: "rafaelsrabelo"
        })
        console.log(registroCriado);

        response.json({
            dados: 'Algum dado',
            registroCriado: registroCriado,
        })
        return; 
    }
}
    res.status(404).json({
        messagem: 'Ainda não temos nada no GET, apenas no POST!'
    })