import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProductDto } from './Dtos/productDto';
import { UuidValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/enum/role.enum';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('files/uploadImage/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploadResult = await this.cloudinaryService.uploadImage(file);

    await this.productsService.saveProductImage(
      productId,
      uploadResult.secure_url,
      uploadResult.public_id,
    );

    return {
      message: 'Imagen subida y guardada correctamente',
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  @Get(':id/image')
  @HttpCode(HttpStatus.OK)
  async getImage(@Param('id') id: string) {
    return this.cloudinaryService.getUrl(id);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<ProductDto[]> {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  async getProductById(
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<ProductDto> {
    const product = await this.productsService.getProductById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() product: Omit<ProductDto, 'id'>,
  ): Promise<{ id: string }> {
    const createdProduct = await this.productsService.createProduct(product);
    return { id: createdProduct.id };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateProduct(
    @Param('id', UuidValidationPipe) id: string,
    @Body() productData: Partial<Omit<ProductDto, 'id'>>,
  ): Promise<{ id: string }> {
    const updatedProduct = await this.productsService.updateProduct(
      id,
      productData,
    );
    if (!updatedProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { id };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async deleteProduct(
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<{ id: string }> {
    const deletedProduct = await this.productsService.deleteProduct(id);
    if (!deletedProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { id };
  }
}
