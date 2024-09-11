import fastify from 'fastify';
import { userRotes } from './router';

const server = fastify({
    logger: true
})

server.register(userRotes,{
    prefix : "/user",
})

server.listen({port: 3000, host: "localhost"}, (err,address)=>{
    if (err) {
        server.log.error(err)
        process.exit(1)
    }

    // console.log(`Ouvindo na porta ${address}`);
})