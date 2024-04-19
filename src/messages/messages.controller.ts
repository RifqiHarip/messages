import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessagesDto } from './dtos/create-messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessages(@Body() body: CreateMessagesDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessages(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if(!message) {
      throw new NotFoundException('message not found b...');
    }
    return message;
  }
}
