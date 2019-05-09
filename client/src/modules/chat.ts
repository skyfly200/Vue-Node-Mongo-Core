import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios from "axios";

import {Conversation} from '@/models/conversation';
import {Contact} from '@/models/contact';
import {Message} from '@/models/message';

function hasKey<O>(obj: O, key: (string | number | symbol)): key is keyof O {
  return key in obj
}

@Module
export default class Chat extends VuexModule {
  conversations: Array<Conversation> = [
    {
      id: new Date(2018,11,28).getTime(),
      unread: false,
      title: "The Group",
      styles: {
        color: "default",
        density: "medium"
      },
      notifications: {
        state: true
      },
      created: new Date(2018,11,28),
      creator: "test",
      members: [
        {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
        {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
        {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"}
      ],
      messages: [
        { author: "test2", body: "This is a message from another user", timestamp: new Date(2018,11,28) },
        { author: "test", body: "This is a message you sent", timestamp: new Date(2019,2,22) },
        { author: "test2", body: "Another message from another user", timestamp: new Date(2019,3,20) },
        { author: "test", body: "Another from you", timestamp: new Date() }
      ]
    },
    {
      id: new Date(2019,4,3).getTime(),
      unread: true,
      title: "",
      styles: {
        color: "default",
        density: "medium"
      },
      notifications: {
        state: true
      },
      created: new Date(2019,4,3),
      creator: "test",
      members: [
        {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
        {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
      ],
      messages: [
        { author: "test", body: "Hey, whats up?", timestamp: new Date(2019,4,3) }
      ]
    },
    {
      id: new Date(2019,3,3).getTime(),
      unread: false,
      title: "",
      styles: {
        color: "default",
        density: "medium"
      },
      notifications: {
        state: true
      },
      created: new Date(2019,3,3),
      creator: "test3",
      members: [
        {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
        {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
      ],
      messages: [
        { author: "test3", body: "Hola amigo", timestamp: new Date(2019,4,3) }
      ]
    }
  ].map(c => new Conversation(c));
  contacts: Array<Contact> = [
    {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
    {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"},
    {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
    {username: "test4", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"},
    {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"}
  ].map(c => new Contact(c));

  @Mutation set_contacts(contacts: Array<Contact>){
    this.contacts = contacts;
  }

  @Action({ commit: 'set_contacts' }) load_contacts() { return [new Contact()]; }

  get getContacts() { return this.contacts }
  get getContact() {
    return (username: string) => {
      return this.contacts.find(c => c.username === username);
    };
  }

  @Mutation set_conversations(conversations: Array<Conversation>){
    this.conversations = conversations;
  }
  @Mutation new_conversation(conversation: Conversation){
    this.conversations.unshift(conversation);
  }
  @Mutation set_convo_prop(id: Number, property: string, value: string | boolean | object){
    let index: number = this.conversations.findIndex(c => id === c.id);
    if (hasKey(this.conversations[index], property)) {
      this.conversations[index][property] = value;
    }
  }
  @Mutation delete_conversation(id: Number){
    let index = this.conversations.findIndex(c => id === c.id);
    this.conversations.splice(index, 1);
  }
  @Mutation new_message(id: Number, message: Message){
    let index = this.conversations.findIndex(c => id === c.id);
    this.conversations[index].messages.push(message);
    let newest = this.conversations.splice(index, 1);
    this.conversations.unshift(newest[0]);
  }

  @Action({ commit: 'set_conversations' }) load_conversations() { return [new Conversation()] }
  @Action({ commit: 'new_conversation' }) SOCKET_new_conversation(conversation: Object) { return new Conversation(conversation) }
  @Action SOCKET_message(id: Number, message: Object) {
    this.context.commit('new_message', {
      id: id,
      message: new Message(message)
    });
  }
  @Action SOCKET_conversation_updated(id: Number, property: string, value: any) {
    this.context.commit('set_convo_prop', {
      id: id,
      property: property,
      value: value
    });
  }

  get getConversations() {
    return this.conversations;
  }
  get getConversation() {
    return (id: Number) => {
      return this.conversations.find((c: Conversation) => c.id === id);
    };
  }
}
