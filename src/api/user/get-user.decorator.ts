// deze decorator word gebruikt om de huidige ingelogde gebruiker op te halen uit verzoeken die worden verwerkt door een controller-handler in nestJs
//createParamDecorator word gebruikt om een aangepaste decorator te maken 
//de logica: ophalen van huidige http verzoek uit de executioncontext en de user terugsturen die zich in req.user bevind.  

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest()
    return req.user
})