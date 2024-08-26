import fastify from 'fastify';

const server = fastify()

server.listen({port: 3000, host: "localhost"}, (err,address)=>{
    if (err) {
        server.log.error(err)
        process.exit(1)
    }

    console.log(`Ouvindo na porta 3000`);
})