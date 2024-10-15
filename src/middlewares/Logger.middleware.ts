import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`ejecutando middleware...`);
        next();
    }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    console.log(`[${formattedDate}] Método: ${method} Ruta: ${originalUrl}`);

    next();
}

