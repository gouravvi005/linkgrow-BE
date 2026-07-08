import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { conversationList, groupsData, chatList } from '../mock-data/chatData';
import { userDetailData } from '../mock-data/usersData';

@Controller()
export class ChatController {
  @Get('conversations/:id')
  getConversation(@Param('id') id: string) {
    const conversation = conversationList.find((c) => c.id === id);
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }

  @Get('chat/list')
  getChatList() {
    return chatList;
  }

  @Get('contacts')
  getContacts() {
    const contactsId = ['4', '8', '6', '3', '2', '9'];
    const contacts = userDetailData.filter(
      (user) => !contactsId.includes(user.id),
    );
    return contacts;
  }

  @Get('contacts/:id')
  getContact(@Param('id') id: string) {
    const groupsId = ['16', '17', '18'];
    const userDetails = groupsId.includes(id)
      ? groupsData.find((user) => user.id === id)
      : userDetailData.find((user) => user.id === id);

    if (!userDetails) {
      throw new NotFoundException('Contact not found');
    }
    return userDetails;
  }
}
