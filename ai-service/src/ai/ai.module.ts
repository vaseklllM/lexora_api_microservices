import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { VertexModule } from 'src/vertex/vertex.module';
import { VertexProvider } from 'src/vertex/vertex';

@Module({
  imports: [VertexModule],
  controllers: [AiController],
  providers: [AiService, VertexProvider],
})
export class AiModule {}
