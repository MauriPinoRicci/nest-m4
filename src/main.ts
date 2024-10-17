import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/Logger.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { auth0Config } from './config/auth0_config';
import { auth } from 'express-openid-connect';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { requiresAuth } from 'express-openid-connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    if (req.path === '/') {
      return res.redirect('/docs');
    }
    next();
  });

  app.use(loggerGlobal);

  app.use(
    auth({
      ...auth0Config,
    }),
  );
  // app.use(requiresAuth());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest PT21a')
    .setDescription('Demo app for cohert for m4 backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app,swaggerConfig); 
  SwaggerModule.setup('docs', app, document)
  
  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log('la inserción de categorías ha terminado.');

  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();
  console.log('la inserción de productos ha terminado.');

  await app.listen(3000);
}
bootstrap();
